import React, {Component} from 'react';
import './App.css';
import SubmissionForm from './SubmissionForm/SubmissionForm';
import karmaService from './services/karma-service';
import DisplayFeed from './Display-feed/DisplayFeed';
import NavBar from './NavBar/NavBar';
import MapView from './Components/MapView/MapView';

class App extends Component {
  state = {
    userLocation: {},
    newContentLoaded: false,
    sort: ['new', 'top'],
  }

  componentDidMount() {
    karmaService.setNewKarma();
    navigator.geolocation.getCurrentPosition(this.setPosition);
  }

  setPosition = (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const posObj = { lat, long }
    this.setState({ userLocation: posObj });
  }

  setNewContentLoaded = () => {
    let temp = !this.state.newContentLoaded;
    this.setState({ newContentLoaded: temp })
  }

  setSort = () => {
    const clone = [...this.state.sort]
    clone.reverse();
    this.setState({ sort: clone });
  }
 
  render(){
    const { sort, userLocation, newContentLoaded, } = this.state;

    return (
      <div className="App">
        <header className='App-header'>
          <img className='App-logo' src='images/icon.png' alt='logo'/>{' '}
          <h1>Anonygram</h1>
        </header>
        <MapView userLocation={userLocation} />
        {/* <NavBar setSort={this.setSort} />
        <DisplayFeed 
          sort={sort}
          userLocation={userLocation} 
          newContentLoaded={newContentLoaded}
          updateNewContent={this.setNewContentLoaded}
        /> */}
        <SubmissionForm 
          userLocation={userLocation} 
          newContentLoaded={newContentLoaded} 
          updateNewContent={this.setNewContentLoaded} 
        />
      </div>
    );
  }
}

export default App;


