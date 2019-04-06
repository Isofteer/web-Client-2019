import React, { Component } from 'react';
import axios from 'axios'


class Login extends Component {

    constructor(props) {
        super();
        this.state = {
            password: "",
            username: ""
        }
    }
    handleLogin(args) {

        axios.post('http://localhost:5000/login', this.state)
            .then(response => {
                if (response.data[0])
                    this.props.parentHandleLogin(Object.assign(response.data[0],{PageType:1}));
                    else{
                        this.props.parentHandleLogin({PageType:9})
                    }
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });

    }
    handleRegister(){
        this.props.parentHandleLogin({PageType:2})
    }
    render() {
        return (<div id="login" class="teer-login-page">
            <div class="desk-login teer-flex-row flex-center-r box box-2 ">
                <div class="page-logo">
                    <h4>isofteer</h4>
                </div>
                <div style={{ alignSelf: "center" }} class="teer-flex-row teer-flex-v-center controls-section fancy">
                    <div class="promo-sections">
                        <div>
                            <img src={require("../img/family.jpg")} alt="" srcset="" />
                        </div>
                    </div>
                    <div class="desk-controls teer-flex-column">
                        <span class="login-item-text">
                            <i class="fa fa-user"></i>
                            <input onChange={(e) => this.setState({ username: e.target.value })} id="txtusername" placeholder="username" type="text" />
                        </span>
                        <span class="login-item-text">
                            <i class="fa fa-lock"></i>
                            <input onChange={(e) => this.setState({ password: e.target.value })} id="txtpassword" placeholder="password" type="text" />
                        </span>
                        <div style={{ marginTop: 25 }}>
                            <span class="login-item">
                                <button onClick={() => this.handleRegister(false)} className="teer-btn teer-btn-secondary" href="#" id="btn-openRegister"> Register</button>
                            </span>
                            <span class="login-item">
                                <input onClick={() => this.handleLogin(true)} className="teer-btn teer-btn-primary" id="btn-login" placeholder="username" type="button" value="Login" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        )
    }

}
export default Login