import React, { Component } from 'react';
import Appbar from './bars/AppBar'
import Relative from './popup/Relative'
import DashboardProfileHeader  from './dashboard/DashboardProfileHeader'
import DashboardMenu from './dashboard/dashboardMenu'
import Register from './register'
import './dashboard.css'



import   './Components/css.css'
import Family from './Components/Family'


import Pedegree from './Pedegree/PedegreeChart'


class Dashboard extends Component {
  
    constructor(props){       
        super(props);
       
        this.state = {
            openPage:"family",
            subPage:""
        }
        this.handleInvokedAction =args=>{       
            this.setState({openPage:args.pageName,subPage:args.subPage});
        }
    }

handleRelativesPage = ( args )=>{
       this.setState({VRP:true})
    }
  


render (){
    return ( 
        <div className="dashboard">
            <section className ='teer-left-section'>
                <div className="div-dashboard-left">
                  <DashboardProfileHeader/>
                </div>
                <div>
                    <DashboardMenu command = {this.handleInvokedAction.bind(this)}/>        
                </div>
            </section>
            <section className ='right-section'>
             <Appbar logout = {this.props.logout} command = {this.handleInvokedAction.bind(this)} />

                
                    
                        {this.state.openPage ==="pedegree"?  <Pedegree/>:null}
                        {this.state.openPage ==="relative"? <Relative ifkUserId = {this.props.ifkUserId}/>:null}
                        {this.state.openPage ==="register"? <div className = "teer-dashboard-reg"> {<Register ifkUserId = {this.props.ifkUserId}/>}</div>:null}
                        {this.state.openPage ==="family"? <Family  page ={ this.state.subPage } ifkUserId = {this.props.ifkUserId}/>:null}
                      
                              
                    
                

                 
               
            </section>
        </div>
    );
}
}

export default Dashboard;
