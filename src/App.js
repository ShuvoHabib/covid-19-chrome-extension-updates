import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Info from "./component/Info";

class App extends Component {
  render() {
    return (
      <div className="App container chrome-covid">
        <header className="App-header">
          <h1 className="App-title">COVID-19 CORONAVIRUS PANDEMIC</h1>
        </header>
        <Info />
      </div>
    );
  }
}

export default App;
