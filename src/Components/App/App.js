/*******************************************************************
  IMPORTS
*******************************************************************/
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SubmissionForm from '../SubmissionForm/SubmissionForm';
import karmaService from '../../services/karma-service';
import DisplayFeed from '../Display-feed/DisplayFeed';
import DisplaySingle from '../DisplaySingle/DisplaySingle';
import NavBar from '../NavBar/NavBar';
import MapView from '../MapView/MapView';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Login from '../Login/Login';
import Register from '../Register/Register';
import UserAlert from '../UserAlert/UserAlert';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Header from '../Header/Header'
import ImageApi from '../../services/image-api-service';
import ImageContext from '../../contexts/ImageContext';
import KarmaService from '../../services/karma-service';
import TokenService from '../../services/token-service';

import './App.css';

export default class App extends Component {
  /*******************************************************************
    APP STATE
  ********************************************************************/
  state = {
    userLocation: {},
    newContentLoaded: false,
    sort: ['new', 'top'],
    user: null,
    loading: false,
    images: [],
    page: 1,
    debounce: false,
    morePagesAvail: true,
    view: '',
    error: null,
    alert: null,
  }

  /*******************************************************************
    LIFECYCLE FUNCTIONS
  *******************************************************************/
  componentDidMount() {
    //Add karma to localStorage if it doesn't exist there yet.
    if (!karmaService.getKarma() && karmaService.getKarma() !== 0) {
      karmaService.setNewKarma();
    }

    //Run loading spinner
    this.setState({ loading: true });

    //Get user location AND get images for that location (see this.setPosition)
    this.handleGeolocation();
  }

  /*******************************************************************
    GEOLOCATION
  *******************************************************************/
  handleGeolocation = () => {
    navigator.geolocation.getCurrentPosition(this.setPosition);
  }

  setPosition = position => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const posObj = { lat, long };

    //After state is updated for user location, the images are called again
    this.setState({ userLocation: posObj }, () => {
      const { sort, userLocation, page } = this.state;
      ImageApi.getLocalImages(
        sort[0],
        userLocation.lat,
        userLocation.long,
        page
      ).then(res => {
        this.setImages(res);
        this.setState({ loading: false });
      });
    });
  };

  /*******************************************************************
    LOADING
  *******************************************************************/
  setNewContentLoaded = img => {
    let temp = !this.state.newContentLoaded;
    this.setState({ newContentLoaded: temp, images: [img, ...this.state.images] });
  };

  /*******************************************************************
    IMAGES
  *******************************************************************/
  setImages = images => {
    this.setState({ images });
  };

  setSort = () => {
    const clone = [...this.state.sort];
    clone.reverse();
    this.setState({ sort: clone }, () => {
      const { sort, userLocation } = this.state
      ImageApi.getLocalImages(sort[0], userLocation.lat, userLocation.long)
        .then((res) => {
          this.setImages(res);
          this.setState({ loading: false });
          if (res.length < 10) {
            this.setMorePagesAvail();
          }
        })
    });
  }

  /*******************************************************************
    KARMA
  *******************************************************************/
  incrementUpvotes = id => {
    if (KarmaService.getKarma() < 1) {
      this.setAlert("Looks like you're out of karma. You'll get some more soon!")
      return;
    }

    //update the item in a deep copy of the array. you will need to 
    //update the state with a copy of the array photos provided
    const tempImageFeed = this.state.images.map(imgObj => imgObj);
    const image = tempImageFeed.find(imgObj => imgObj.id === id);
    const index = tempImageFeed.indexOf(image);
    tempImageFeed[index].karma_total++;
    let currKarma = tempImageFeed[index].karma_total;

    //set the copy to the context's value
    this.setState({ images: tempImageFeed })

    //if the total matches their servers, decrement the user's karma,
    //otherwise there's an error, so don't take any karma.
    ImageApi.patchImageKarma(id, currKarma)
      .then(res => {
        if (res && res.karma_total === currKarma) {
          KarmaService.decrementKarma()
        } else {
          this.setAlert('Error: Please refresh page');
        }
      })
  };

  /*******************************************************************
    VIEW
  *******************************************************************/
  setView = (view) => {
    this.setState({ view })
  }

  /*******************************************************************
    PAGE
  *******************************************************************/

  setMorePagesAvail = () => {
    this.setState({ morePagesAvail: false });
  }

  setDebounce = () => {
    const { debounce } = this.state;

      let debounceHolder = !debounce
      this.setState({ debounce: debounceHolder } )

      setTimeout(() => {
        let debounceHolder = debounce
        this.setState({ debounce: debounceHolder })
      }, 1000)
    // }
  }

  setPage = (page) => {
    const { debounce } = this.state;

    if (!debounce) {
      this.setDebounce();
      this.setState({ page }, () => {
        const { sort, userLocation } = this.state;
        if (page > 1) {
          ImageApi.getLocalImages(
            sort[0],
            userLocation.lat,
            userLocation.long,
            page)
            .then((res) => {
              const tempImageFeed = this.state.images.map(imgObj => imgObj);
              const concatFeed = [...tempImageFeed, ...res];
              if (res.length < 10) {
                this.setMorePagesAvail();
              }
              this.setImages(concatFeed);
              this.setState({ loading: false });
            })
        }
      })
    }
  };

  /*******************************************************************
    USER
  *******************************************************************/
  handleLogin = () => {
    this.setState({
      user: TokenService.hasAuthToken()
    })
  }

  /*******************************************************************
    ERROR FUNCTIONS
  *******************************************************************/
  setError = error => {
    console.error(error);
    this.setState({ error });
  };

  /*******************************************************************
    ALERT FUNCTIONS
  *******************************************************************/
  setAlert = (alert) => {
    this.setState({ alert });
  };

  clearAlert = () => {
    this.setState({ alert: null });
  }

  /*******************************************************************
    ROUTES
  *******************************************************************/
  renderNavRoutes = () => {
    return (
      <ErrorBoundary>
        <Switch>
          <Route exact path='/' render={() => <NavBar setSort={this.setSort} />} />
          <Route exact path='/login' render={routeProps => <Login {...routeProps} handleLogin={this.handleLogin} />} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/local-map' render={() => <MapView userLocation={this.state.userLocation} setView={this.setView} />} />
          <Route exact path={`/p/:submissionId`} render={routeProps => (<DisplaySingle submissionId={routeProps.match.params.submissionId} />)} />
          <Route render={() => <h2>Page Not Found</h2>} />
        </Switch>
      </ErrorBoundary>
    );
  };

  renderMainRoutes = () => {
    // Display loading spinner if loading
    if (this.state.loading) {
      return <div className="loader"></div>;
    } else {
      const { userLocation, newContentLoaded } = this.state;
      return (
        <ErrorBoundary>
          <Route exact path="/" render={() => <DisplayFeed setView={this.setView} />} />
          <Route
            exact
            path="/"
            render={routeProps => (
              <SubmissionForm
                {...routeProps}
                userLocation={userLocation}
                newContentLoaded={newContentLoaded}
                updateNewContent={this.setNewContentLoaded}
              />
            )}
          />
          {/* This next conditional prevents 'DisplaySingle' from 
          rendering before it has what it needs (ComponentDidMount 
          requires this.context.images to be ready, which won't be 
          ready until 'this.state.images' is (you can't access context
          here)) */}
          {this.state.images.length !== 0 ? (
            <Route
              exact path="/"
              render={routeProps => (
                <SubmissionForm
                  {...routeProps}
                  userLocation={userLocation}
                  newContentLoaded={newContentLoaded}
                  updateNewContent={this.setNewContentLoaded}
                />
              )}
            />
          ) : null}
          <Route
            path='/local-map'
            render={() => <MapView userLocation={this.state.userLocation} setView={this.setView} />} />
        </ErrorBoundary>
      );
    }
  };

  /*******************************************************************
    RENDER
  *******************************************************************/
  render = () => {

    const value = {
      userLocation: this.state.userLocation,
      newContentLoaded: this.state.newContentLoaded,
      sort: this.state.sort,
      user: this.state.user,
      images: this.state.images,
      setImages: this.setImages,
      page: this.state.page,
      morePagesAvail: this.state.morePagesAvail,
      debounce: this.state.debounce,
      incrementUpvotes: this.incrementUpvotes,
      error: this.state.error,
      alert: this.state.alert,
      setNewContentLoaded: this.setNewContentLoaded,
      setPage: this.setPage,
      setMorePagesAvail: this.setMorePagesAvail,
      setDebounce: this.setDebounce,
      setError: this.setError,
      setAlert: this.setAlert,
      clearError: this.clearError,
      clearAlert: this.clearAlert,
    }

    return (

      <ImageContext.Provider value={value}>
        <div className="App">
          <div className="App__heading-container">
            <Header view={this.state.view} handleGeolocation={this.handleGeolocation} />
            {this.renderNavRoutes()}
          </div>
          <UserAlert />
          {this.renderMainRoutes()}
        </div>
      </ImageContext.Provider>
    );
  };
}