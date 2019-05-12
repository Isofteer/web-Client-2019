import React, { Component } from 'react';
import axios from 'axios'

import Connect from '../../lib/js/Connector'
import './pedegree.css'


class PedegreeDashboard extends Component {


    constructor() {
        super();
        this.state = {
            data: []

        }
        this.paths = []
        this.ReactPane = [];
    }

    handleGetUsersPedegree = _User => {

        axios.post('http://localhost:5000/relative/loadPedegree', { memberid: 16 })
            .then((response, error) => {

                console.log(response);

                this.setState({ data: response.data.rows });

            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };
    
    createPanes = () => {

        var _Users = (this.state.data[0] || []);

        var GroupedLevlUsers = this.groupBy(_Users, "level");

        var fn_createListItem = _user => {
            var _cls = "ghost-element";

            if (!_user.empty) {
                _cls = "";
                if(_user.ifkchildid)
                   this.paths.push({ start: "#node-" + _user.ipkmemberid, end: "#node-" + _user.ifkchildid, stroke: "yellow" });

            }
           

            var style = {}

            if(_user.gender ==="male")
                       style = {right:0}

            return <div className={"teer-member-item teer-flex-column " + _cls}>
                <div id={"node-" + _user.ipkmemberid} className="teer-member-circle">
                    <img alt="pd" src={_user.profilepicture} />
                </div>
                <div style={{ padding: 7, margin: "3 px 7px",position:"relative" }}>
                   <span className="teer-user-details" style = {style}>
                     {_user.firstname} 
                     <span style ={{display:"none"}}>
                     &nbsp;  {_user.surname}   {_user.id}
                     </span>
                   </span>
                </div>
            </div>
        }



        return Object.keys(GroupedLevlUsers).map((level, index) => {

            var _usersInLevel = GroupedLevlUsers[level];


            var fn = (currentUsers, id) => <div className="parents teer-flex-row">
                {
                    (() => {

                        if (!currentUsers.length)
                            currentUsers = [{ empty: true, id }, { empty: true, id }]

                            
                     console.log({currentUsers})


                        return currentUsers.reverse().map((_user) => {
                            _user.id = id;
                            return fn_createListItem(_user);
                        })

                    })()
                }
            </div>

            var style = {}

            if ((level % 2) == 1) {
                style = { flexFlow: "row-reverse" };
            }

            return <li style={style} className="level teer-flex-row">
                {
                    (u => {
                        var previousChildren = GroupedLevlUsers[level - 1] || _usersInLevel;

                        

                        // var ort=  previousChildren.sort((a, b) => b.gender.localeCompare(a.gender));
                         console.log({previousChildren})

                        return previousChildren.map((_prevoiusChild, i) => {

                            var _parents = GroupedLevlUsers[level].filter(_parent => (_parent.ifkchildid == _prevoiusChild.ipkmemberid));
                          
                        
                            if((level %2)==1)
                              _parents = _parents.reverse();


                            if (!index)
                                return fn(GroupedLevlUsers[level], _prevoiusChild.ipkmemberid);
                            else
                                return fn(_parents, _prevoiusChild.firstname);


                        })

                    })()

                }
            </li>
        })


    }
    componentDidMount() {
        this.handleGetUsersPedegree(16);
    }

    componentWillUpdate() {
        this.paths = [];
    }
    componentDidUpdate() {   
        setTimeout(() => {
            new Connect({ paths: this.paths, orientation: "auto" }).Plugin();
        }, 1000);

        console.log(this.paths)
    }
    render() {
        return (


            <div className="teer-paneWondowConatainer" style={{ flexFlow: "column-reverse", position: "relative" }} >
                <div>

                <div id="divId" className="svgContainer"></div>
                   <ul className="teer-flex-column" style={{ flexFlow: "column-reverse" }}>
             
                                    {this.createPanes()}
             
              </ul>

                </div>
            </div>
         
            


        )
    }
}
export default PedegreeDashboard;