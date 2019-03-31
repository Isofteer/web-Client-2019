import React from 'react';
//import { findDOMNode } from 'react-dom';
import VanillarConnect from '../../lib/js/vanillarConnect';
import {GraphBuilder} from '../../util/GraphBuliders'

class PedegreeTree extends React.Component {

    state ={
      connectedNodes:[]
    }
    svgPaths= [];
    DomNodes =[];
    
    resize = () => {
        this.ComponentConnectLines();
    }

    constructor(){
        super();
        this.childNode = React.createRef();
    }
   ComponentConnectLines =()=>{
    var connect =  new VanillarConnect({container:this.container,SVG:this.SVG});
    this.svgPaths.map((path,index)=>{                
        if (index===0)           
             connect.connectElements(path,this.DomNodes[0],this.DomNodes[2]);
    })
   }

    componentDidMount =()=>{
        window.addEventListener('resize', this.resize);
        this.ComponentConnectLines();
        console.log(this);
             
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
      }
      
    render() {
        let elements = this.props.people;
        var _GraphBuilder =  new GraphBuilder(elements);
        return (    
             <div style={{height:400,weight:400,position:"relative"}}>
                <div ref= {(e=> this.container =e )}className="svgContainer">
                    <svg  width="0" height="0" ref= {(e=> this.SVG =e)}>
                        {                            
                            elements.map((e,index)=>{
                              return   <path key ={e.id} id={e.id} ref= {e=> this.svgPaths.push(e)} ></path>                   
                            })
                        }
                        </svg>                
                </div>
                
                   <div style= {{backgroundColor:"red"}}>  

                        {_GraphBuilder.TopHangingTree("hellow there")}

                   </div>


                <div className="node-container" style={{}}>
                 {
                       elements.map((e)=>{
                       return  <span path key ={e.id} id={"node"+ e.id} ref= {e=> this.DomNodes.push(e)} className="teer-round-img teer-flex-row teer-flex-center">
                       <img src={require('../../img/man.jpg')} alt="" srcSet="" />
                   </span>                    
                    })
                   }
                 </div>                           
                </div>
           

        )
    }
}

export {
    PedegreeTree,
  
}