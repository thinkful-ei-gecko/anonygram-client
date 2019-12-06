/*******************************************************************
  IMPORTS
*******************************************************************/
import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import SubmissionForm from '../SubmissionForm/SubmissionForm';
import karmaService from '../../services/karma-service';
import DisplayFeed from '../Display-feed/DisplayFeed';
import DisplaySingle from '../DisplaySingle/DisplaySingle';
import NavBar from '../NavBar/NavBar';
import MapView from '../MapView/MapView';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Header from '../Header/Header'
import ImageApi from '../../services/image-api-service';
import ImageContext from '../../contexts/ImageContext';
import TokenService from '../../services/token-service';
import './App.css';
import {ThumbUp} from '@material-ui/icons';

export default class App extends Component {
  /*******************************************************************
    APP STATE
  ********************************************************************/
  state = {
    userLocation: {},
    newContentLoaded: false,
    sort: ['new', 'top'],
    loading: false,
    images: [],
    error: null,
  };

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
  setNewContentLoaded = () => {
    let temp = !this.state.newContentLoaded;
    this.setState({ newContentLoaded: temp });
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
    this.setState({ sort: clone });
  };

  /*******************************************************************
    USER FUNCTIONS 
  *******************************************************************/
  loginUser = (username, password) => {
    this.setState({
      user: { username, password },
    });
  };

  /*******************************************************************
    ERROR FUNCTIONS
  *******************************************************************/
  setError = error => {
    console.error(error);
    this.setState({ error });
  };

  /*******************************************************************
    ROUTES
  *******************************************************************/
  renderNavRoutes = () => {
    return (
      <>
      <Switch>
        <Route exact path='/' render={() => <NavBar setSort={this.setSort} />} />
        <Route exact path='/login' component={Login} loginUser={this.loginUser} /> 
        <Route exact path='/register'component={Register} loginUser={this.loginUser}/> 

      </Switch>
      </>
    );
  };

  renderMainRoutes = () => {
    // Display loading spinner if loading
    if (this.state.loading) {
      return <div className="loader"></div>;
    } else {
      const { userLocation, newContentLoaded } = this.state;
      return (
        <>
          <Route exact path="/" render={() => <DisplayFeed />} />
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
        </>
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
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
    };

    return (
     
      <ImageContext.Provider value={value}> 
        <div className="App">
          <div className="App__heading-container">
            <Header>
              {/* <img className='App-logo' src='images/icon.png' alt='logo'/>{' '} */}
              <Link to="/" className="resetStyles">
                <h1>Anonygram</h1>
              </Link>{' '}
              {TokenService.hasAuthToken() ? (
                <>
                <Link to="/login" className="nav-link resetStyles" onClick={() => TokenService.clearAuthToken()}>
                  Logout
                </Link>
              <div className="App__karma-total"><ThumbUp/>{' '}{karmaService.getKarma()}</div>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link resetStyles">
                    Login
                  </Link>
                  |
                  <Link to="/register" className="nav-link resetStyles">
                    Register
                  </Link>
                </>
              )}
            <Header/>
            {this.renderNavRoutes()}
          </div>
          {this.renderMainRoutes()}
        </div>
      </ImageContext.Provider>
    );
  };
}
