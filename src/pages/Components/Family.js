import React, { Component } from 'react';

import AddParent from './AddParent'
import AddSibling from './AddSibling'
import AddChild from './AddChild'

class Family extends Component{
    state= {
       
    }


      handleClickOption =args=>{
          this.setState({pageName:args.pageName});
      }
    render(){

let   _FamilSection = <section className ="add-parent-pop">  <h5 className="teer-main-header"> Associate Your Self </h5>  <AddParent/></section> 

        return <div className="teer-family-wrapper teer-flex-row">
            
           
              
                    { this.props.page ==="addparent"? [ _FamilSection  , (<div style = {{ flex:2}} key = {2}>  Right section with parents component  </div>) ]  :null}
                    { this.props.page ==="addchild"?<AddChild/>:null}
                    { this.props.page ==="addsibling"?<AddSibling/>:null}
                
          



        </div>
    }
}

export default Family;