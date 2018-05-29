import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import BlackHoles from './components/blackHoles'
import BlackHole from './components/blackHole'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SPACE BOARD</h1>
        </header>
        <BlackHole />
        
      </div>
    );
  }
}

export default App;