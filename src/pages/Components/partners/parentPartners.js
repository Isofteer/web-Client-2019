import React, { Component } from 'react';
import { Icon, InlineIcon } from '@iconify/react';
import plus from '@iconify/react/fa-solid/plus';


import PartnerItem from './parnerItem'

class  ParentPartners extends Component {


    state = {
        active:false,
        ipkmemberid:0
    }
    componentWillReceiveProps( Props, currentState )
    {                
        this.setState( {ipkmemberid:Props.person.ipkmemberid} );

        if (Props.selectedItem === this.state.ipkmemberid)
              this.setState( {active:true} )
            else
              this.setState( {active:false} )
    }


    handleParentBiologicalTypes(){

    }



render (){
  
    let  person =  this.props.person;      

    let id =   person.ipkmemberid;
    
    let  titleMessage = <div> We noticed that  {person.firstName} <br/> is linked to the following people </div>;

   return   <div style={{ display: this.state.active ? "block" : "none" }}> 
   
                  
                  
                  
   <div key={"keynode" + 1} className="fancy">
                <h5>Parent Type </h5>
                <section>
                    <span className="teer-margin">
                        <input type="radio" onClick={e => { this.handleParentBiologicalTypes(e, 1) }} name={"ParentType" + person.ipkmemberid } value="1" id={"ParentType1" + id} /><label htmlFor={"ParentType1" + id} >Biological</label>
                    </span>

                    <span className="teer-margin">
                        <input type="radio" onClick={e => { this.handleParentBiologicalTypes(e, 2) }} name={"ParentType"  + person.ipkmemberid } value="2" id={"ParentType2" + id} /><label htmlFor={"ParentType2" + id} >Step</label>
                    </span>

                    <span className="teer-margin">
                        <input type="radio" onClick={e => { this.handleParentBiologicalTypes(e, 3) }} name={"ParentType" + person.ipkmemberid } value="3" id={"ParentType3" + id} /><label htmlFor={"ParentType3" + id} >Adapting</label>
                    </span>
                </section>
            </div>                  
                  <br/>
                  
                  
                  
                  
                  
                    { (this.props.partners[person.ipkmemberid] || []).length ?     <div>
                                  You dont have  all of you  parents linked to you 
                                  <br/>
                                  {person.firstName} has partner would you like to add them 
                    </div> :null }
                   <br/>







   <div className= {`teer-memberItem-more`}>       
                 
           <div className = { `teer-partners`}>
    
           { (this.props.partners[person.ipkmemberid] || []).map(( partner, index )=>{

                if(partner.ipkmemberid != person.ipkmemberid )
                    return   <PartnerItem addNewParent = {this.props.addNewParent} key = {index} Partner = { partner}/> 
                 

               })
           }
            </div>
        </div>

        <div className = "teer-flex-row">
            <button style = {{marginLeft:"auto"}} className ="teer-btn teer-btn-primary "> Confirm </button>
        </div>
        </div>
}

}

export  default ParentPartners;
