import React from 'react';
import $ from 'jquery';

import Connect from '../lib/js/Connector'

class GraphBuilder extends React.Component {

  constructor(props) {
    super(props);
    // initialize Jquery
   
    this.childNode = [];
    this.state = {
    
      refreshGraph:false
    }

  }
  componentDidMount = () => {    
   
  }
  componentWillUnmount() {   
  }
  componentDidUpdate(prevProps, prevState) {
    var paths = this.ConnectElements();
     new Connect({paths}).Plugin();
  }


  componentWillReceiveProps(props) {
 

  }

  ConnectElements() {
    var paths = []

    var _currentPerson  =   this.props.dataItem;
 

    (_currentPerson.partners|| []).map((partner) => {
  
        paths.push({ start: "#node-" + partner.id, end: "#node-" + _currentPerson.id, stroke: "yellow" });
      })
 
    return paths;
  }
  TopHangingTree() {

    var parentNode =    this.props.dataItem;
   return <div style={{ position: "relative", float: "right" }}>   

    <div id="divId" className="svgContainer"></div>

   <div className="teer-flex-row outer nodeWrapper">
             {
           
                 [
                   <div key ={"one"}>
                       <div style={{marginTop:40}}></div>
                     {
                       ( parentNode.partners|| []).map((childNodes,i)=>{                      
                        childNodes.teeridclass = "teer-child-nodes"
                        return <div key={"node-"+i}>{this.CreateChildElement(childNodes)} </div>
                        })
                     }
                   </div>,
                    <div style={{ width: 50 }}></div>,
                   
                   <div>
                      <div key={"three"}>{this.CreateChildElement(parentNode)}</div>
                  </div>
                ]

            
             }
          </div>
          </div>

 
  }
  CreateChildElement(args) {
    return (
      <div className={"teer-flex-row " + args.teeridclass}>
        <div className="teer-node-names">
          {args.firstname}
        </div>
        <div  id={"node-" + args.id} className={"teer-round-img teer-flex-row teer-flex-center "} >
          <img src={args.img} alt="" srcSet="" />
        </div>
      </div>
    )
  }


  render() {

    return (
      <div >
        {
          this.props.registerType === "parent"? this.TopHangingTree() : null
        }
      </div>
    )
  }

}
export default GraphBuilder;