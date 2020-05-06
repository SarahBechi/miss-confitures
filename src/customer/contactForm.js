import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Company: "",
            ContactEmail: "",
            ContactPhoneNumber: "",
            MessageObject: "",
            Message: "",

        }
    }

    setName = e => {
        this.setState({
            Name: e.target.value
        })
    }

    setCompany = e => {
        this.setState({
            Company: e.target.value
        })
    }


    setContactEmail = e => {
        this.setState({
            ContactEmail: e.target.value
        })
    }

    setContactPhoneNumber = e => {
        this.setState({
            ContactPhoneNumber: e.target.value
        })
    }

    setMessageObject = e => {
        this.setState({
            MessageObject: e.target.value
        })
    }

    setMessage = e => {
        this.setState({
            Message: e.target.value
        })
    }


    addContactInf = () => {


        let formdat = new FormData();

        formdat.append('Name', this.state.Name)
        formdat.append('Company', this.state.Company)
        formdat.append('ContactEmail', this.state.ContactEmail)
        formdat.append('ContactPhoneNumber', this.state.ContactPhoneNumber)
        formdat.append('MessageObject', this.state.MessageObject)
        formdat.append('Message', this.state.Message)

        axios.post("http://localhost:4000/add_contactform", formdat)
        alert('votre message a été envoyé !')
    }





    render() {
        return (<div className="contForm">
            <Form>
                <h1 className="userFormTitle">Nous contacter</h1>
                <div className="userForm">
                    <Form.Control placeholder="Nom et Prénom" className="contactInput" value={this.state.Name} onChange={this.setName} />
                    {console.log(this.Name)}
                    <Form.Control placeholder="Entreprise" className="contactInput" value={this.state.Company} onChange={this.setCompany} />
                    {console.log(this.Company)}
                    <Form.Control placeholder="Adresse email" className="contactInput" value={this.state.ContactEmail} onChange={this.setContactEmail} />
                    <Form.Control placeholder="Numéro de Téléphone" className="contactInput" value={this.state.ContactPhoneNumber} onChange={this.setContactPhoneNumber} />
                    <Form.Control placeholder="Objet du Message" className="contactInput" value={this.state.MessageObject} onChange={this.setMessageObject} />
                    <textarea placeholder="Message" className="messageInput" value={this.state.Message} onChange={this.setMessage} />
                    <Button variant="primary" type="Envoyer" className="envoyerBtn neon" onClick={this.addContactInf}> Envoyer </Button>
                </div>
            </Form>
        </div>
        );
    }
}

export default ContactForm;