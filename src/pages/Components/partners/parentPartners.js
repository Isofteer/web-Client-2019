import React, { Component } from 'react';
import { Icon, InlineIcon } from '@iconify/react';
import plus from '@iconify/react/fa-solid/plus';


import PartnerItem from './parnerItem'

class  ParentPartners extends Component {


    state = {
        active:false,
        ipkmemberid:0,
        ParentType:1
    }
    componentWillReceiveProps( Props, currentState )
    {                
        this.setState( {ipkmemberid:Props.person.ipkmemberid} );

        if (Props.selectedItem === this.state.ipkmemberid)
              this.setState( {active:true} )
            else
              this.setState( {active:false} )
    }


    
  

render (){
  
    let  person =  this.props.person;      
 
  
   return   <div style={{ display: this.state.active ? "block" : "none" }}> 
                       
                  
                    { (this.props.partners[person.ipkmemberid] || []).length ?     <div>
                                  You dont have  all of you  parents linked to you 
                                  <br/>
                                  {person.firstName} has partner would you like to add them 
                    </div> :null }
                   <br/>







   <div className= {`teer-memberItem-more`}>       
                 
           <div className = { `teer-partners`}>
    
           { this.props.partners.map(( partner, index )=>{

                if(partner.ipkmemberid != person.ipkmemberid )
                    return   <PartnerItem addNewParent = {this.props.addNewParent} key = {index} Partner = { partner}/>     
               })
           }
            </div>
        </div>      
        </div>
}

}

export  default ParentPartners;
