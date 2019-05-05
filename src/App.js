import React, { Component } from 'react';
// import logo from './logo.svg';
import Dashboard from './pages/dashboard';
import Login from './pages/login'
import Register from "./pages/register";
import 'flatpickr/dist/themes/light.css'
import './lib/fa/css/all.min.css'
import './App.css';
import './Teer_Core_Styles.css';
import './theme/deep_blue.css';
import './fancy.css';


//blue
class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      PageType: 1,
      ifkUserId: null
    }

    this.handleLogin = (args) => {
      console.log(args)

      var { PageType, ifkUserId } = args

      this.setState({ PageType, ifkUserId });
      localStorage.setItem("ifkUserId", ifkUserId);
    }
   
  }

  componentDidMount(){
    // if (localStorage.getItem("ifkUserId")) {
    //   this.setState({ PageType: 1 });

    // }
  }
  render() {
   
    return (
      <div className="App">


        {this.state.PageType === 0 ? <Login ifkUserId={this.state.ifkUserId} parentHandleLogin={this.handleLogin.bind(this)} /> : null}
        {this.state.PageType === 1 ? <Dashboard ifkUserId={this.state.ifkUserId} /> : null}
        {this.state.PageType === 2 ? <Register ifkUserId={this.state.ifkUserId} parentHandleRegister={this.handleLogin.bind(this)} /> : null}



      </div>
    );
  }
}

export default App;
