import React, {Component} from 'react';
import './App.css';
import SubmissionFrom from './SubmissionFrom/SubmissionForm';
import karmaService from './services/karma-service';
import DisplayFeed from './Display-feed/DisplayFeed';

class App extends Component {

  componentDidMount() {
    karmaService.setNewKarma();
  }
 
  render(){
    return (
      <div className="App">
        <header>
          <h1>Anonygram</h1>
        </header>
        <button>Popular</button>
        <button>Newest</button>
        <DisplayFeed />
        <SubmissionFrom />
         
      </div>
    );
  }
}

export default App;


