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
        </header>
      </div>
    );
  }
}