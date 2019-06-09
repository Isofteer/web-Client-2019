import React, { Component } from 'react';
import { Icon, InlineIcon } from '@iconify/react';
import peopleIcon from '@iconify/react/simple-line-icons/people';



import AddParent from './AddParent'
import AddSibling from './AddSibling'
import AddChild from './AddChild'
import Parents from './parents/parents'
class Family extends Component{
    state= {
       parents:[],
       iUserID:16
    }


      handleClickOption =args=>{
          this.setState({pageName:args.pageName});
      }

      handleGetparents ( parents ){
         this.setState({parents})
      }
    render(){

let   _FamilSection = <section className ="add-parent-pop"> 
              <div style = {{padding: `9px 10px`}} className = {`teer-flex-row`}>
                    <div className ="menu-icon teer-parent" onClick = { e=> this.OpenPop() }>
                            <Icon  color ={"brown"} icon={peopleIcon} />
                        </div>    &nbsp;       &nbsp;      
                         <h5 className="teer-main-header">   Parents Search  </h5>
              
              </div>
                <AddParent  handleGetParents = { this.handleGetparents.bind(this)}/>
            </section> 

        return <div className="teer-family-wrapper teer-flex-row">
            
           
              
    { this.props.page ==="addparent"? [ _FamilSection  , <Parents iUserID = {  this.state.iUserID }/>] :null}
                    { this.props.page ==="addchild"?<AddChild/>:null}
                    { this.props.page ==="addsibling"?<AddSibling/>:null}
                
          



        </div>
    }
}

export default Family;