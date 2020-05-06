import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
class AjoutModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: state.initialModalState,
            fade: true,
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
            fade: !this.state.fade

        });
    }
    render() {
        return (<div className="pdtMod">
            <Button className="constPdt" variant="outline-primary" onClick={this.toggle} >Acheter</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}
                fade={this.state.fade}
                className={this.props.className}>
                <ModalHeader toggle={this.toggle}></ModalHeader>
                <ModalBody className="articleForm">
                    <h3>Article ajouté au panier !</h3>
                </ModalBody>
                <ModalFooter className="ArtcFormBtns">
                    <Button className="pdtFBtn1" onClick={this.toggle} >Poursuivre vos achats</Button>
                    <Link to={'/c/products/order'}> <Button className="pdtFBtn2" >Finaliser la commande</Button></Link>
                </ModalFooter>
            </Modal>
        </div>);
    }
}

export default AjoutModal;