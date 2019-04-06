import React, { Component } from 'react';
import axios from 'axios'


class Register extends Component {

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
                        this.props.parentHandleLogin({loggedIn:0})
                    }
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });

    }
    render() {
        return ( 
          <div id="register" style={{height:"100%",display:"flex"}}>
                             <div  style={{height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}} class="desk-register teer-flex-row  box box-2">
                <div class="controls-section-small">
        
                    <h1 style ={{color:"gray",textAlign: "left"}}>
                        Please Fill in the spaces
                    </h1>
                    <div class="register-items teer-flex-column section-1">
                        <div class="flex-row register-item">
                            <span className="sub-item">
                                <i className="fa fa-user"></i>
                                <input placeholder="Firstname" type="text" name="" id="txtfirstname"/>
                            </span>
                            <span className="sub-item">
                                <i className="fa fa-user"></i>
                                <input placeholder="Surname" type="text" name="" id="txtsurname"/>
                            </span>
                        </div>
        
                        <div class="flex-row register-item">
                            <span className="sub-item">
                                <i className="fa fa-user"></i>
                                <input placeholder="Middle Name" type="text" name="" id="txtmiddlename"/>
                            </span>
                            <span className="sub-item">
                                <i className="fa fa-user"></i>
                                <input placeholder="Nick Name" type="text" name="" id="txtnickname"/>
                            </span>
                        </div>
                        <span className="register-item">
                            <i className="fa fa-user"></i>
                            <input placeholder="Date of Birth " type="text" name="" id="dtofbirth"/>>
                        </span>
        
                        <span className="register-item">
                            <i className="fa fa-user"></i>
                            <select id="drpgender">
                                <option value="1"> Male</option>
                                <option value="2"> Female</option>
                            </select>
                        </span>
        
                        <span className="register-item">
                            <i className="fa fa-user"></i>
                            <input placeholder="National Id" type="text" name="" id="txtnationalid"/>
                        </span>
                        <span className="register-item">
                            <i className="fa fa-user"></i>
                            <input placeholder="Contact" type="text" name="" id="txtcontact"/>
                        </span>
                        <span class="register-item">
                            <i className="fa fa-user"></i>
                            <input placeholder="Email" type="text" name="" id="txtemail"/>
                        </span>
                        <span class="register-item">
                            <i className="fa fa-user"></i>
                            <input placeholder="Username" type="text" name="" id="txtusername"/>
                        </span>
                        <span className="register-item">
                            <i className="fa fa-user"></i>
                            <input placeholder="********" type="text" name="" id="txtpassword"/>
                        </span>
                        <div className="actions" style={{textAlign:"right"}}>
                            <span>
                                <input className="theme-btn-secondary" value="Cancel" type="button" name="" id="btnCancel"/>
                            </span>
                            <span>
                                <input className="theme-btn" value="Next" type="button" name="" id="btnRegisterNext"/>
                            </span>
                        </div>
        
                    </div>
                    <div style={{"display":"none"}} className="register-items flex-column section-2">
        
                        <div className="" style={{"color":"gray"}}>
                            <h4>Provide your image</h4>
                            <p>Preferably your face that'll be recognised by others</p>
                            <p>
                                <span href="#" className="theme-btn-secondary" id="fbtnSelectPhoto">
                                        Select Photo
                                    <input style={{"display":"none"}} onChange="handleFiles(this.files);" multiple accept="image/*"  type="file" name="" id="btnSelectPhoto"/>
                                </span>
                                <span href="#" className="theme-btn" id="btnUploadPhoto">
                                        Upload Photo
                                 </span>
                                <section id="dropbox" className="image-galary">
        
                                </section>
                                <div className="progress"style={{"background-color":"red"}}id="progress">
                                                  ffff
                                </div>
        
                            </p>
                        </div>
        
                        <div className="actions" style={{"text-align":"right"}}>
                            <span style={{float:"left"}}>
                                <input className="theme-btn-secondary" value="Previous" type="button" name="" id="btnPrevious"/>
                            </span>
                            <span>
                                <input className="theme-btn-secondary" value="Cancel" type="button" name="" id="btnCancel"/>
                            </span>
                            <span>
                                <input className="theme-btn" value="Register" type="button" name="" id="btnRegister"/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
          </div>
            
       
        )
    }

}
export default Register