import React, { Component } from 'react';
import axios from 'axios'
import './pedegree.css'


class PedegreeDashboard extends Component {


    constructor() {
        super();
        this.state = {
            data: []
        }

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


    createPanes = () => {

        var _Users = (this.state.data[0] || []);

        var _templateIndex =-2;


        return _Users.reverse().map(_user => {
            if (_user.level !== _templateIndex) {

                _templateIndex =_user.level;

                return <li className="teer-section-content teer-flex-row">
                {
                    _Users.map((_user) => {
                        if (_user.level === _templateIndex)
                            return <div className="teer-member-item teer-flex-column">
                                            <div id ={_user.ipkmemberid} className="teer-member-circle">
                                                <img alt="pd" src={_user.profilepicture} />
                                            </div>
                                            <span>
                                               {_user.firstname}  &nbsp;  {_user.surname}  &nbsp; {_user.middlename}
                                            </span>
                            </div>
                    })
                }
            </li>

            }
        
        });



    }
    componentDidMount() {
        this.handleGetUsersPedegree(16);
    }

    componentWillUpdate() {

    }
    componentDidUpdate() {


    }
    render() {
        var _templateIndex = -2;

        return (
           

                <ul className="teer-paneWondowConatainer">
                   {this.createPanes()} 
                </ul>

          
        )
    }
}
export default PedegreeDashboard;