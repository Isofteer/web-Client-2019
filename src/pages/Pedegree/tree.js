import React, { Component } from 'react';





class FamilyLevel extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

   
    render() {

        console.log(this.props.level);

        var _parentCompo = [];

        var dodo =this.props.level/2;
 
        for(var i=0; i< dodo ;i++)
         {           
            var  modul =   i%2? "male":"female"

         _parentCompo.push( {modul,comp:<div className={`teer-1-parent teer-flex-row parent-${modul}`}> {i}</div>});
         }

         var Users = this.props.Users;

         Object.keys( Users).map((userPrnts,_index)=>{ 

            var  _Component =     _parentCompo[_index];           

            //var _child = this.props.find(userPrnts)|| {};

            _parentCompo[_index] =<Parent  child ={userPrnts} Paths = {this.props.paths} modul = {_Component.modul} users = {Users[userPrnts]} />

            console.log( {dddddddd:this.props.paths});
         });

         console.log(_parentCompo);

        return (<li className="teer-flex-row">
         {
            _parentCompo.map(user =>{
                if(user.hasOwnProperty("modul"))
                  return user.comp
                   else
                  return user
            })
          }
        </li>);
    }
}


 
class Parent extends Component{

    constructor(props){
        super(props);

        this.state ={

        }

        console.log({props});
    }
    componentWillUpdate (a,b){       
          } 
    componentDidUpdate (a,b){       
       
    } 

    render (){

         return (
                <div  child = {this.props.child} className ={`teer-1-parent teer-flex-row parent-${this.props.modul}`}>
                 {
                  this.props.users.map((_user,_i)=>{
                   
                    console.log(this.props.Paths);

                   this.props.Paths.push({ start: "#node-" + _user.ipkmemberid, end: "#node-" + _user.ifkchildid, stroke: "yellow" });


                  return   <div className={`teer-member-item teer-flex-column teer-1-${_user.gender}`}>
                  <div  id={"node-" + _user.ipkmemberid} code={_user.ipkmemberid} className={`child teer-member-circle child-${_user.ifkchildid}`}>
                      <img alt="pd" src={_user.profilepicture} />
                  </div>
                  <div style={{ padding: 7, margin: "3 px 7px",position:"relative" }}>
                  <span className="teer-user-details" >
                      {_user.firstname} 
                      <span style ={{display:"none"}}>
                      &nbsp;  {_user.surname}   {_user.id}
                      </span>
                  </span>
                  </div>
              </div>
                  })
                 } 
             
           </div>
         )
    }
 }

export default FamilyLevel;