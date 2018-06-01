import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom';


class App extends Component {

  render() {
    return (
      <div >
        <div>
          <Link to='/' onClick={this.setState}><h1 className="App-title App">SPACE BOARD</h1></Link>
          </div>
      
      </div>
    );
  }
}

export default App;
