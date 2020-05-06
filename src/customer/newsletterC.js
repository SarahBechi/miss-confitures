import React, { Component } from 'react';
import axios from 'axios';
import cover_half_res from './images/cover_half_res.webp'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupText, Input, InputGroupAddon } from 'reactstrap';


class Newsletter extends Component {
    constructor(state) {
        super(state);
        this.state = {

            modalState: false
        }
    }




    componentDidMount() {
        this.setState({
            modalState: true
        })
    }




    render() {
        return (
            <div >{this.state.modalState ? <Modal>
                <ModalHeader> Newsletter</ModalHeader>

                <ModalBody >
                    <div className="NsContent">
                        <div>
                            <h3>Rejoignez la communauté  </h3>
                            <p>Soyez le premier au courant de nos prochains évennements.Recevez toutes nos idées recettes, nos astuces diététique et plein d'autres !
                    </p>
                        </div>
                        <img src={cover_half_res} alt="newsletter icon" className="newsletterIcon"></img>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <InputGroup className="emailInputNs">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="mon email ici .." />
                    </InputGroup>
                    <Button color="primary">Je m'abonne ! </Button>

                </ModalFooter>
            </Modal> : null}


            </div>


        );
    }
}



export default Newsletter;


/**<Button onClick={toggle}>{buttonLabel}</Button>
        <div className="newsletter">
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}> Newsletter</ModalHeader>

                <ModalBody >
                    <div className="NsContent">
                        <div>
                            <h3>Rejoignez la communauté  </h3>
                            <p>Soyez le premier au courant de nos prochains évennements.Recevez toutes nos idées recettes, nos astuces diététique et plein d'autres !
                        </p>
                        </div>
                        <img src={cover_half_res} alt="newsletter icon" className="newsletterIcon"></img>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <InputGroup className="emailInputNs">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="mon email ici .." />
                    </InputGroup>
                    <Button color="primary" onClick={toggle}>Je m'abonne ! </Button>

                </ModalFooter>
            </Modal>
        </div>
    </div> */