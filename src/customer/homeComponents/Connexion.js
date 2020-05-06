import React, { Component } from 'react';
import { Modal, ModalBody, Button } from 'reactstrap';
import axios from 'axios';

class Connexion extends Component {
    constructor(state) {
        super(state);
        this.state = {
            hidden: true,
            modal: state.initialModalState,
            fade: true,
            Email: "",
            password: ""

        }
        this.toggleShow = this.toggleShow.bind(this);

        this.toggle = this.toggle.bind(this);
    }

    toggleShow() {
        this.setState({ hidden: !this.state.hidden });
    }


    toggle() {
        this.setState({
            modal: !this.state.modal,
            fade: !this.state.fade

        });
    }




    componentDidMount() {
        localStorage.removeItem('token')
    }

    login = () => {

        axios.post("http://localhost:4000/login", { Email: this.state.Email, password: this.state.password })
            .then(res => {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user', "client")
                //alert(res.data.message)
                this.props.history.push('/c/products/')
            }
            ).catch(er => {
                axios.post("http://localhost:4000/loginadmin", { Email: this.state.Email, password: this.state.password })
                    .then(res => {
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('user', "admin")
                        // alert(res.data.message)
                        this.props.history.push('/a/')
                    })
            })
    }








    render() {
        return (<div>
            <div className="ConnexionSct">
                <input placeholder="@-email" value={this.state.Email} onChange={(e) => this.setState({ Email: e.target.value })}></input>
                <div className="pswordDiv">
                    <i class="fas fa-eye psShowIcon" onClick={this.toggleShow}></i>
                    <input placeholder="Mot de passe" value={this.state.password} className="pswrdInput" type={this.state.hidden ? "password" : "text"} onChange={(e) => this.setState({ password: e.target.value })}></input><br></br>

                </div>
                <p className="forgtPSword" onClick={this.toggle} >Mot de passe oublié ?</p>
                <span onClick={this.login}> Se Connecter</span>
            </div>)

            <div><Modal isOpen={this.state.modal} toggle={this.toggle}
                fade={this.state.fade}
                className={this.props.className}>
                <ModalBody >
                    <h5>Veuillez entrer votre adresse e-mail</h5>
                    <input placeholder="@-email" style={{ padding: "5px", width: "400px", margin: "20px" }}></input><br></br>
                    <Button>Envoyer</Button>
                </ModalBody>
            </Modal></div>

        </div>)

    }
}

export default Connexion;