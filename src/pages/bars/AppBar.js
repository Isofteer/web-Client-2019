import React, { Component } from 'react';


class Appbar  extends React.Component{
    
     LogOut (){
        localStorage.removeItem("ifkUserId")
     }

    render (){
        return (
            <div className="Appbar teer-flex-row teer-flex-v-center">
              
              <div>
rr
              </div>
                <div className="teer-barLeft-section teer-flex-row"> 
                 <div onClick = {()=>this.props.command({pageName:"register"})}
                 className= "teer-btn  register">
                      Register
                   </div>
                   <div className ="teer-btn" onClick = {this.props.logout}>
                       Sign Out
                   </div>
              </div>
            </div>
        )
    }
}


export default Appbar;
