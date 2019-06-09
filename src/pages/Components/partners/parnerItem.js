import React, { Component } from 'react';
import { Icon, InlineIcon } from '@iconify/react';
import plus from '@iconify/react/fa-solid/plus';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide'
import './partneritem.css'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class PartnerItem extends Component {

    state = {
        active:true,
        openpop:false,
        partner:{
            isNew:true
        },
        parentType :null

    }
 
    OpenPop ( bool ) {

        if (typeof(bool) !=="undefined")
               this.setState( {openpop: bool} );
           else
           {
              this.setState( {openpop: !this.state.openpop} );
           }
    }
    handleClose (){

    }

    handleParentBiologicalTypes( e ){       

       // this.setState( {parentType: e.target.value} , e=> console.log( this.state.parentType))
    }

    SecondaryPerson () {

         this.props.addNewParent( { partner:this.state.partner} );
    }

    componentWillReceiveProps( props,state){       

        let _partnerCopy = Object.assign( {},this.state.partner,props.Partner );    

        if (props.Partner.ipkmemberid !== this.state.partner.ipkmemberid) 
             this.setState( {partner:_partnerCopy});  
                     
    }

  
    render  (){

        var partner = this.props.Partner;

        var id  = partner.ipkmemberid+1000;    

        return <div  className = "teer-flex-column teer-partner-item">
                <span className = {`teer-s-image`}>
                   <img src = { partner.profilepicture } alt =""/>
                </span>

                <span> {partner.firstName} &nbsp; {partner.surname} </span>

                <span className ="teer-inc">                                         
                    <div className ="menu-icon teer-parent" onClick = { e=> this.OpenPop() }>
                        <Icon  color ={"brown"} icon={plus} />
                    </div>
                </span>
                    <Dialog
                            open={ this.state.openpop}
                            onClose={ this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"     
                            TransitionComponent={Transition}           
                            >
                            <DialogTitle>
                            <div className ="teer-flex-row teer-flex-v-center">
                            <span className={`menu-icon teer-s-image`}>
                                    <img src={partner.profilepicture} alt="" />
                                </span> 
                                <span> {partner.firstName} &nbsp; {partner.surname} </span>
                            </div>
                            </DialogTitle>
                            <DialogContent>
                            
                            <div key={"keynode" + 1} className="fancy">
                            <h5>Parent Type </h5>
                            <section>
                                <span className="teer-margin">
                                    <input type="radio" onClick={e => { this.handleParentBiologicalTypes(e, 1) }} name={"ParentType" + partner.ipkmemberid + 1 } value="1" id={"ParentType11" + id} /><label htmlFor={"ParentType11" + id} >Biological</label>
                                </span>

                                <span className="teer-margin">
                                    <input type="radio" onClick={e => { this.handleParentBiologicalTypes(e, 2) }} name={"ParentType"  + partner.ipkmemberid  +1} value="2" id={"ParentType21" + id} /><label htmlFor={"ParentType21" + id} >Step</label>
                                </span>

                                <span className="teer-margin">
                                    <input type="radio" onClick={e => { this.handleParentBiologicalTypes(e, 3) }} name={"ParentType" + partner.ipkmemberid  +1} value="3" id={"ParentType31" + id} /><label htmlFor={"ParentType31" + id} >Adapting</label>
                                </span>
                            </section>
                        </div>
                                
                            </DialogContent>
                            
                            <DialogActions>
                             
                                    <button  onClick = { e=> this.OpenPop(false) }  className ="teer-btn teer-btn-secondary"> Cancel </button>
                                    <button  onClick = { e=> {this.OpenPop(false); this.SecondaryPerson( ) } } className ="teer-btn teer-btn-primary"> Confirm </button>
                            </DialogActions>
                        </Dialog>
                        
</div>
    }
}

export default PartnerItem;