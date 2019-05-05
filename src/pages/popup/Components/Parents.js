import React from 'react';
import axios from 'axios';
import GraphBuilder from '../../../util/GraphBuliders'

class Parent extends React.Component {


    constructor(props) {
        super(props);

        this.ParentSelectedCircle = React.createRef();

        this.state = {
            showParentSectionOptions: false,
            parentBiologicalOption: 0,
            searchedResult: [],
            personConfirmed: false,
            registerTwoParents: false,
            selectedParentGenderType1: "father",
            ifkUserId:18 ,//localStorage.getItem("ifkUserId"),
            savingOptionType: 3
        }



        this.handleSaveParent = () => {

            axios.post('http://localhost:5000/relative/save_parent', this.state)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log('Error fetching and parsing data', error);
                });
        }
    }


    handleParentBiologicalTypes(e, type) {
        this.setState({ ["ParentBiologicalOption" + type]: e.target.value })
    }

    handleParentGender(e, type) {
        if (e.target.id == 3)
            this.setState({ ["showParentSectionOptions" + type]: true })
        else
            this.setState({ ["showParentSectionOptions" + type]: false, ["selectedParentGenderType" + type]: e.target.value });
    }

    handleSearchText(e, type) {

        this.setState({ ["searchMembercode" + type]: e.target.value });
    }

    handleSearch(e, type) {


        if (this.state.ifkUserId === this.state["searchMembercode" + type]) {
            alert("You are attempting to use self identification No.");
            return false;
        }

        axios.post('http://localhost:5000/relative/search_parent', { memberid: this.state["searchMembercode" + type] })
            .then(response => {
                console.log(response);

                let searchedPerson = response.data;

                this.setState({ ["searchedResult" + type]: searchedPerson, partnercode: null });

                console.log(this.state)

            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });

    }
    handleConfirm(status, type) {
        this.setState({ ["personConfirmed" + type]: status })
        if (type == 2) {
            var searchedResult1 = Object.assign({}, this.state.searchedResult1);

            var { firstName, gender, id, img, surname } = this.state.searchedResult2;

            searchedResult1.partners = [...searchedResult1.partners, { firstName, gender, id, img, surname, teeridclass: "teer-child-nodes" }]

            this.setState({ searchedResult1, registerTwoParents: false }, y => {
                this.ParentSelectedCircle.current.click();
            })
        }

    }
    SearchResult(item, type) {
        return (
            <div className="teer-flex-row teer-flex-v-center  teer-l-pill" >
                <span className="teer-round-img teer-flex-row teer-flex-center">
                    <img src={item.img} alt="" srcSet="" />
                </span>
                <span className="">
                    {item.firstName} &nbsp;    {item.surname}
                </span>
                <span style={{ alignSelf: "flex-end", marginLeft: "auto" }} className="">
                    <button onClick={() => {
                        this.handleConfirm(false, type);
                    }
                    } className="teer-btn teer-btn-secondary">
                        Cancel </button>
                    <button onClick={() => this.handleConfirm(true, type)} className="teer-btn teer-btn-primary">
                        confirm </button>
                </span>
            </div>
        )
    }

    handleConfirmationVisibilty = () => {
        return this.state.confirmSearch ? "block" : "none"
    }
    handleSelectedParent = e => {

        var memberid = parseInt(e.currentTarget.getAttribute("data-pid"));

        this.setState({ toogleParent: e.currentTarget.id, partnercode: memberid, registerTwoParents: memberid < 0 ? true : false },
            e => {

                if (this.state.personConfirmed2 || memberid>0 ) {
                    console.log(this.state.searchedResult1)
                    var partner = this.state.searchedResult1.partners.find(p => {
                        return p.id == this.state.partnercode && p.ifkParentId
                    });
                    if (!partner)
                        this.setState({ savingOptionType: 1 });  //add new records to both parents and children table
                    else
                        this.setState({ savingOptionType: 2 }); // update the parent table with one of the ids and insert into children
                }
                else
                    this.setState({ savingOptionType: 3 })  // insert new parent record and  inserting  new children row

            });


    }
    GetClassNames = (id) => {
        return this.state.toogleParent == id ? "selected " : ""
    }
    ParentSearch(personType) {
        return [

            <div key={"keynode" + 1} className="fancy">
                <h3>What type of parent </h3>
                <span className="teer-margin">
                    <input type="radio" onClick={e => { this.handleParentBiologicalTypes(e, personType) }} name={"ParentType" + personType} value="1" id={"ParentType1" + personType} /><label htmlFor={"ParentType1" + personType} >Biological</label>
                </span>

                <span className="teer-margin">
                    <input type="radio" onClick={e => { this.handleParentBiologicalTypes(e, personType) }} name={"ParentType" + personType} value="2" id={"ParentType2" + personType} /><label htmlFor={"ParentType2" + personType} >Step</label>
                </span>

                <span className="teer-margin">
                    <input type="radio" onClick={e => { this.handleParentBiologicalTypes(e, personType) }} name={"ParentType" + personType} value="3" id={"ParentType3" + personType} /><label htmlFor={"ParentType3" + personType} >Adapting</label>
                </span>
            </div>
            ,
            <br key={"keynode" + 2} />,
            <br key={"keynode" + 3} />,
            <div key={"keynode" + 4} className="teer-flex-row teer-flex-center">
                <div style={{ marginRight: "auto", position: "relative", width: 70 }}>

                    {
                        this.state["showParentSectionOptions" + personType] ?

                            <div className="teer-options-menu" style={{ position: "absolute", top: -35 }}>
                                <input id={1} value="Father" type="button" onClick={e => { this.handleParentGender(e, personType) }} className="teer-options-search teer-btn" />
                                <input id={2} value="Mother" type="button" onClick={e => { this.handleParentGender(e, personType) }} className="teer-options-search teer-btn" />
                            </div> :
                            <input id={3} value={this.state["selectedParentGenderType" + personType] || "Father"} type="button" onClick={e => { this.handleParentGender(e, personType) }} className="teer-options-search teer-btn" />

                    }
                </div>
                <div className="teer-text teer-relative">
                    <input onChange={e => { this.handleSearchText(e, personType) }} value={this.state["searchMembercode" + personType]} placeholder="member code" type="text" />
                    <i onClick={e => { this.handleSearch(e, personType) }} className="fa fa-search"></i>
                </div>
            </div>]
    }


    confirmComponent(type) {


        var parent = this.state["searchedResult" + type] || {}

        console.log("---------------------")
        console.log(parent.partners)

        return <div className="teer-confirmation">
            <h5> {
                (this.state["selectedParentGenderType" + type] || "").toLowerCase() == "father" ? "Your Mother" : "Your  father"
            }</h5>
            <div className="teer-flex-column teer-flex-v-center">


                <div style={{ alignSelf: "stretch", flexWrap: "wrap" }} className="teer-parents teer-flex-row teer-margin-small teer-flex-row-even">

                    {

                        (parent.partners || []).map((partner, index) => {
                            return <div key={"keynodeui" + index} data-pid={partner.id} className={this.GetClassNames("ptnr-" + partner.id) + "teer-parent-item"} id={"ptnr-" + partner.id} onClick={this.handleSelectedParent} ref={this.ParentSelectedCircle}>
                                <span className="teer-round-img teer-flex-row teer-flex-center teer-small">
                                    <img src={partner.img} alt="" srcSet="" />
                                </span>
                                <span>
                                    {partner.firstname}
                                </span>
                            </div>
                        })

                    }
                    <div data-pid={-1} className={this.GetClassNames("ptnr-" + -1) + "teer-parent-item"} id={"ptnr-" + -1} onClick={this.handleSelectedParent}>
                        <div className="teer-round-img teer-flex-row teer-flex-center teer-small">
                            <i className={"fa fa-plus"}></i>
                        </div>
                    </div>
                </div>

                <div>
                    <button className="teer-btn teer-btn-secondary">Cancel</button>
                    <button onClick={this.handleSaveParent} className="teer-btn teer-btn-primary">Add Parent</button>
                </div>

            </div>
        </div>

    }

    render() {

        let item = this.state.searchedResult1 || {};
        return (
            <div>

                {/* two column wrapper */}
                <div className="teer-flex-row" style={{}}>

                    <div style={{ flex: 1 }}>
                        {/* //search bar thingy */}
                        {
                            this.ParentSearch(1)
                        }
                        <br />
                        <br />


                        {/* //search results thingy */}
                        <div>
                            {
                                <div>{this.SearchResult(item, 1)} </div>
                            }
                        </div>

                        {/* //select second parent(mother/father) */}

                        {
                            this.state.personConfirmed1 ? <div>
                                {
                                    this.confirmComponent(1)
                                } </div> : null
                        }

                    </div>


                    {/* // second column       */}
                    <div style={{ flex: 1 }}>
                        <div>
                            hwy
                       </div>
                        {
                            this.state.registerTwoParents ?
                                <div>

                                    {this.ParentSearch(2)}

                                    {
                                        (() => {
                                            var item = (this.state.searchedResult2 || {})
                                            return <div key={item.id}>{this.SearchResult(item, 2)} </div>
                                        })()
                                    }

                                </div> :
                                <GraphBuilder graphType={1} dataItem={this.state.searchedResult1 || {}} registerType="parent" />
                        }
                    </div>
                    {/* //end of secoind column  */}
                </div>



                {/* // end of the wrapper */}

            </div>
        )
    }


}

export default Parent







