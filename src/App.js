import React, {Component} from 'react';
import './App.css';
import SubmissionFrom from './SubmissionFrom/SubmissionForm';
import karmaService from './services/karma-service';
import DisplayFeed from './Display-feed/DisplayFeed';
import NavBar from './NavBar/NavBar';

class App extends Component {

  componentDidMount() {
    karmaService.setNewKarma();
  }
 
  render(){
    return (
      <div className="App">
        <header className='App-header'>
          <img className='App-logo' src='/assets/icon.png' alt='logo'/>{' '}
          <h1>Anonygram</h1>
        </header>
        <NavBar />
        <DisplayFeed />
        <SubmissionFrom />
      </div>
    );
  }
}

export default App;


