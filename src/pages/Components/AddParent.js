import React, { Component } from 'react';
import Search from './findMember';
import axios from 'axios'
import  ParentPartners  from './partners/parentPartners'
import { Icon, InlineIcon } from "@iconify/react";
import arrowUp  from '@iconify/react/fa-solid/angle-up';
import arrowDown  from '@iconify/react/fa-solid/angle-down';




const Checkbox = ({ ParentType, id, name,isChecked,onChange })=> 
<span className="teer-margin">
    <input 
      checked={ isChecked}    
      type="radio"
      onChange={ onChange } 
      name={ name} 
      id={ `ParentType${id}`} />

    <label htmlFor={"ParentType" + id} >Step</label>
</span>






class AddParent extends Component{

    state ={
        member:{},
        selectedMembers:[],
        foundmembers:[],  
        partners:{},
        isAnotherMember:false,
        selectedItem:null,
        parents:[],
        iUserID:16,
        ParentType:1
      
    }

    handleMemberSearch( searchedMembersList ){
        this.setState({foundmembers:searchedMembersList} );
       
    }

    SelectMemberItem( e,  memberid ){   
       
        if ( this.state.selectedItem !==memberid ){
   

            this.setState( {selectedItem:memberid ,["selectedItem_"+memberid]:!this.state["selectedItem_"+memberid]});
               
             this.GetMemberPartners( memberid );
         }
    }

    GetMemberPartners (  memberid ){

        axios.post('http://localhost:5000/parent/partners', {memberid})
        .then(response => {
            
               var {status, data}   = response;

               let partners = { ...this.state.partners};
   
               if (!this.state.isAnotherMember)               
                   partners = {};  //erase all the other partners already set;

                   partners[memberid] = data.rows;

                    console.log( partners[memberid] );
                          
                    this.setState( {partners})
             
        })
        .catch(error => {
            console.log({ message:"error searching member ",error});
        });
    }


    componentDidMount ( ) {

            axios.get('http://localhost:5000/parent',{ params:{memberid:this.state.iUserID}})
            .then(response => {
                
                var {status, data}   = response;        

                this.setState({parents:data.rows});    
                
            })
            .catch(function (error) {
                if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                }
                console.log(error.config);
            });
        }

        Collapse( args ){


            let  {  collapse, id, e } = args ;    
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            if (collapse)
            {
                this.setState({ selectedItem:null })
                
            }
            else
            this.setState({ selectedItem:id })
        } 


     handleAddnewParents ( PartnerArgs ){
           
            let { parentType , ipkmemberid } = PartnerArgs;         

            let partner = this.state.partners[ this.state.selectedItem ].find( p =>   p.ipkmemberid === ipkmemberid );

            this.setState( {parents:[...this.state.parents,partner ] });
           
     }

     ConfirmSelection=( e )=>{

        e.stopPropagation();

        e.nativeEvent.stopImmediatePropagation();
        
        const selectedMember = this.state.foundmembers.find( p=> p.ipkmemberid===this.state.selectedItem);

        console.log( {selectedMember} )     
 
         const parents = [...this.state.parents, {...selectedMember,}];         

     }

     handleParentBiologicalTypes( e , ParentType){
        this.setState({ParentType})
      }
  
    render(){

        
  

       const  foundmembers =  this.state.foundmembers.filter( p => !this.state.parents.some( u => u.ipkmemberid === p.ipkmemberid ) );

       let  partners =   this.state.partners[this.state.selectedItem] || [];


        return <div className="teer-add-parent-wrapper teer-flex-column">            
         
            <div>                  
                    <Search handleSearchedUsers = {this.handleMemberSearch.bind(this)}/>
             </div>     
               <ul className ="teer-foundmembersWrapper">
               {
                 foundmembers.map(( person,index )=>{

                    let id =   person.ipkmemberid;   

                       return  <li key={index} onClick={ e => {this.SelectMemberItem( e, person.ipkmemberid )}}>

                               <div className = "teer-details-wrapper">
                                   <div>
                                       <div className="teer-s-dp "><img src={person.profilepicture} alt="profile  here" /></div>
                                   </div>
                                   <div>  {person.firstName} &nbsp;  {person.surname}  &nbsp;  {person.nickname}  </div>
                                   <div className = "teer-member-action">    
                                   
                                   {
                                        this.state.selectedItem ===person.ipkmemberid ? 
                                         <span onClick = { e =>  this.Collapse( { id:person.ipkmemberid, collapse: true,e }) } className ="teer-profItem">   <Icon color ={"brown"} icon={arrowUp}/> </span> 
                                           :
                                        <span onClick = { e =>  this.Collapse( { id:person.ipkmemberid ,collapse: false,e }) } className ="teer-profItem">  <Icon color ={"brown"} icon={arrowDown}/> </span> 
                                    
                                    }
                                    </div>                                 

                               </div>     

                            {
                                this.state.selectedItem===person.ipkmemberid?    <div key={"keynode" + 1} className="fancy">
                                <h5>Parent Type </h5>
                                <section>
                                    <span className="teer-margin">
                                        <input checked={this.state.ParentType === 1 ? true : false} type="radio" onChange={e => { this.handleParentBiologicalTypes(e, 1) }} name={"ParentType" + person.ipkmemberid} value={1} id={"ParentType1" + id} /><label htmlFor={"ParentType1" + id} >Biological</label>
                                    </span>
 
                                    <span className="teer-margin">
                                        <input checked={this.state.ParentType === 2 ? true : false} type="radio" onChange={e => { this.handleParentBiologicalTypes(e, 2) }} name={"ParentType" + person.ipkmemberid} value="2" id={"ParentType2" + id} /><label htmlFor={"ParentType2" + id} >Step</label>
                                    </span>
 
                                    <span className="teer-margin">
                                        <input checked={this.state.ParentType === 3 ? true : false} type="radio" onChange={e => { this.handleParentBiologicalTypes(e, 3) }} name={"ParentType" + person.ipkmemberid} value="3" id={"ParentType3" + id} /><label htmlFor={"ParentType3" + id} >Adapting</label>
                                    </span>
                                </section>
                            </div>
                            :
                            null
                            }
                        
                          



                               <ParentPartners  addNewParent  = { this.handleAddnewParents.bind(this) } selectedItem = { this.state.selectedItem }  person  = { person }  partners = { partners }/>
                         
                         
                         {
                             this.state.selectedItem===person.ipkmemberid?  
                             <div className="teer-flex-row">
                               <button onClick = {this.ConfirmSelection} style={{ marginLeft: "auto" }} className="teer-btn teer-btn-primary "> Confirm </button>
                           </div>   
                           :null
                         }
                              
                           </li>
                       
                    })
                }
               </ul>        
  

        </div>
    }
}

export default AddParent;