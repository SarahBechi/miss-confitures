import React, { Component } from 'react';
import axios from 'axios'

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactform: []
        }
    }

    componentDidMount() {
        console.log("Component did mount")
        axios.get("http://localhost:4000/find_contactforms/").then(res => {
            this.setState({ contactform: res.data })
            console.log(this.state.contactform)
        })
    }

    componentDidUpdate(PrevProps, PrevState) {
        if ((PrevState.contactform.length !== this.state.contactform.length) || (PrevState.contactform === this.state.contactform)) {
            console.log("Component did update")
            axios.get("http://localhost:4000/find_contactforms/").then(res => this.setState({
                contactform: res.data,

            }));
        }
    }

    deleteMessage = (id) => {
        axios.delete("http://localhost:4000/delete_contactform/" + id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    contactform: this.state.contactform.filter(el => el._id !== id)
                })
            })

    }

    render() {
        return (<div className="sellingpt-content nsemails ">
            <div className="container-fluid" style={{ marginTop: "5%" }}>
                <table class="table table-striped  ">
                    <thead>
                        <tr>

                            <th>Date</th>
                            <th >Name</th>
                            <th>Company</th>
                            <th> Email</th>
                            <th> Phone Number</th>
                            <th> Message Object</th>
                            <th> Message</th>
                            <th>Delete</th>

                        </tr>
                    </thead>
                    <tbody>{this.state.contactform.map(el => <tr>
                        <td>Date</td>
                        <td>{el.Name}</td>
                        <td >{el.Company}</td>
                        <td>{el.ContactEmail}</td>
                        <td>{el.ContactPhoneNumber}</td>
                        <td>{el.MessageObject}</td>
                        <td>{el.Message}</td>
                        <td ><button class="btn btn-primary btn-xs" style={{ marginRight: "2px" }} onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) { this.deleteMessage(el._id) } }}><i class="fa fa-trash-o "></i></button> </td>
                    </tr>

                    )
                    }</tbody>

                </table>

            </div>
        </div>);

    }
}

export default ContactForm;


