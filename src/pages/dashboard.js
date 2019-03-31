import React, { Component } from 'react';
import Appbar from './bars/AppBar'
import Relative from './popup/Relative'
class Dashboard extends Component {
  
handleRelativesPage = (e)=>{
       this.setState({VRP:true})
    }

render (){
    return ( 
        <div className="dashboard">
            <section className ='left-section'>
                <div className="div-dashboard-left">

                </div>
                <div>
                    <ul className="dashboard-actions">
                        <li onClick ={e=> this.handleRelativesPage(e)}> Add member</li>
                        <li> settings</li>
                    </ul>

                </div>
            </section>
            <section className ='right-section'>
                    <Appbar/>
                   <Relative/>
               
            </section>
        </div>
    );
}
}

export default Dashboard;
