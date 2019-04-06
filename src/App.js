import React, { Component } from 'react';
// import logo from './logo.svg';
import Dashboard from './pages/dashboard';
import Login from './pages/login'
import Register from "./pages/register";
import  './lib/fa/css/all.min.css'
import './App.css';
import './Teer_Core_Styles.css';
import './theme/deep_blue.css';
import './fancy.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
     loggedIn:false,
     PageType:0
    }

this.handleLogin =(args)=>{
  console.log(args)   

  this.setState({PageType:args.PageType})
}

  }
  render() {
    return (
      <div className="App">
      {
        [
        this.state.PageType ===0? <Login parentHandleLogin = {this.handleLogin.bind(this)}/>:null,
        this.state.PageType === 1? <Dashboard/>:null,
        this.state.PageType === 2? <Register/>:null,
         ]
      }
         
      </div>
    );
  }
}

export default App;
