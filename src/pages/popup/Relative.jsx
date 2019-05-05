import React, { Component } from 'react';
import Parent from  './Components/Parents'

class Relative extends Component {

    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            selectedType: "parent",
        }
    }
  

    handleSelectedTypeChanged = e => {
        this.setState({ selectedType: e.target.value });

    }
    render() {
        return (
            <div className="Relative">
                <h1 style={{ fontSize: 24 }}>Associate yourself with your family</h1>
                <h2>Who are you adding</h2>
                <div style={{ fontSize: 14 }}>

                    <input type="radio" onChange={this.handleSelectedTypeChanged} name="relative" value="parent" id="inptParent" className="form-radio" /><label htmlFor="inptParent">Parent</label>

                    <input type="radio" onChange={this.handleSelectedTypeChanged} name="relative" value="sibling" id="inptSibling" className="form-radio" /><label htmlFor="inptSibling">Sibling</label>

                    <input type="radio" onChange={this.handleSelectedTypeChanged} name="relative" value="child" id="inptChild" className="form-radio" /><label htmlFor="inptChild">Child</label>
                </div>

                <div>
                    {
                        this.state.selectedType === "parent" ? <Parent  ifkUserId = {this.props.ifkUserId}/> : null
                    }
                </div>

            </div>
        )
    }
}



export default Relative;
