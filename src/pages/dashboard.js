import React, { Component } from 'react';
import Appbar from './bars/AppBar'
import Relative from './popup/Relative'
import DashboardProfileHeader  from './dashboard/DashboardProfileHeader'
import DashboardMenu from './dashboard/dashboardMenu'

import Pedegree from './Pedegree/PedegreeDashboard'


class Dashboard extends Component {
  
    constructor(props){       
        super(props);
       
        this.state = {
            openPage:1
        }
        this.handleInvokedAction =value=>{
          
            this.setState({openPage:1});
        }
    }

handleRelativesPage = (e)=>{
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
                    <DashboardMenu command = {this.handleInvokedAction}/>        
                </div>
            </section>
            <section className ='right-section'>
             <Appbar/>

                {
                    [
                        this.state.openPage ===1?  <Pedegree/>:null,
                        this.state.openPage ===2? <Relative ifkUserId = {this.props.ifkUserId}/>:null
                    ]                   
                    
                }

                 
               
            </section>
        </div>
    );
}
}

export default Dashboard;
