import React, { Component } from 'react';
import karmaService from './services/karma-service';
import './App.css';
import DisplayFeed from './Display-feed/DisplayFeed';


export default class App extends Component {
  componentDidMount() {
    karmaService.setNewKarma();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>hi</h1>
          {/* <button onClick={this.refreshState()}>get karma</button> */}
          <button onClick={() => karmaService.decrementKarma()}>decrement karma</button>
          <DisplayFeed />
        </header>
      </div>
    );
  }
}