import React, { Component } from 'react';
import Data from '../../../store/data'

import GraphBuilder from '../../../util/GraphBuliders'

class Parent extends React.Component {
    state = {
        selectedParentGenderType: null,
        showParentSectionOptions: false,
        parentBiologicalOption: 0,
        searchMember1code: "",
        searchMember2code: "",
        searchedResult: [],
        personConfirmed: false

    }

    handleParentBiologicalTypes(e) {
        this.setState({ ParentBiologicalOption: e.target.value })
    }



    handleParentGender(e) {
        if (e.target.id == 3)
            this.setState({ showParentSectionOptions: true })
        else
            this.setState({ showParentSectionOptions: false, selectedParentGenderType: e.target.value });
    }

    handleSearchText(e) {
        console.log(e.target.value)
        this.setState({ searchMember1code: e.target.value });
    }

    handleSearch(e) {

        let searchedPerson = Data.filter((user) => {
            return user.id == this.state.searchMember1code;
        })


        this.setState({ searchedResult: searchedPerson });


    }
    handleConfirm(status) {
        this.setState({ personConfirmed: status })
    }
    SearchResult(item) {
        return (
            <div className="teer-flex-row teer-flex-v-center  teer-l-pill" >
                <span className="teer-round-img teer-flex-row teer-flex-center">
                    <img src={item.img} alt="" srcSet="" />
                </span>
                <span className="">
                    {item.firstname}
                </span>
                <span style={{ alignSelf: "flex-end", marginLeft: "auto" }} className="">
                    <button onClick={() => this.handleConfirm(false)} className="teer-btn teer-btn-secondary">
                        refute </button>
                    <button onClick={() => this.handleConfirm(true)} className="teer-btn teer-btn-primary">
                        confirm </button>
                </span>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className="fancy">
                    <h3>What type of parent </h3>
                    <span className="teer-margin">
                        <input type="radio" onClick={e => { this.handleParentBiologicalTypes(e) }} name="ParentType" value="1" id="inpt1" /><label htmlFor="inpt1">Biological</label>
                    </span>

                    <span className="teer-margin">
                        <input type="radio" onClick={e => { this.handleParentBiologicalTypes(e) }} name="ParentType" value="2" id="inpt2" /><label htmlFor="inpt2">Step</label>
                    </span>

                    <span className="teer-margin">
                        <input type="radio" onClick={e => { this.handleParentBiologicalTypes(e) }} name="ParentType" value="3" id="inpt3" /><label htmlFor="inpt3">Adapting</label>
                    </span>
                </div>
                {/*en of top sectipon*/}

                <br />


                {/* two column wrapper */}
                <div className="teer-flex-row" style={{}}>

                    <div style={{ flex: 1 }}>
                        {/* //search bar thingy */}
                        <div className="teer-flex-row teer-flex-center">
                            <div style={{ marginRight: "auto", position: "relative", width: 70 }}>

                                {
                                    this.state.showParentSectionOptions ?

                                        <div className="teer-options-menu" style={{ position: "absolute", top: -35 }}>
                                            <input id={1} value="Father" type="button" onClick={e => { this.handleParentGender(e) }} className="teer-options-search teer-btn" />
                                            <input id={2} value="Mother" type="button" onClick={e => { this.handleParentGender(e) }} className="teer-options-search teer-btn" />
                                        </div> :
                                        <input id={3} value={this.state.selectedParentGenderType || "Father"} type="button" onClick={e => { this.handleParentGender(e) }} className="teer-options-search teer-btn" />

                                }
                            </div>
                            <div className="teer-text teer-relative">
                                <input onChange={e => { this.handleSearchText(e) }} value={this.state.searchMember1code} placeholder="member code" type="text" />
                                <i onClick={e => { this.handleSearch(e) }} className="fa fa-search"></i>
                            </div>
                        </div>
                        <br />
                        <br />


                        {/* //search results thingy */}
                        <div>
                            {
                                this.state.searchedResult.map((item) => {
                                    return <div key={item.id}>{this.SearchResult(item)} </div>
                                })
                            }
                        </div>

                        {/* //select second parent(mother/father) */}

                        {
                            this.state.personConfirmed ? <div>


                                <div className="teer-confirmation">
                                    <h5> Your mother </h5>
                                    <div className="teer-flex-column teer-flex-v-center">


                                        <div style={{ alignSelf: "stretch", flexWrap: "wrap" }} className="teer-parents teer-flex-row teer-margin-small teer-flex-row-even">

                                            {
                                                this.state.searchedResult.map((parent, index) => {
                                                    return parent.partners.map((partner) => {
                                                        return <div data-pid="11111" className={+ "teer-parent-item"} id="go1" onClick={this.handleSelectedParent}>
                                                            <span className="teer-round-img teer-flex-row teer-flex-center teer-small">
                                                                <img src={partner.img} alt="" srcSet="" />
                                                            </span>
                                                            <span>
                                                                {partner.firstname}
                                                            </span>
                                                        </div>
                                                    })
                                                })
                                            }






                                        </div>

                                        <div>
                                            <button className="teer-btn teer-btn-secondary">Cancel</button>
                                            <button onClick={this.handleSaveParent} className="teer-btn teer-btn-primary">Add Parent</button>
                                        </div>

                                    </div>
                                </div>





                            </div> : null
                        }

                    </div>


                    {/* // second column       */}
                    <div style={{ flex: 1 }}>

                        <GraphBuilder graphType={1} dataItems={this.state.searchedResult} registerType="parent" />
                    </div>
                    {/* //end of secoind column  */}
                </div>



                {/* // end of the wrapper */}

            </div>
        )
    }


}

export default Parent







