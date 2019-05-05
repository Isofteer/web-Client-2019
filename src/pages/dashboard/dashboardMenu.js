import React, { Component } from 'react';
import { Icon, InlineIcon } from '@iconify/react';
import userFollow from '@iconify/react/simple-line-icons/user-follow';



class DashboardMenu extends  Component{

    render (){
        return (
            <div>
                <ul className="dashboard-actions">
                                        <li onClick ={e=>this.props.command(e)} className = "teer-profileMenuItem">                                        
                                            <span className ="menu-icon">
                                               <Icon color ={"brown"} icon={userFollow} />
                                            </span>
                                            &nbsp;
                                            <span> Add Member </span>
                                        </li>
                                        <li onClick ={e=>this.props.command(e)} className = "teer-profileMenuItem">                                           
                                        <span className ="menu-icon">
                                               <Icon color ={"brown"} icon={userFollow} />
                                            </span>
                                            &nbsp;
                                            <span> Pedegree Chart</span>
                                        </li>
                                        <li onClick ={e=>this.props.command(e)} className = "teer-profileMenuItem">                                    
                                        <span className ="menu-icon">
                                               <Icon color ={"brown"} icon={userFollow} />
                                            </span>
                                            &nbsp;
                                            <span> Dashboard</span>
                                        </li>
                                        <li onClick ={e=>this.props.command(e)} className = "teer-profileMenuItem">                                           
                                        <span className ="menu-icon">
                                               <Icon color ={"brown"} icon={userFollow} />
                                            </span>
                                            &nbsp;
                                            <span> Add Member </span>
                                        </li>
                                        <li onClick ={e=> this.props.command(e)} className = "teer-profileMenuItem">                                           
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