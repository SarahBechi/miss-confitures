import React, { Component } from 'react';
import jam from '../images/jam.png';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Axios from 'axios';
import jwt from 'jwt-decode';

class ProductP extends Component {
    constructor(state) {
        super(state);
        this.state = {
            counter: 0,
            modal: state.initialModalState,
            fade: true,
            product: [],
            jar: "",
            total: 0,

        }

    }


    toggle = () => {
        const token = localStorage.getItem('token')
        if (token) {
            const decoded = jwt(token)
            Axios.post('http://localhost:4000/add_order', { quantity: this.state.counter, product: this.props.match.params.id, user: decoded.userId, SubTotal: (this.state.counter) * parseInt((this.state.product[0].Price)) }).then(res => {
                console.log(res.data)
            })

        }
        this.setState({
            modal: !this.state.modal,
            fade: !this.state.fade

        });

    }


    increment = () => {
        this.setState({
            counter: this.state.counter + 1
        });
    }



    decrement = () => {
        if (this.state.counter === 1) {
            this.setState({
                counter: 1
            });
        } else {
            this.setState({
                counter: this.state.counter - 1
            });
        }
    }


    // axios.get(`http://localhost:4000/find_product/${this.props.match.params.id}`)
    componentDidMount() {
        axios.get(`http://localhost:4000/find_product/${this.props.match.params.id}`).then(res => {
            this.setState({ product: [res.data] })

        })
    }

    JarSize = (e) => {
        this.setState({
            jar: e.target.innerHTML
        })
    }
    Subtotal = () => {
        this.setState({ total: ((this.state.counter) * parseInt((this.state.product[0].Price))) })
        console.log(this.state.product[0].Price)
    }



    render() {

        const token = localStorage.getItem('token');
        // const decoded = jwt(localStorage.getItem('token'));
        return (<div className="productSct">
            <div className="PtInfo">{this.state.product.map(el => <div key={el._id}>
                <img alt="produit" style={{ width: "350px", height: "350px", "margin-bottom": "20px" }} src={process.env.PUBLIC_URL + `/upload/${el.Link_Img}`} />
                <h3>{this.state.jar}</h3>
                <h4>{((el.Jar_Size + " Gr") === this.state.jar) && (this.state.counter * el.Price + " DT")} </h4>
            </div>
            )}
            </div>


            <div className="pdRevQtDesc">
                <div className="QtInfo">
                    {this.state.product.map(el => <div key={el._id}>
                        <h2>{el.Product_Name}</h2>
                    </div>
                    )}

                </div>
                <div className="QtCount">
                    <div className="QtCtBtn">
                        <span onClick={this.decrement}>-</span>
                        <span className="QtCounter">{this.state.counter}</span>
                        <span onClick={this.increment}>+</span>
                    </div>


                    <div className="Qtdropdown">
                        <img src={jam} alt="jar" className="jamIcon dpIcon" ></img>
                        <div className="DropQt">
                            {this.state.product.map(el => <div key={el._id}>
                                <p> Disponible en pot de </p>
                                <h5 onClick={(e) => this.JarSize(e)}>{el.Jar_Size} Gr</h5>

                            </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="ptDescrp">
                    {this.state.product.map(el => <div key={el._id}>
                        <p>{el.Description}</p>
                    </div>
                    )}
                    <Button className="constPdt" variant="outline-primary" onClick={this.toggle} >Acheter</Button>
                </div>
            </div>
            {(!token) ?
                <div className="pdtMod">

                    <Modal isOpen={this.state.modal} toggle={this.toggle}
                        fade={this.state.fade}
                        className={this.props.className}>
                        <ModalHeader toggle={this.toggle}></ModalHeader>
                        <ModalBody className="InscripForm">
                            <h3>Connectez-vous pour finaliser votre achat !</h3>
                            <Link to={'/c/connexion'}> <Button className="pdtFBtn2" >Se connecter</Button></Link>
                        </ModalBody>
                        <ModalFooter className="ArtcFormBtns">
                            <Link to={'/c/inscription'}>   <Button className="pdtFBtn1" onClick={this.toggle} >S'inscrire</Button></Link>

                        </ModalFooter>
                    </Modal>

                </div> : <div className="pdtMod">
                    <Modal isOpen={this.state.modal} toggle={this.toggle}
                        fade={this.state.fade}
                        className={this.props.className}>
                        <ModalHeader toggle={this.toggle}></ModalHeader>
                        <ModalBody className="InscripForm">
                            <h3>Article ajouté au panier !</h3>
                            <Link to={`/c/products/order/${jwt(token).userId}`}> <Button className="pdtFBtn2" onClick={this.Subtotal} >Finaliser votre commande</Button></Link>
                        </ModalBody>
                        <ModalFooter className="ArtcFormBtns">
                            <Button className="pdtFBtn1" onClick={this.toggle} >Poursuivre vos achats</Button>

                        </ModalFooter>
                    </Modal>

                </div>}

            <div>
            </div>
        </div >);
    }
}

export default ProductP;