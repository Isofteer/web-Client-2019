import React, { Component } from 'react';
import { Icon, InlineIcon } from '@iconify/react';
import userFollow from '@iconify/react/simple-line-icons/user-follow';
import AddMemberOptions  from './additionpoup'


class DashboardMenu extends  Component{
    
    state = {
        pageActive:"",
        
    }

 handleMenuOnclick ( args ){

       let { pageName, subPage } = args;    

        this.setState( {pageActive:pageName} );   

        if(subPage)
        this.props.command( args );
         
      
 }

togglePop(){

    return  this.state[this.state.pageActive + "pop"] ? "teer-show":"teer-hide"
}

    render (){
        return (
            <div>
                <ul className="dashboard-actions">
                                        <li className = "teer-profileMenuItem" onClick = { e=> this.handleMenuOnclick({ pageName: "family"})}>                                        
                                            <span className ="menu-icon">
                                               <Icon color ={"brown"} icon={userFollow} />
                                            </span>
                                            &nbsp;
                                            <span> Family </span>
                                            <div style = { {display: this.state.pageActive==="family" ? "block":"none"} }  className = {`teer-popup`}>                                           
                                               <AddMemberOptions parent = {this.state.pageActive} command = { this.handleMenuOnclick.bind(this)}/>
                                             </div>
                                        </li>

                                        <li onClick ={e=>this.handleMenuOnclick({pageName:"pedegree"})} className = "teer-profileMenuItem">                                           
                                        <span className ="menu-icon">
                                               <Icon color ={"brown"} icon={userFollow} />
                                            </span>
                                            &nbsp;
                                            <span> Pedegree Chart</span>
                                        </li>
                                        <li onClick ={e=>this.handleMenuOnclick(e)} className = "teer-profileMenuItem">                                    
                                        <span className ="menu-icon">
                                               <Icon color ={"brown"} icon={userFollow} />
                                            </span>
                                            &nbsp;
                                            <span> Dashboard</span>
                                        </li>
                                        <li onClick ={e=>this.handleMenuOnclick(e)} className = "teer-profileMenuItem">                                           
                                        <span className ="menu-icon">
                                               <Icon color ={"brown"} icon={userFollow} />
                                            </span>
                                            &nbsp;
                                            <span> Add Member </span>
                                        </li>
                                        <li onClick ={e=> this.handleMenuOnclick(e)} className = "teer-profileMenuItem">                                           
                                        <span className ="menu-icon">
                                               <Icon color ={"brown"} icon={userFollow} />
                                            </span>
                                            &nbsp;
                                            <span> Settings  </span>
                                        </li>
                                     
                                     
                                    </ul>
              
            </div>
        )
    }
}

export default DashboardMenu;