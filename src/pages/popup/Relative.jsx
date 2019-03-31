import React, { Component } from 'react';
import GraphBuilder from '../../util/GraphBuliders'

import Connect from '../../lib/js/connectlib';

class Relative extends Component {

    state = {
        selectedType: "parent",
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
                        this.state.selectedType === "parent" ? <Parent /> : null
                    }
                </div>

            </div>
        )
    }
}

class Parent extends React.Component {

    state = {
        confirmSearch: false,
        selecteParentdType: "",
        toogleParent: "",
        newmembercode: "",
        partnercode: null,
        allowSearch: true,
        parentthreeway: "father",
        isthreewayactive: false
    }

    handleSelectedTypeChanged = e => {
        this.setState({ allowSearch: true, selecteParentdType: e.target.value });

    }
    handleSelectedParent = e => {
        this.setState({ toogleParent: e.currentTarget.id, partnercode: e.currentTarget.getAttribute("data-pid") });

    }
    GetClassNames = (id) => {
        return this.state.toogleParent == id ? "selected " : ""
    }
    handleConfirm = (boolValue) => {
        this.setState({ confirmSearch: boolValue });
    }
    handleConfirmationVisibilty = () => {
        return this.state.confirmSearch ? "block" : "none"
    }
    handleSearchText = (e) => {
        this.setState({ newmembercode: e.target.value });
    }
    handleSearch = () => {

        if (this.state.selecteParentdType === "")
            this.setState({ allowSearch: false })
        else
            this.setState({ confirmSearch: !this.state.confirmSearch });
    }

    handleSaveParent = () => {
        console.log(this.state);
    }

    handleMagic = () => {

        new Connect().resetSVGsize();
        new Connect().connectAll();
    }
    handleThree(e) {


        if (e.target.getAttribute("data-parenttype") == "0")
            this.setState({ isthreewayactive: true });
        else
            this.setState({ isthreewayactive: false, parentthreeway: e.target.getAttribute("data-parenttype") });


    }

    ErrorMessage(message) {
        return (
            <div>{message}</div>
        )
    }
    render() {
        return (
            <div className="">


                <div className="teer-flex-row teer-flex-row-spread">
                    <div style={{ width: 400 }} className=" teer-l-pill">
                      
                        <div className="fancy">
                            <h3>What type of parent </h3>
                            <span className="teer-margin">
                                <input type="radio" onChange={this.handleSelectedTypeChanged} name="ParentType" value="1" id="inpt1" /><label htmlFor="inpt1">Biological</label>
                            </span>

                            <span className="teer-margin">
                                <input type="radio" onChange={this.handleSelectedTypeChanged} name="ParentType" value="2" id="inpt2" /><label htmlFor="inpt2">Step</label>
                            </span>

                            <span className="teer-margin">
                                <input type="radio" onChange={this.handleSelectedTypeChanged} name="ParentType" value="3" id="inpt3" /><label htmlFor="inpt3">Adapting</label>
                            </span>
                        </div>
                        <br />
                        {
                            this.state.allowSearch ? null : this.ErrorMessage("You have not selected the parent type above")
                        }
                        <br />


    {/* i intend to make a module from heere */}

                             
                        <div className="teer-flex-row teer-flex-center">
                            <div style={{ marginRight: "auto", position: "relative", width: 70 }}>

                                {
                                    this.state.isthreewayactive ?

                                        <div className="teer-options-menu" style={{ position: "absolute", top: -35 }}>
                                            <div data-parenttype={"father"} onClick={e => { this.handleThree(e) }} className="teer-options-search teer-btn"> Father </div>
                                            <div data-parenttype={"mother"} onClick={e => { this.handleThree(e) }} className="teer-options-search teer-btn"> Mother </div>
                                            <div data-parenttype={"both"} onClick={e => { this.handleThree(e) }} className="teer-options-search teer-btn"> Both  </div>

                                        </div> :
                                        <div data-parenttype={0} onClick={e => { this.handleThree(e) }} className="teer-options-search teer-btn"> {this.state.parentthreeway} </div>
                                }
                            </div>
                            <div className="teer-text teer-relative">
                                <input onChange={this.handleSearchText} value={this.state.newmembercode} placeholder="member code" type="text" />
                                <i onClick={this.handleSearch} className="fa fa-search"></i>
                            </div>
                        </div>
                        <br />
                        <br />

                        <div style={{ display: this.handleConfirmationVisibilty() }} className="teer-search-results">

                            <span>
                                {this.state.confirmSearch ? <span className="teer-c-msg"> <i className="fa fa-check"></i> Member confrimed</span> : <span className="teer-found-title">Found Results</span>}
                            </span>
                            <div className="teer-flex-row teer-flex-v-center  teer-l-pill" >
                                <span className="teer-round-img teer-flex-row teer-flex-center">
                                    <img src={require('../../img/man.jpg')} alt="" srcSet="" />
                                </span>
                                <span className="">
                                    Rono asanda
                                </span>
                                <span style={{ alignSelf: "flex-end", marginLeft: "auto" }} className="">
                                    <button onClick={() => this.handleConfirm(false)} className="teer-btn teer-btn-secondary">
                                        refute </button>
                                    <button onClick={() => this.handleConfirm(true)} className="teer-btn teer-btn-primary">
                                        confirm </button>
                                </span>
                            </div>

                            <div className="teer-confirmation">
                                <h5> Your mother </h5>
                                <div className="teer-flex-column teer-flex-v-center">

                                    {/* <div className=" teer-blanket">
                                    <div>
                                    <span className="teer-round-img teer-flex-row teer-flex-center">
                                        <img src={require('../../img/female.jpg')} alt="" srcset="" />                                      
                                    </span>                                  
                                    Wilson Muati
                                    </div>
                                </div> */}
                                    <div style={{ alignSelf: "stretch",flexWrap:"wrap" }} className="teer-parents teer-flex-row teer-margin-small teer-flex-row-even">


                                        <div data-pid="11111" className={this.GetClassNames("go1") + "teer-parent-item"} id="go1" onClick={this.handleSelectedParent}>
                                            <span className="teer-round-img teer-flex-row teer-flex-center teer-small">
                                                <img src={require('../../img/female.jpg')} alt="" srcSet="" />
                                            </span>
                                            <span>
                                                Happiness
                                    </span>
                                        </div>

                                        <div data-pid="2222" id="go2" className={this.GetClassNames("go2") + "teer-parent-item"} onClick={this.handleSelectedParent}>
                                            <span className="teer-round-img teer-flex-row teer-flex-center teer-small">
                                                <img src={require('../../img/female.jpg')} alt="" srcSet="" />
                                            </span>
                                            <span>
                                                Happiness
                                    </span>
                                        </div>
                                        <div data-pid="33333" id="go3" className={this.GetClassNames("go3") + "teer-parent-item"} onClick={this.handleSelectedParent} >
                                            <span className="teer-round-img teer-flex-row teer-flex-center teer-small">
                                                <img src={require('../../img/female.jpg')} alt="" srcSet="" />
                                            </span>
                                            <span>
                                                Happiness
                                               </span>
                                        </div>

                                        <div data-pid="33333" id="go3" className={this.GetClassNames("go3") + "teer-parent-item"} onClick={this.handleSelectedParent} >
                                            <span className="teer-round-img teer-flex-row teer-flex-center teer-small">
                                                <img src={require('../../img/female.jpg')} alt="" srcSet="" />
                                            </span>
                                            <span>
                                                Happiness
                                               </span>
                                        </div>
                                        <div data-pid="33333" id="go3" className={this.GetClassNames("go3") + "teer-parent-item"} onClick={this.handleSelectedParent} >
                                            <span className="teer-round-img teer-flex-row teer-flex-center teer-small">
                                                <img src={require('../../img/female.jpg')} alt="" srcSet="" />
                                            </span>
                                            <span>
                                                Happiness
                                               </span>
                                        </div>


                                        <div data-pid="33333" id="go3" className={this.GetClassNames("go3") + "teer-parent-item"} onClick={this.handleSelectedParent} >
                                            <span className="teer-round-img teer-flex-row teer-flex-center teer-small">
                                                <img src={require('../../img/female.jpg')} alt="" srcSet="" />
                                            </span>
                                            <span>
                                                Happiness
                                               </span>
                                        </div>

                                    </div>

                                    <div>
                                        <button className="teer-btn teer-btn-secondary">Cancel</button>
                                        <button onClick={this.handleSaveParent} className="teer-btn teer-btn-primary">Add Parent</button>
                                    </div>

                                </div>
                            </div>


                        </div>
                        <div >
                            {/* buttoms or something */}
                        </div>

                    </div>

                    {/* this is the second column  */}
                    <div style={{ width: 700 }} className="teer-flex-column  teer-l-pill">

                        <GraphBuilder registerType="parent" people={[{ id: 1 }, { id: 2 }, { id: 3 }]} />


                    </div>
                </div>

            </div>
        )
    }
}





export default Relative;
