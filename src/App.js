import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Location from "./component/Location";

class App extends Component {
  render() {
    return (
      <div className="App container chrome-covid">
        <header className="App-header">
          <h1 className="App-title">World's Covid-19 Updates</h1>
        </header>
        <Location />
      </div>
    );
  }
}

export default App;