import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import logo from './imgs/logo.png'


class App extends Component {

  render() {
    return (
      <div >
        <div>
          <Link to='/' onClick={this.setState}> <img className="logo-img" src={logo} alt="little space man"/> </Link>
          <Link to='/' onClick={this.setState}><h1 className="App-title App">SPACE BOARD</h1></Link>
          </div>
      
      
      </div>

    );
  }
}

export default App;
