import React, { Component } from 'react';
import axios from 'axios'
import Connect from '../../lib/js/Connector'
import './pedegree.css'
import './tree.css'
import $ from 'jquery'
class PedegreeDashboard extends Component {


    constructor() {
        super();
        this.state = {
            data: [],
            paths: []

        }
        this.findChildInList = (ifkChildCode) => {

            var _Users = (this.state.data[0] || []);

            var d = _Users.find(w => w.ipkmemberid == ifkChildCode);

            return d;

        }


        this.Ul = React.createRef();
        this.paths = []
            ;
    }

    handleGetUsersPedegree = _User => {

        axios.post('http://localhost:5000/relative/loadPedegree', { memberid: 16 })
            .then((response, error) => {

                console.log(response);

                this.setState({ data: response.data.rows });


                console.log(this.state);

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

 

    createPanes ()  {

        var _Users = (this.state.data[0] || []);

        var GroupedLevelUsers = this.groupBy(_Users, "level");

        return Object.keys(GroupedLevelUsers).map((levelItem, index) => {

            var users = GroupedLevelUsers[levelItem];

            return <li className="teer-flex-row">{

                users.map(_user => {

                    this.paths.push({ start: "#node-" + _user.ipkmemberid, end: "#node-" + _user.ifkchildid, stroke: "yellow" });


                    return <div code={_user.ipkmemberid} child={_user.ifkchildid} className="item teer-member-item teer-flex-column">

                        <div id={"node-" + _user.ipkmemberid} code={_user.ipkmemberid} className={`child teer-member-circle child-${_user.ifkchildid}`}>
                            <img alt="pd" src={_user.profilepicture} />
                        </div>
                        <div style={{ padding: 7, margin: "3 px 7px", position: "relative" }}>
                            <span className="teer-user-details" >
                                {_user.firstname}
                                <span style={{ display: "none" }}>
                                    &nbsp;  {_user.surname}   {_user.id}
                                </span>
                            </span>
                        </div>


                    </div>
                })



            }    </li>

        })
    }


    componentDidMount() {
        this.handleGetUsersPedegree(16);


    }

    componentWillUpdate() {
       // this.Paths = [];
    }
    componentDidUpdate() {


        console.log(this.Ul);

        var $ul = $(this.Ul);

        var previusChildren = [];

        $ul.find("li").each((i, item) => {

            var $li = $(item);

            var $cloneLIs = $li.clone();

            previusChildren.map((div, index) => {

                if (!index) $li.html("");

                var el = $cloneLIs.find("div[child = '" + div.getAttribute("code") + "']");

                 
                $li.append(el.length? el:$("<div class = 'item'></div>"));

            })
            previusChildren = $(item).find(".item").get();

        });

        setTimeout(() => {
            console.log(this.paths);

            new Connect({ paths: this.paths, orientation: "horizontal" }).Plugin();
        }, 500);

    }
    render() {
        return (


            <div className="teer-paneWondowConatainer" style={{ flexFlow: "column-reverse", position: "relative" }} >
                <div>

                    <div id="divId" className="svgContainer"></div>
                    <ul ref={ref => this.Ul = ref} className="teer-flex-column" style={{ flexFlow: "column-reverse" }}>

                        {this.createPanes()}

                    </ul>

                </div>
            </div>




        )
    }
}
export default PedegreeDashboard;