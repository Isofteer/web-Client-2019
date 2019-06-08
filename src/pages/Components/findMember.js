import React, { Component } from 'react';
import axios from 'axios'


class FindMember extends Component{
    state = {
        membercode:"",
        membername:"",
        foundmembers:null
    }

    handleSearchInputText( e ) {
     this.setState({membername:e.target.value}) ;    
    }

    SearchMembercode( e ) {     

        axios.post('http://localhost:5000/parent/searchmember', this.state)
        .then(response => {
            
               var {status, data}   = response;

               this.setState({foundmembers:data},e=>{   console.log( this.state); });
                
               this.props.handleSearchedUsers(data.rows);               
             
        })
        .catch(error => {
            console.log({ message:"error searching member ",error});
        });

       }
   
       

    render(){

        var _member = this.props.member;

        return         <div key={"keynode" + 4} className="teer-flex-row teer-flex-center">                           
                            <div className="teer-text teer-relative" >
                                <input value = {this.state.value}onChange ={e => this.handleSearchInputText(e)}  placeholder="member code" type="text" />
                                <i onClick = { ()=> this.SearchMembercode()} className="fa fa-search"></i>
                            </div>
                  </div>
        
    }
}

export default FindMember;