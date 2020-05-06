import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../csStyle.css'
import Axios from 'axios';
import jwt from 'jwt-decode';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
class OderPage extends Component {
    constructor(state) {
        super(state);
        this.state = {
            order: [],
            totalPrice: 0,
            tt: 0,
            decoded: "",
            modal: state.initialModalState,
            fade: true,
            Phone_Number: 0,
            Adress: ""
        }
    }


    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            fade: !this.state.fade

        });
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        if (token) {
            this.setState({ decoded: jwt(localStorage.getItem('token')) })
        }

        Axios.get('http://localhost:4000/get_order', { user: this.props.match.params.id }).then(res => {
            this.setState({ order: res.data })
            console.log(this.state.order)
            console.log(this.state.order.filter(el => (el.user._id == this.props.match.params.id)).reduce((c, v) => c + Number(v.SubTotal)))
            this.setState({
                tt: this.state.order.filter(el => el.user._id == this.props.match.params.id).reduce((c, v) => c + v.SubTotal, 0)
            })

        })
    }

    setPhone_Number = e => {

        this.setState({
            Phone_Number: e.target.value
        })
    }

    setAdress = e => {

        this.setState({
            Adress: e.target.value
        })
    }



    sendOrder = () => {

        let formdat = new FormData();
        formdat.append('Phone_Number', this.state.Phone_Number)
        formdat.append('Adress', this.state.Adress)

        Axios.put(`http://localhost:4000/update_phone/${this.props.match.params.id}`, formdat)
        Axios.post("http://localhost:4000/add_order")
        alert('Votre commande a bien été enregistrée !')
    }





    deleteOrder = (id) => {
        Axios.delete("http://localhost:4000/delete_order/" + id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    order: this.state.order.filter(el => el._id !== id),
                    tt: this.state.tt - (this.state.order.filter(el => el._id == id).reduce((c, v) => v.quantity * v.product.Price, 0))
                })
            })

    }


    total_Price = () => {
        this.setState({ totalPrice: this.state.product.Price * this.state.quantity })
    }


    render() {


        return (<div className="orderContainer" >
            {console.log(this.state.order)}
            < div className="orderRes" >
                <div className="Shpgcard shopping-cart">
                    <div className="card-header bg-dark text-light panierAt">
                        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                        <Link to={'/c/products'}> <a className="btn btn-outline-info btn-sm pull-right pAchBtn" href="somewhere">Poursuivre les achats</a></Link>


                    </div>

                    {this.state.order.filter(el => el.user._id == this.props.match.params.id).map(el => <div key={el._id}> <div className="card-body">





                        <div className="row articleDets">

                            <img className="img-responsive" src={process.env.PUBLIC_URL + `/upload/${el.product.Link_Img}`} alt="prewiew" width="120" height="80" />

                            <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
                                <h5 className="product-name"><strong>{el.product.Product_Name}</strong></h5>
                            </div>

                            <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                                <div className="col-3 col-sm-3 col-md-6 text-md-right" >
                                    <h6><strong> Prix unitaire :{el.product.Price}</strong></h6>
                                </div>

                                <div className="col-4 col-sm-4 col-md-4">
                                    <div className="quantity quantityArtc">
                                        <h6><strong> quantité : {el.quantity} </strong></h6>
                                    </div>
                                </div>

                                <div className="col-2 col-sm-2 col-md-2 text-right">
                                    <button type="button" class="btn btn-outline-danger btn-xs" onClick={() => this.deleteOrder(el._id)}>
                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>



                    </div>




                    )}
                    <div className="card-footer panierFt">

                        <div className="totalP" >
                            {console.log(this.state.order.filter(el => (el.SubTotal)))}
                            Prix Total: <b> {this.state.tt} </b>
                        </div>
                        <span onClick={this.toggle} className="btn btn-success pull-right">Passer la commande</span>
                    </div>
                </div>
            </div>
            <Modal isOpen={this.state.modal} toggle={this.toggle}
                fade={this.state.fade}
                className={this.props.className}>
                <ModalBody className="productForm">
                    <span>Veuillez entrer votre numéro de téléphone</span>
                    <input placeholder="numéro de téléphone" value={this.state.Phone_Number} onChange={this.setPhone_Number}></input>
                    <span>SVeuillez entrer votre adresse</span>
                    <input placeholder="adresse" value={this.state.Adress} onChange={this.setAdress}></input>
                </ModalBody>
                <ModalFooter className="productFormBtns">
                    <Button color="primary" onClick={this.sendOrder} onClick={this.toggle}>Envoyer</Button>

                </ModalFooter>
            </Modal>
        </div >);

    }
}

export default OderPage;

