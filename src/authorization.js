import React, { Component } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

class Authorization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        if (!token) {
            this.props.history.push('/c/inscription')
        }

        else {
            Axios.get("http://localhost:4000/find_users/", { headers: { authorization: `${token}` } }).then(res => {
                if (res.data) {
                    this.setState({ users: res.data })


                } else {
                    Axios.get("http://localhost:4000/find_admins/", { headers: { authorization: `${token}` } }).then(res => {
                        {
                            this.setState({ users: res.data })
                            localStorage.setItem('user', "admin")
                        }
                    })
                }

            }

            )
        }
    }



    render() {

        if (this.props.user == localStorage.getItem('user')) {
            return (<div> {this.props.children}</div >);
        } else {
            return (<div>not authorized</div>)
        }


    }
}

export default withRouter(Authorization);