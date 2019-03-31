import React, { Component } from 'react';
const axios = require('axios');



class RelativeCreator extends Component {
    state = {    
        userid:24,
        relationType:"",
        genderType:"",  
        relativeid:10,
        showSearch:false,       
        results:{
            result:{}
        },
        isResult:false,
        selectedParentId:null,
        errorType:0,       
        hasPartner:false,
        searchedRltvGender:null,
        genderMismatch:false,
        isRelated:false

    }
 
    handleSelection =(e)=>{    
        console.log(e.target.value)
        e.target.checked = true;
           this.setState({
            relationType:e.target.value,
            genderType:e.target.getAttribute("data-gender"),
           });          
    }


 handlePartnerSelection = e=>{
   
    this.setState({hasPartner:true,selectedParentId:e.target.getAttribute("data-partnerid")},()=>{
        console.log(this.state);    });
    
    }


handleSeachRelative = ()=>{  
    this.setState({isResult:false,hasPartner:false,selectedParentId:null,searchedRltvGender:null,genderMismatch:false});
    let params = this.state ;
        axios.post(`http://localhost:5000/relative/member`, {params })
        .then(res => {       
        console.log(res.data);
        this.setState({results:res.data,isResult:true,errorType:res.data.errorType,isRelated:res.data.isRelated});
       this.setState({searchedRltvGender:res.data.result.gender},()=>{

        var {PreferredGender,gender}  =this.state.results.result;
          
        if(PreferredGender!==gender){
            this.setState({genderMismatch:true});
        }
       })
       
        console.log(this.state);
        });
       
}
handleSaveRelative = ()=>{
   
    let  {relationType,relativeid,selectedParentId,hasPartner,userid,searchedRltvGender} = this.state,
    params = {
        selectedParentId,       
        relativeid,
        hasPartner,
        relationType,
        userid,
        searchedRltvGender

    }
    
if (this.state.genderMismatch){
 alert("Gender Mismatch")
}else{

        axios.post(`http://localhost:5000/relative/save`, params )
        .then(res => {       
        console.log(res.data);
        });
        
    }
}

componentDidMount(){
   
}
    render(){          
              return(
           
            <div className ="teer-panel teer-mid">
              <h1> Lets associate </h1>
              <h5> Who are you trying to add</h5>
              <div>
                
                 <div className="teer-relative-options">

                   <label id ="inputFather"  htmlFor="input-father">                   
                   <input  name="teer-relations" value ="1" data-gender="1" onChange ={e => {this.handleSelection(e)}} id="input-father" type="radio"/>
                   Father
                   </label>

                   <label   htmlFor="input-mother">                   
                   <input name="teer-relations" value ="2"  data-gender="2" onChange ={e => {this.handleSelection(e)}} id ="input-mother" type="radio"/>
                   Mother
                   </label>


                   <label   htmlFor="input-brother">                    
                   <input name="teer-relations" value ="3" data-gender="1" onChange ={e => {this.handleSelection(e)}} id ="input-brother" type="radio"/>
                   Brother
                   </label>

                   <label   htmlFor="input-sister">                    
                   <input name="teer-relations" value ="4" data-gender="2" onChange ={e => {this.handleSelection(e)}} id ="input-sister" type="radio"/>
                   Sister
                   </label>


                   <label   htmlFor="input-son">                    
                   <input name="teer-relations" value ="5" data-gender="1" onChange ={e => {this.handleSelection(e)}} id ="input-son" type="radio"/>
                   Son
                   </label>
                   

                   <label   htmlFor="input-daughter">                    
                   <input name="teer-relations" value ="6" data-gender="2" onChange ={e => {this.handleSelection(e)}} id ="input-daughter" type="radio"/>
                   Daughter
                   </label>
                 </div>
               
                 <br/>
                  <div className ="teer-relative-search ">
                    <div className="teer-flex-row">
                        <input value={this.state.relativeid} onChange = {e =>{this.setState({relativeid:e.target.value})}} type="text"/>
                        <i onClick ={e=>{this.handleSeachRelative()}} className="fa fa-search"></i>
                    </div>
                  </div>
                  <br/>

                  <div>
                   {  this.state.isResult && this.state.errorType===0 && !this.state.isRelated? SearchResultsCom ({result:this.state.results,handleSelection:this.handlePartnerSelection}):null}
                   {  this.state.hasPartner? null:<ExtendParent  copyState ={this.state}/>}
                   {  this.state.errorType===1? <div> There is no user with that id </div>:null}
                   {  this.state.genderMismatch? <div> There's a gender Mismatch </div>:null}
                   {  this.state.isRelated? <div> Your already related </div>:null}
                  </div>
                  <div>
                      <br/>
                      <input onClick={()=>{this.handleSaveRelative()}} type="button" value="Save Relation"/>
                  </div>
                  <br/>

              </div>
            </div>
        )
    }
}


 class ExtendParent extends React.Component{
   state = {
    selectedParentId:""
   }
    handleSecondParent = (e)=>{

    }
 render (){
   
    let {searchedRltvGender} = this.props.copyState;
     return  (
         <div>
           <h5>We are unable tol find your {searchedRltvGender==="male"? "mother":"father" } </h5>
           <div>
              <span> Please specify {searchedRltvGender==="male"?"her":"his"}  id </span> <span> <input value={this.state.selectedParentId} onChange ={e =>this.handleSecondParent(e)} type ="text"/></span>
           </div>
         </div>
     );
 }
 }
let SearchResultsCom = args=> {
    let  {result,handleSelection} = args,
      data = result.result;
  
    return (
        <div>
            <div>
                <h5> The guy you look for is </h5>
                <span>{data.firstName}&nbsp;{data.surname} </span>
           </div>
            <div>
               <h5>partners</h5> 
               <ul>
                  { data.parentId.map(parent=>{

                         var patnerid = data.gender ==="Male"? parent.ifkmotherid:parent.ifkfatherid,
                             gender =  data.gender ==="Male"? 2 :1;

                      return (     
                          <li  key ={parent.id}>
                              <label htmlFor="input-mother">
                                  <input name="teer-partners" value={patnerid} data-partnerid={parent.id} data-gender={gender} onChange={e => { handleSelection(e) }} id={patnerid} type="radio" />
                                  { data.gender ==="Male"? parent.mother:parent.father}
                            </label>
                          </li>


                      )
                  }) }
               </ul>
            </div>
        </div>
    )
}
export default RelativeCreator;
