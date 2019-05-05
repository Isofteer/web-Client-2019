import React, { Component } from 'react';
import { Icon, InlineIcon } from "@iconify/react";
import peopleIcon from '@iconify/react/simple-line-icons/people';
import speechIcon from '@iconify/react/simple-line-icons/speech';
import bubblesIcon from '@iconify/react/simple-line-icons/bubbles';

import bubbleIcon from '@iconify/react/simple-line-icons/bubble';


class DashboardProfileHeader  extends React.Component{


    render(){
        return (
            <div className ={"teer-profiler-header"}> 
                <div className="teer-isofteer-logo">
                      <img src = {require('../../img/artstation.svg')}></img>
                 </div>
                <div className="teer-header-content teer-flex-column teer-flex-center">
                          
                          <div className = 'teer-header-dp' >
                              <img src = {require('../../img/female.jpg')}></img>
                          </div>
                              
                             
                            <div className ="teer-notification-module">
                               <div className="teer-profItem">
                                 <Icon color ={"brown"} icon={bubbleIcon} />
                               </div>

                               <div className="teer-profItem">
                                  <Icon color ={"brown"} icon={bubblesIcon} />
                               </div>
                           
                               <div className="teer-profItem">
                               <Icon color ={"brown"} icon={peopleIcon} />
                               </div>
                            </div>


                 </div>
            </div>
        )
    }
}

export default  DashboardProfileHeader;