import React, {Component} from 'react';
import './App.css';
import SubmissionFrom from './SubmissionFrom/SubmissionForm';

class App extends Component {
 
  render(){
    return (
      <div className="App">
        <header>
          <h1>Anonygram</h1>
        </header>
        <button>Popular</button>
        <button>Newest</button>
        <SubmissionFrom />
         
      </div>
    );
  }
}

export default App;
