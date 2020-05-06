import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Orders extends Component {
    constructor(state) {
        super(state);
        this.state = {
            orders: [],
            user: [],
            product: [],


        }

    }




    componentDidMount() {
        console.log("Component did mount")
        axios.get("http://localhost:4000/get_order").then(res => {
            this.setState({ orders: res.data })
            console.log(this.state.orders)
        })
        axios.get("http://localhost:4000/find_users/").then(res => {
            this.setState({ user: res.data })
            // console.log(this.user.orders)
        })
        axios.get("http://localhost:4000/find_products/").then(res => {
            this.setState({ product: res.data })
            console.log(this.state.product)
        })
    }



    componentDidUpdate(PrevProps, PrevState) {
        if ((PrevState.orders.length !== this.state.orders.length) || (PrevState.orders === this.state.orders)) {
            console.log("Component did update")
            axios.get("http://localhost:4000/get_order").then(res => this.setState({
                orders: res.data,

            }));
        }
    }

    delete1 = (id) => {
        axios.delete("http://localhost:4000/delete_order/" + id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    orders: this.state.orders.filter(el => el._id !== id)
                })
            })

    }


    render() {
        return (<div className="sellingpt-content nsemails">

            <div className="container-fluid" style={{ marginTop: "5%" }}>
                <table class="table table-striped  ">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Customer Name</th>
                            <th >Customer Phone Number</th>
                            <th>Customer Adress</th>
                            <th >Product Name</th>
                            <th >Product Price</th>
                            <th>Quantity</th>
                            <th>Total/product</th>
                            <th>Delete</th>

                        </tr>
                    </thead>
                    <tbody>{this.state.orders.map(el => <tr>
                        <td>date</td>
                        <td>{el.user.Name}</td>
                        <td >{el.user.Phone_Number}</td>
                        <td>{el.user.Adress}</td>
                        <td >{el.product.Product_Name}</td>
                        <td>{el.product.Price}</td>
                        <td>{el.quantity}</td>
                        <td>{el.SubTotal}</td>
                        <td ><button class="btn btn-primary btn-xs" style={{ marginRight: "2px" }} onClick={() => { if (window.confirm('Are you sure you wish to delete this order?')) { this.delete1(el._id) } }}><i class="fa fa-trash-o "></i></button> </td>

                    </tr>

                    )
                    }</tbody>

                </table>

            </div>
        </div>);
    }
}

export default Orders;