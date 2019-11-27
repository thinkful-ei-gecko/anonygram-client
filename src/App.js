import React, {Component} from 'react';
import './App.css';
import SubmissionForm from './SubmissionForm/SubmissionForm';
import karmaService from './services/karma-service';
import DisplayFeed from './Display-feed/DisplayFeed';
import NavBar from './NavBar/NavBar';

class App extends Component {
  state = {
    userLocation: {},
    newContentLoaded: false,
    sort: 'new',
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

  setSort = (val) => {
    this.setState({ sort: val });
  }
 
  render(){
    return (
      <div className="App">
        <header className='App-header'>
          <img className='App-logo' src='images/icon.png' alt='logo'/>{' '}
          <h1>Anonygram</h1>
        </header>
        <NavBar />
        <DisplayFeed 
          userLocation={this.state.userLocation} 
          newContentLoaded={this.state.newContentLoaded}
          updateNewContent={this.setNewContentLoaded}
        />
        <SubmissionForm 
          userLocation={this.state.userLocation} 
          newContentLoaded={this.state.newContentLoaded} 
          updateNewContent={this.setNewContentLoaded} 
        />
      </div>
    );
  }
}

export default App;


