import React from 'react';
import Connect from '../lib/js/Connect'
import $ from 'jquery'
class GraphBuilder extends React.Component {

  constructor(props) {
    super(props);
     // initialize Jquery
     Connect($, window, document);
    this.childNode = [];
    this.svgPaths = [];
    this.state = {
      value: ''
    }
  }
  componentDidMount = () => {
     window.addEventListener('resize', this.resize);
    
      this.CreateConnections( this.childNode);
    
  }

  UpfacingTree() {  //useful for graph facing Upwards
    
  }
  CreateConnections(){

    var ParentNode =  this.childNode.length?this.childNode.pop():{};
  
    window.Interval = window.setTimeout(()=>{
     
      
      var paths =   this.childNode.map((node, index) => {    
     
        return {
          start:"#"+ParentNode.id , end: "#"+node.id , strokeWidth: 1
       }
      
        
    })
    
    $(".svgContainer").HTMLSVGconnect({
      stroke: "#000",
      strokeWidth: 8,
      orientation: "vertical",
      paths
    });

      // end of code 
    }
    ,500);
 }


  TopHangingTree(headerNode) {

    return <div style ={{position:"relative",float:"right"}}>
      <div ref= {(e=> this.Container =e )} className="svgContainer">       
      </div>

      <div className="teer-flex-row outer">
        <div>
          <div style={{ marginTop: 100 }}></div>
          {
            this.props.people.map((node, index) => {
              node.src = 'https://res.cloudinary.com/dpssp9evo/image/upload/v1551639719/members/gnxcn3izti9vq0ykonyc.jpg';
              node.teeridclass = "teer-child-nodes"
              return this.CreateChildElement(node)

            })
          }
        </div>
        <div style={{ width:70 }}></div>
        <div> {this.CreateChildElement(headerNode)}</div>

      </div>
     
    </div>

  }
  CreateChildElement(args) {
    return (
      <div className={"teer-flex-row "+args.teeridclass}>
       <div className="teer-node-names">
          Serena Wllimans
          </div>
        <div ref={e => this.childNode.push(e)} id={"node" + args.id} className={"teer-round-img teer-flex-row teer-flex-center "} >
          <img src={args.src} alt="" srcSet="" />
        </div>       
      </div>
    )
  }


  render() {
    var  parent = { parentType:1 ,id: 12, teeridclass: "teer-parent-node ", src: 'https://res.cloudinary.com/dpssp9evo/image/upload/v1551640119/members/yql4q4qf5ptgfg1auwm6.jpg' }
    return (
      <div >
        {
          this.props.registerType === "parent" ? this.TopHangingTree(parent) : null
        }
      </div>
    )
  }

}
export default GraphBuilder;