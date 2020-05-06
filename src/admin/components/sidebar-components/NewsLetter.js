import React, { Component } from 'react';
import axios from 'axios'

class Newsletter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsletteremails: []
        }
    }

    componentDidMount() {
        console.log("Component did mount")
        axios.get("http://localhost:4000/find_newsletters/").then(res => {
            this.setState({ connewsletteremails: res.data })
            console.log(this.state.newsletteremails)
        })
    }

    componentDidUpdate(PrevProps, PrevState) {
        if ((PrevState.newsletteremails.length !== this.state.newsletteremails.length) || (PrevState.newsletteremails === this.state.newsletteremails)) {
            console.log("Component did update")
            axios.get("http://localhost:4000/find_newsletters/").then(res => this.setState({
                newsletteremails: res.data,

            }));
        }
    }

    deleteMessage = (id) => {
        axios.delete("http://localhost:4000/delete_newsletter/" + id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    newsletteremails: this.state.newsletteremails.filter(el => el._id !== id)
                })
            })

    }

    render() {
        return (<div className="sellingpt-content nsemails">
            <div className="container-fluid" style={{ marginTop: "5%" }}>
                <table class="table table-striped  ">
                    <thead>
                        <tr>
                            <th>Newsletter emails</th>
                            <th>Delete</th>

                        </tr>
                    </thead>
                    <tbody>{this.state.newsletteremails.map(el => <tr>

                        <td>{el.NSemail}</td>
                        <td ><button class="btn btn-primary btn-xs" style={{ marginRight: "2px" }} onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) { this.deleteMessage(el._id) } }}><i class="fa fa-trash-o "></i></button> </td>
                    </tr>

                    )
                    }</tbody>

                </table>

            </div>
        </div>);
    }
}

export default Newsletter;

/**<div className="nsemails">
            <h3>Emails List</h3>
            {this.state.newsletteremails.map(el => <div key={el._id} className="emailsNS">
                <p>{el.NSemail}</p>
                <button class="btn btn-primary btn-xs" style={{ marginRight: "2px", "margin-left": "50px" }} onClick={() => { if (window.confirm('Are you sure you wish to delete this email?')) { this.deleteMessage(el._id) } }}><i class="fa fa-trash-o "></i></button>
            </div>

            )}

        </div> */