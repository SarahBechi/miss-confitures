import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: "",
            password: ""
        }
    }
    render() {
        return (<div className="adminlogn">
            <input placeholder="@-email" onChange={(e) => this.setState({ Email: e.target.value })}></input>
            <div className="pswordDiv admnPsw">
                <i class="fas fa-eye psShowIcon" onClick={this.toggleShow}></i>
                <input placeholder="Mot de passe" type={this.state.hidden ? "password" : "text"} onChange={(e) => this.setState({ password: e.target.value })} ></input>

            </div>
            <span className="lognBtn"> <Link to="/a/">Login </Link></span>
        </div>);
    }
}

export default AdminLogin;