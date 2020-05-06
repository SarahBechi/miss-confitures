import React, { Component } from 'react';
import axios from 'axios'
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from "react-router-dom";
import jwt from 'jwt-decode';




class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: []
        }
    }

    logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    componentDidMount() {
        console.log("Component did mount")
        axios.get("http://localhost:4000/find_admins/").then(res => {
            this.setState({ admin: res.data })
            console.log(this.state.admin)
        })
    }

    render() {
        return (<div className="cont">

            <div className="cardHolder">

                <div className="adminInfo">

                    <i class="fas fa-user-circle"></i>
                    <div className="adminDropdown">
                        <DropdownButton id="dropdown-item-button"  >
                            <Link to={(this.props.token) ? `/a/${jwt(this.props.token).userId}` : "/c/inscription"} >   <Dropdown.Item className="logOut" as="button" onClick={(this.props.token) && this.logout} >Log Out</Dropdown.Item></Link>
                        </DropdownButton>
                        {this.state.admin.map(el => <div className="blogPost" key={el._id}>
                            <span>{el.Name}</span>
                        </div>)}
                    </div>
                </div>


                <div className="sidebarBtns">

                    <Link to="/a/orders"><Button variant="outline-secondary"><i class="fas fa-receipt"></i>  Orders</Button></Link>
                    <Link to="/a/events"> <Button variant="outline-secondary"><i class="fas fa-calendar-alt"></i>      Events</Button></Link>
                    <Link to="/a/products"><Button variant="outline-secondary"><i class="fab fa-product-hunt"></i>      Products</Button></Link>
                    <Link to="/a/customers"><Button variant="outline-secondary"><i class="far fa-user"></i>      Customers</Button></Link>

                    <Link to="/a/entrepreneurs"><Button variant="outline-secondary"><i class="far fa-user"></i>      Entrepreneurs</Button></Link>
                    <Link to="/a/sellingPts"><Button variant="outline-secondary"><i class="fas fa-map-marker-alt"></i>      Selling Points</Button></Link>
                    <Link to="/a/blogposts"><Button variant="outline-secondary"><i class="fab fa-product-hunt"></i>     Blog Posts</Button></Link>
                    <Link to="/a/contactform"><Button variant="outline-secondary"><i class="fab fa-product-hunt"></i>     Contact Form</Button></Link>
                    <Link to="/a/newsletter"><Button variant="outline-secondary"><i class="fas fa-envelope-open-text"></i>   Newsletter</Button></Link>

                </div>




            </div>
        </div>);
    }
}

export default Sidebar;