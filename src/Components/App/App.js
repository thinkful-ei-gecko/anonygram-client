/*******************************************************************
  IMPORTS
*******************************************************************/
//Library Components
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

//Components
import Header from '../Header/Header';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import DisplayFeed from '../Display-feed/DisplayFeed';
import DisplaySingle from '../DisplaySingle/DisplaySingle';
import OptionsBar from '../OptionsBar/OptionsBar';
import MapView from '../MapView/MapView';
import Login from '../Login/Login';
import Register from '../Register/Register';
import UserAlert from '../UserAlert/UserAlert';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

//CSS
import './App.css';

//Contexts, services and the likes
import ImageApi from '../../services/image-api-service';
import ImageContext from '../../contexts/ImageContext';
import UserContext from '../../contexts/UserContext';
import TokenService from '../../services/token-service';

export default class App extends Component {
  /*******************************************************************
    CONTEXT CONSUMER
  ********************************************************************/
  static contextType = UserContext;

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
    view: '',
    error: null,
    alert: null,
  }

  /*******************************************************************
    LIFECYCLE FUNCTIONS
  *******************************************************************/
  componentDidMount() {
    //Run loading spinner
    this.setState({ loading: true });

    //Get user location AND get images for that location (see this.setPosition)
    this.handleGeolocation();

    // when we refresh the page, we want to fetch the most up-to-date user data (i.e. karma_balance)
    this.context.updateUserStateFromDatabase();
  }

  /*******************************************************************
    GEOLOCATION
  *******************************************************************/
  handleGeolocation = () => {
    if (!!navigator && !!navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition);
    }
  }

  setPosition = position => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const posObj = { lat, long };

    //After state is updated for user location, the images are called again
    this.setState({ userLocation: posObj }, () => {
      const { sort, userLocation } = this.state;
      ImageApi.getLocalImages(
        sort[0],
        userLocation.lat,
        userLocation.long
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
        })
    });
  }

  /*******************************************************************
    KARMA
  *******************************************************************/
  incrementUpvotes = id => {
    if (this.context.user.karma_balance === 0) {
      this.setAlert("Looks like you're out of karma. You'll get some more soon!")
      return;
    }
    
    //update the item in a deep copy of the array. you will need to 
    //update the state with a copy of the array photos provided
    const tempImageFeed = this.state.images.map(imgObj => imgObj);
    const image = tempImageFeed.find(imgObj => imgObj.id === id);
    const index = tempImageFeed.indexOf(image);
    tempImageFeed[index].karma_total++;

    //set the copy to the context's value
    this.setState({ images: tempImageFeed })

    // the upvoter has successfully "transferred" 1 karma from their karma_balance
    // to the image's karma_total, so update the current karma_balance
    ImageApi.patchImageKarma(id)
      .then(() => {
        this.context.updateUserStateFromDatabase();
      })
  };

  /*******************************************************************
    VIEW
  *******************************************************************/
  setView = (view) => {
    this.setState({ view })
  }

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
  renderHeaderRoutes = () => {
    return (
      <Switch>
        <Route path='/p/:submissionId'
          render={routeProps => <Header path={routeProps.match.path} />} />
        <Route path='/local-map'
          render={routeProps => <Header path={routeProps.match.path} />} />
        <Route 
          component={Header} />
    </Switch>
    )
  }
  
  renderMainRoutes = () => {
    // Display loading spinner if loading
    if (this.state.loading) {
      return <div className="loader"></div>;
    } else {
      const { userLocation, newContentLoaded } = this.state;
      return (
        <ErrorBoundary>
          <Switch>
            <Route exact path="/" 
              render={routeProps => 
                <DisplayFeed 
                  {...routeProps} 
                  setView={this.setView} 
                  userLocation={userLocation}
                  newContentLoaded={newContentLoaded}
                  updateNewContent={this.setNewContentLoaded} />
                } />
            <Route exact path='/local-map' 
              render={() => 
                <MapView 
                  setView={this.setView} 
                  userLocation={userLocation}
                  newContentLoaded={newContentLoaded}
                  updateNewContent={this.setNewContentLoaded}
                /> } 
            />
            <Route exact path='/login' 
              render={routeProps => 
                <Login {...routeProps} handleLogin={this.handleLogin} />} />
            <Route exact path='/register' 
              component={Register} />
            {/* This next conditional prevents 'DisplaySingle' from 
            rendering before it has what it needs (ComponentDidMount 
            requires this.context.images to be ready, which won't be 
            ready until 'this.state.images' is (+ you can't access context
            here)) */}
            {this.state.images.length !== 0 ? (
              <Route exact path={`/p/:submissionId`} 
                render={routeProps => (<DisplaySingle submissionId={routeProps.match.params.submissionId} />)} />
            ) : null}
            <Route component={NotFoundPage} />
          </Switch>
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
      incrementUpvotes: this.incrementUpvotes,
      error: this.state.error,
      alert: this.state.alert,
      setNewContentLoaded: this.setNewContentLoaded,
      setError: this.setError,
      setAlert: this.setAlert,
      clearError: this.clearError,
      clearAlert: this.clearAlert,
    }

    return (

      <ImageContext.Provider value={value}>
        <div className="App">
          <div className="App___header-container">
            {this.renderHeaderRoutes()}
          <OptionsBar 
            screen='desktop'
            view={this.state.view} 
            handleGeolocation={this.handleGeolocation}
            setSort={this.setSort}
          />  
          </div>

          <div className="App__main">
            <UserAlert />
            {this.renderMainRoutes()}
          </div>
          
          <OptionsBar 
            screen='mobile'
            view={this.state.view} 
            handleGeolocation={this.handleGeolocation}
            setSort={this.setSort}
          />
        </div>
      </ImageContext.Provider>
    );
  };
}