import React, { Component } from 'react';
import axios from 'axios'
import Flatpickr from 'react-flatpickr'
import moment from 'moment'
class Register extends Component {

    constructor(props) {
        super();
        this.state = {
            firstname: "",
            surname: "",
            middlename: "",
            nickname: "",
            gender: "Male",          
            dateofbirth: new Date(),
            nationalid: -1,
            password: "",
            username: "",
            openpage2: false,
            VirtualDom:[],
            showDropBox:false,
            selectedImgs:[],
            profileImage:"",
            userInsertedId:null,
            ifkUserId:props.ifkUserId
        }
    }
    handRegister() {

        axios.post('http://localhost:5000/register/member',Object.assign( {},this.state,{selectedImgs:null,STR_dateofbirth:moment(this.state.dateofbirth).format("YYYY-MM-DD") }))
            .then(response => {

                var {success,userInsertedId}  = response.data;

                console.log(response);

                  if (success)
                    {
                        this.setState({userInsertedId});

                        this.props.parentHandleRegister({PageType:1,ifkUserId:userInsertedId});
                    }
                    else
                    alert("There was an error saving your details")
                  
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });

    }
    componentDidMount() {

    }
    handleTextChange(e) {

        console.log(e.target);

        this.setState({ [e.target.name]: e.target.value });

    }
    handleGoNextPhase(e) {
        console.log("hellowe")
                console.log(this.state);
                this.setState({ openpage2: true })
    }
    handleRegister( _argsNo ){
     
        if (_argsNo ===-1)
        this.setState({ openpage2: false });

        if (_argsNo ===0)
            this.setState({ openpage2: false });

        if (_argsNo ===1)
        this.setState({ openpage2: true })

        if (_argsNo ===2)
        {            

           this.uploadFiles()
           .then (profileImages=>{
          
            profileImages.map(profileImage=>
                this.setState({ openpage2: true,profileImage })              
            );

            console.log(this.state);
            this.handRegister() 

              

           })

            
           

           // var profileImage = await  this.()[0]||null;

          
                          
          
        }
       
    }


 handleFiles(e){
           console.log(e);
  
        let files = e.target.files;
        Object.keys(files).map((key)=>{     

           this.setState({VirtualDom:[...this.state.VirtualDom,files[key]]});

            var reader  = new FileReader();
    
            reader.readAsDataURL(files[key]);

            reader.onloadend =  ()=> {                 

                   this.setState({selectedImgs:[...this.state.selectedImgs, reader.result]})

                   this.setState({showDropBox:true})
            }   
            
        })
      
        console.log(files);
    }

handleUploadImages (){
        this.uploadFiles();
    }


 async uploadFiles() { 

     var _strUrls = this.state.VirtualDom.map(async file => {

         var response = await this.uploadPhoto(file);

         return response;
     })

     let _ndResults = await Promise.all(_strUrls);

     console.log(_ndResults)

     return _ndResults
    
      }
      

      uploadPhoto (photo){    
       
         return new Promise((resolve,reject)=>{
            var cloudName= "dpssp9evo",
            unsignedUploadPreset = 'wu6qhl26';
   
           var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
           var xhr = new XMLHttpRequest();
           var fd = new FormData();
           xhr.open('POST', url, true);
           xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
         
           // Reset the upload progress bar
            document.getElementById('progress').style.width = 0;        
           // Update progress (can be used to show progress indicator)
           xhr.upload.addEventListener("progress", function(e) {
             var progress = Math.round((e.loaded * 100.0) / e.total);
             document.getElementById('progress').style.width = progress + "%";      
             console.log(`fileuploadprogress data.loaded: ${e.loaded},data.total: ${e.total}`);
           });
         
           xhr.onreadystatechange = function(e) {
             if (xhr.readyState == 4 && xhr.status == 200) {
               // File uploaded successfully
               var response = JSON.parse(xhr.responseText);
               // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
               var url = response.secure_url;
               // // Create a thumbnail of the uploaded image, with 150px width
   
               // console.log(response);
               // var tokens = url.split('/');
               // tokens.splice(-2, 0, 'w_150,c_scale');
               // var img = new Image(); // HTML5 Constructor
               // // img.src = tokens.join('/');
               // img.alt = response.public_id;
               // //document.getElementById('dropbox').appendChild(img);
              resolve(url)
             }
          
           };
         
           fd.append('upload_preset', unsignedUploadPreset);
           fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
           fd.append('file', photo);
           xhr.send(fd);

         })


    }
    render() {
        return (
            <div id="register" style={{ height: "100%", display: "flex" }}>
                <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} class="desk-register teer-flex-row  box box-2">
                    <div class="controls-section-small">

                        <h1 style={{ color: "gray", textAlign: "left" }}>
                            Please Fill in the spaces
                    </h1>
                
                        {!this.state.openpage2 ? 
                        
                        <div class="register-items teer-flex-column section-1">


                        <div class="teer-flex-row">
                            <span className="  register-item sub-item">
                                <div class="teer-field-label">First Name <sup>*</sup></div>
                                <input onChange={e => this.handleTextChange(e)} value={this.state.firstname} name="firstname" type="text" id="txtfirstname" />
                                <i className="fa fa-user"></i>
                            </span>
                            &nbs;
                            <span className="  register-item sub-item">
                                <div class="teer-field-label">Surname <sup>*</sup></div>
                                <input onChange={e => this.handleTextChange(e)} value={this.state.surname} name="surname" type="text" id="txtsurname" />
                                <i className="fa fa-user"></i>
                            </span>
                        </div>


                        <div class="teer-flex-row ">
                            <span className="register-item sub-item">
                                <div class="teer-field-label">Middle Name <sup>*</sup></div>
                                <input onChange={e => this.handleTextChange(e)} value={this.state.middlename} name="middlename" type="text" id="txtmiddlename" />
                                <i className="fa fa-user"></i>
                            </span>
                            &nbs;
                            <span className="register-item sub-item">
                                <div class="teer-field-label">Nick Name <sup>*</sup></div>
                                <imput onChange={e => this.handleTextChange(e)} value={this.state.nickname} name="nickname" type="text" id="txtnickname" />
                                <i className="fa fa-user"></i>
                            </span>
                        </div>



                        <div className="teer-flex-row">
                            <span className="register-item">
                                <div class="teer-field-label">Date of Birth <sup>*</sup></div>

                                <Flatpickr
                                    id="dateofbirth"
                                    value={this.state.dateofbirth}
                                    onChange={dateofBirthArray => {
                                       
                                        dateofBirthArray.forEach((dateofbirth)=>{                                      
                                            this.setState({ dateofbirth});
                                        }) ;

                                       }}                                   
                                    options ={{
                                        dateFormat:"D ,d M Y"
                                    }}
                                />


                            </span>
                            &nbs;
                            <span style={{ flex: 1 }} className=" teer-flex-row teer-flex-v-center">
                                <div style={{ marginLeft: "auto", marginTop: "auto" }} className="fancy">

                                    <span className="teer-margin">
                                        <input type="radio" onChange={e => this.setState({ gender: "male" })} name={"regGender"} value="male" id={4000} /><label htmlFor={4000} >Male</label>
                                    </span>

                                    <span className="teer-margin">
                                        <input type="radio" onChange={e => this.setState({ gender: "female" })} name={"regGender"} value="female" id={5000} /><label htmlFor={5000} >Female</label>
                                    </span>

                                </div>
                            </span>

                        </div>





                        <span className="register-item">
                            <div class="teer-field-label">National ID <sup>*</sup></div>
                            <input onChange={e => this.handleTextChange(e)} value={this.state.nationalid} name="nationalid" type="text" id="txtnationalid" />
                            <i className="fa fa-user"></i>
                        </span>
                        <span className="register-item">
                            <div class="teer-field-label">Contact <sup>*</sup></div>
                            <input onChange={e => this.handleTextChange(e)} value={this.state.contact} name="contact" type="text" id="txtcontact" />
                            <i className="fa fa-user"></i>
                        </span>
                        <span class="register-item">
                            <div class="teer-field-label">Email <sup>*</sup></div>
                            <input onChange={e => this.handleTextChange(e)} value={this.state.mail} type="text" name="mail" id="txtemail" />
                            <i className="fa fa-user"></i>
                        </span>
                        <span class="register-item">
                            <div class="teer-field-label">Username <sup>*</sup></div>

                            <input onChange={e => this.handleTextChange(e)}  value={this.state.username} type="text" name="username" id="txtusername" />
                            <i className="fa fa-user"></i>
                        </span>

                        <span class="register-item">
                            <div class="teer-field-label">Password <sup>*</sup></div>

                            <input onChange={e => this.handleTextChange(e)}  value={this.state.password} type="text" name="password" id="txtpassword" />
                            <i className="fa fa-user"></i>
                        </span>

                        <div className="actions" style={{ textAlign: "right" }}>
                            <span>
                                <input onClick={e => this.handleRegister(0)} className="theme-btn-secondary" value="Cancel" type="button" name="" id="btnCancel" />
                            </span>
                            <span>
                                <input onClick={e => this.handleRegister(1)} className="theme-btn" value="Next" type="button" name="" id="btnRegisterNext" />
                            </span>
                        </div>

                    </div>                  
                        
                        
                        :


                            <div className="register-items flex-column section-2">

                                <div className="" style={{ "color": "gray" }}>
                                    <h4>Provide your image</h4>
                                    <p>Preferably your face that'll be recognised by others</p>
                                    <p>
                                        <label htmlFor ="btnSelectPhoto" className="theme-btn-secondary" id="fbtnSelectPhoto">
                                            Select Photo
                                            <input style={{ "display": "none" }} onChange={e =>{this.handleFiles(e)}}  accept="image/*" type="file" name="" id="btnSelectPhoto" />
                                        </label>
                                        <span onClick = {e=>{this.handleUploadImages()}} href="#" className="teer-btn teer-btn-primary" id="btnUploadPhoto">
                                            Upload Photo
                                        </span>
                                       
                                          {
                                              this.state.showDropBox?  <section id="dropbox" className="image-galary teer-drop-box"> 
                                              
                                              {
                                                  this.state.selectedImgs.map((imgSrc)=>{
                                                    return <div className = "teer-Outline "> <img height={200}  src ={imgSrc}/>  </div>
                                                })
                                              }
                                                    
                                              
                                               </section>:null
                                          }

                                      
                                        <div className="progress" style={{ backgroundColor: "red" }} id="progress">

                                        </div>

                                    </p>
                                </div>

                                <div className="actions" style={{textAlign: "right" }}>
                                    <span style={{ float: "left" }}>
                                        <input onClick = {e=>{ this.handleRegister(-1)}} className="theme-btn-secondary" value="Previous" type="button" name="" id="btnPrevious" />
                                    </span>
                                    <span>
                                        <input onClick = {e=>{ this.handleRegister(0)}} className="theme-btn-secondary" value="Cancel" type="button" name="" id="btnCancel" />
                                    </span>
                                    <span>
                                        <input onClick = {e=>{ this.handleRegister(2)}} className="theme-btn" value="Register" type="button" name="" id="btnRegister" />
                                    </span>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>


        )
    }

}
export default Register