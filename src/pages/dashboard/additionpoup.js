import React, { Component } from 'react';
import { Icon, InlineIcon } from '@iconify/react';
import userFollow from '@iconify/react/simple-line-icons/user-follow';

class AdditionPop extends Component{

  state = {
    active:true
  }

  
    handleMenuOnclick ( args ){

      this.setState( {active: !this.state.active} ); 

         this.props.command( args );
      
    }


 componentDidUpdate( props , state ){


  if ( !state.active)
         this.setState({active:true})
       
        console.log({ props,state })

 }
render (){
    return (

    
                                            <div  style = { {display: this.state.active ? "block":"none"} }  className = { `teer-menu-popup teer-flex-column ` }>
                                                 <h4>
                                                   Relation Type
                                                 </h4>
                                       
                                                 <ul className="speech-bubble">
                                                    <li className ='teer-profileMenuItem ' onClick={e => { this.handleMenuOnclick({ pageName: "family",subPage:"addparent" })}} > 
                                                     <span className="menu-icon">
                                                      <Icon color={"brown"} icon={userFollow} />
                                                      </span>
                                                       Parent
                                                    </li>
                                                      <li  className ='teer-profileMenuItem'  onClick ={e=>{ this.handleMenuOnclick({ pageName: "family",subPage:"addsibling" })}} > 
                                                      <span className="menu-icon">
                                                      <Icon color={"brown"} icon={userFollow} />
                                                      </span>
                                                       Sibling
                                                      
                                                      </li>
                                                      <li  className ='teer-profileMenuItem' onClick ={e=> { this.handleMenuOnclick({ pageName: "family",subPage:"addchild" }) }} >
                                                      <span className="menu-icon">
                                                      <Icon color={"brown"} icon={userFollow} />
                                                      </span>
                                                            Child                                                           
                                                        </li>
                                                  </ul>
                                            </div>
                                      
                                         

    )
}

}


export default AdditionPop;