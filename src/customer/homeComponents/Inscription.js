import React, { Component } from 'react';
import axios from 'axios';
class Inscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
            First_Name: "",
            Last_Name: "",
            Email: "",
            password: ""
        }
        this.toggleShow = this.toggleShow.bind(this);
    }

    toggleShow() {
        this.setState({ hidden: !this.state.hidden });
    }





    Signin = () => {
        axios.post("http://localhost:4000/signin", { First_Name: this.state.First_Name, Last_Name: this.state.Last_Name, Email: this.state.Email, password: this.state.password, })
            .then(res => alert(res.data.message)).catch(res => alert('user already exists'))

    }




    render() {
        return (<div className="InscriptionSct">
            <input placeholder="Nom" onChange={(e) => this.setState({ Last_Name: e.target.value })}></input>
            <input placeholder="Prénom" onChange={(e) => this.setState({ First_Name: e.target.value })}></input>
            <input placeholder="@-email" onChange={(e) => this.setState({ Email: e.target.value })}></input>
            <div className="pswordDiv">
                <i class="fas fa-eye psShowIcon" onClick={this.toggleShow}></i>
                <input placeholder="Mot de passe" type={this.state.hidden ? "password" : "text"} onChange={(e) => this.setState({ password: e.target.value })} ></input>
            </div>
            <span onClick={this.Signin}> S'inscrire</span>
        </div>);
    }
}

export default Inscription;