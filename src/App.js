import React, { Component } from 'react';
// import logo from './logo.svg';
import Dashboard from './pages/dashboard';
import  './lib/fa/css/all.min.css'
import './App.css';
import './Teer_Core_Styles.css';
import './theme/deep_blue.css';
import './fancy.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Dashboard/>
      </div>
    );
  }
}

export default App;
