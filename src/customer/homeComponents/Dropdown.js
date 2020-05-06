import React, { Component } from 'react';
import { Navbar, Button, Form, FormControl, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt from 'jwt-decode';
class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    // componentDidMount() {
    //     this.setState({
    //         token: localStorage.getItem('token')

    //     })
    // }

    logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }


    render() {


        return (<div>
            <Navbar bg="light" expand="lg" className="NavMenu" >
                <Link to="/c/"><i class="fas fa-home"></i></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                        <div className="MenuSection">
                            <Link to="/c/laMarque/"><span>  La marque</span>
                            </Link>
                            <Link to="/c/products/"><span> Nos produits</span>
                            </Link>
                            <Link to="/c/entreprises/"><span> Nos services</span>
                            </Link>
                            <Link to="/c/nousContacter/"><span> Nous Contacter </span>
                            </Link>
                            <Link to="/c/blog/"><span> Blog</span>
                            </Link>


                            <div className="MenuSectionBtn" >
                                <Link to="/c/connexion"> <span className="CnxBtn" onClick={(this.props.token) && this.logout}>{(this.props.token) ? "Déconnecter" : "Se Connecter"}</span></Link>
                                <Link to={(this.props.token) ? `/c/products/order/${jwt(this.props.token).userId}` : "/c/inscription"} ><span className="InscBtn"> {(this.props.token) ? <i class="fas fa-shopping-basket"></i> : "S'inscrire"} </span></Link>
                            </div>



                        </div>

                    </Nav>

                </Navbar.Collapse>
            </Navbar>



        </div >);
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        changeInput: (e) => {
            dispatch({ type: "CHANGE-INPUT", search: e.target.value })

        }
    }
}



const mapStateToProps = ({ SearchFilter }) => {
    return {
        SearchFilter: SearchFilter,

    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);



/**
                        <Form inline>
                            <FormControl type="text" placeholder="Recherche" className="mr-sm-2 searchb" onChange={(e) => this.props.changeInput(e)} />
                            <Button className="searchbarBtn" variant="outline-success">OK</Button>
                        </Form> */