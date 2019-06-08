import React, { Component } from 'react';
import Search from './findMember';
import axios from 'axios'
import  ParentPartners  from './partners/parentPartners'
import { Icon, InlineIcon } from "@iconify/react";
import arrowUp  from '@iconify/react/fa-solid/angle-up';
import arrowDown  from '@iconify/react/fa-solid/angle-down';
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
        newparents:[]
    }

    handleMemberSearch( searchedMembersList ){
        this.setState({foundmembers:searchedMembersList} );
        console.log(this.state);      
    }

    SelectMemberItem( memberid ){

        this.setState( {selectedItem:memberid ,["selectedItem_"+memberid]:!this.state["selectedItem_"+memberid]});
        
        this.GetMemberPartners( memberid );
        console.log(this.state.selectedItem)
    }

    GetMemberPartners ( memberid ){

        axios.post('http://localhost:5000/parent/partners', {memberid})
        .then(response => {
            
               var {status, data}   = response;

               let partners = { ...this.state.partners};
   
               if (!this.state.isAnotherMember)               
                   partners = {};  //erase all the other partners already set;

                   partners[memberid] = data.rows;

               this.setState({partners},e=>{   console.log( this.state.partners); });               
                          
             
        })
        .catch(error => {
            console.log({ message:"error searching member ",error});
        });
    }

  
    componentDidMount (){

            axios.get('http://localhost:5000/parent',{ params:{memberid:this.state.iUserID}})
            .then(response => {
                
                var {status, data}   = response;        

                this.setState({parents:data.rows},e=>{   console.log( this.state.partners); });               
                            
                
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
                this.setState({ selectedItem:null },
                    f=> console.log(this.state))
            }
            else
            this.setState({ selectedItem:id })
        }


     handleAddnewParents (  arg ){


// please continue from here

        const _distinctMembersList =    new Set([...this.state.newparents,arg] );

        this.setState( {newparents:[ _distinctMembersList.values()] },
            e=>{
                alert("alert ");

                console.log( this.state.newparents );
            });



     }

    render(){


        var _member =  this.state.member;

        return <div className="teer-add-parent-wrapper teer-flex-column">            
         
            <div>                  
                    <Search handleSearchedUsers = {this.handleMemberSearch.bind(this)}/>
             </div>     
               <ul className ="teer-foundmembersWrapper">
               {
                 this.state.foundmembers.map(( person,index )=>{
                       return                     <li key={index} onClick={this.SelectMemberItem.bind(this, person.ipkmemberid)}>

                               <div className = "teer-details-wrapper">
                                   <div>
                                       <div className="teer-s-dp "><img src={person.profilepicture} alt="profile  here" /></div>
                                   </div>
                                   <div>  {person.firstName} &nbsp;  {person.surname}  &nbsp;  {person.nickname}  </div>
                                   <div className = "teer-member-action" >    
                                   
                                   {
                                        this.state.selectedItem ===person.ipkmemberid ? 
                                         <span onClick = { e =>  this.Collapse( { id:person.ipkmemberid ,collapse: true,e }) } className ="teer-profItem">   <Icon color ={"brown"} icon={arrowUp}/> </span> 
                                           :
                                        <span onClick = { e =>  this.Collapse( { id:person.ipkmemberid ,collapse: false,e }) } className ="teer-profItem">  <Icon color ={"brown"} icon={arrowDown}/> </span> 
                                    
                                    }
                                    </div>
                                 

                               </div>   

                        
                               <ParentPartners  addNewParent  = { this.handleAddnewParents.bind(this) } selectedItem = { this.state.selectedItem }  person  = { person }  partners = { this.state.partners}/>
                                                                                             
                             
                            
                           </li>
                       
                    })
                }
               </ul>        
  

        </div>
    }
}

export default AddParent;