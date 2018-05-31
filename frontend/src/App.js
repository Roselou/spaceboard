import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom';


class App extends Component {

  render() {
    return (
      <div >
        <header>
          <h5 className="user"> Login </h5>
          <h5 className="signup"> Signup </h5>
        </header>
        <div>
          <Link to='/' onClick={this.setState}><h1 className="App-title App">SPACE BOARD</h1></Link>
          </div>
      
      </div>
    );
  }
}

export default App;
