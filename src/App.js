import React, {Component} from 'react';
import './App.css';
import SubmissionForm from './SubmissionForm/SubmissionForm';
import karmaService from './services/karma-service';
import DisplayFeed from './Display-feed/DisplayFeed';
import NavBar from './NavBar/NavBar';

class App extends Component {
  state = {
    userLocation: {},
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
 
  render(){
    return (
      <div className="App">
        <header className='App-header'>
          <img className='App-logo' src={'./assets/icon.png'} alt='logo'/>
          <h1>Anonygram</h1>
        </header>
        <NavBar />
        <DisplayFeed userLocation={this.state.userLocation} />
        <SubmissionForm userLocation={this.state.userLocation}/>
      </div>
    );
  }
}

export default App;


