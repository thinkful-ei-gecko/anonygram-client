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
import './App.css';
import TokenService from '../../services/token-service';

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
    navigator.geolocation.getCurrentPosition(this.setPosition);
  }

  /*******************************************************************
    GEOLOCATION
  *******************************************************************/
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
      <Switch>
        <ErrorBoundary>
          <Route exact path={'/'} render={() => <NavBar setSort={this.setSort} />} />
          {/* <Route exact path={'/login'} render={routeProps => <Login {...routeProps} handleLogin={this.handleLogin} />} />
          <Route exact path={'/register'} component={Register} /> */}
        </ErrorBoundary>
      </Switch>
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
          <Switch>
            <Route exact path="/" component={DisplayFeed} />
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
            <Route exact path={'/login'} render={routeProps => <Login {...routeProps} handleLogin={this.handleLogin} />} />
            <Route exact path={'/register'} component={Register} />
            {/* This next conditional prevents 'DisplaySingle' from rendering before it has what it needs (ComponentDidMount requires this.context.images to be ready, which won't be ready until 'this.state.images' is (you can't access context here)) */}
            {this.state.images.length !== 0 ? (
              <Route
                path={`/p/:submissionId`}
                render={routeProps => (
                  <DisplaySingle
                    submissionId={routeProps.match.params.submissionId}
                  />
                )}
              />
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
      error: this.state.error,
      alert: this.state.alert,
      setImages: this.setImages,
      setNewContentLoaded: this.setNewContentLoaded,
      setError: this.setError,
      setAlert: this.setAlert,
      clearError: this.clearError,
      clearAlert: this.clearAlert,
    }

    return (

      <ImageContext.Provider value={value}>
        <div className="App">
          <div className="App__heading-container">
            <Header />
            {this.renderNavRoutes()}
          </div>
          <UserAlert />
          {this.renderMainRoutes()}
        </div>
      </ImageContext.Provider>
    );
  };
}