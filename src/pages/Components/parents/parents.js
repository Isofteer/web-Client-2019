import React, { Component } from 'react';
import axios from 'axios'
import { Icon, InlineIcon } from '@iconify/react';
// import plus from '@iconify/react/fa-solid/plus';
// import Dialog from '@material-ui/core/Dialog';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogActions from '@material-ui/core/DialogActions';
// import Slide from '@material-ui/core/Slide'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import  './parent.css'

class Parents extends  Component{


    state = {
        parents:[]
    }
    componentDidMount  (){

        axios.get('http://localhost:5000/parent',{ params:{memberid:this.props.iUserID}})
        .then(response => {
            
            var {status, data}   = response;        

            this.setState({parents:data.rows});    
            
        })
        .catch(function (error) {
            if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
         
            } else if (error.request) {
            
            console.log(error.request);
            } else {
           
            console.log('Error', error.message);
            }
            console.log(error.config);
        });

     }
    render () {

        let parents = this.state.parents;

        return <div  className = {`teer-parent-wrapper`} style = { {flex: 1}}>
                
                <Card>
                <CardContent>

                  <div className = { `teer-flex-row  teer-couple-items`}>
                  {
                    parents.map( ( parentItem, index)=> 
                    <div  key = { index} className = { `teer-parent-item`}>  
                        <div className="teer-header-dp"><img alt = "" src = { parentItem.profilepicture}/> </div>
                        {   parentItem.firstName  }
                      
                      
                    </div>
                    )
                }
                  </div>
                </CardContent>
                </Card>
        </div>
    }
}


export default Parents
