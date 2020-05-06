import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import email from './images/email.png';
import store from './images/store.png';
import phone from './images/phone.png';
import ContactForm from './contactForm';
import axios from 'axios';
class NousContacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sellingPts: [],
        }
    }

    componentDidMount() {
        console.log("Component did mount")
        axios.get("http://localhost:4000/find_sellingpts/").then(res => {
            this.setState({ sellingPts: res.data })
            console.log(this.state.sellingPts)
        })
    }




    render() {
        return (<div className="contactConter">
            <div className="contEntse">{this.state.sellingPts.map(el => <div className="entreseCart" key={el._id}>
                <img src={process.env.PUBLIC_URL + `/upload/${el.Link_Img}`} style={{ width: "250px", height: "200px" }} />
                <h3>{el.SellingPt_Name}</h3>
                <h5>{el.SellingPt_Adresse} </h5>
            </div>

            )}

            </div>


            <div className="ContactMssConf">

                <h3>Nos coordonnées</h3>

                <div className="CordtMssConf" >

                    <div className="mailSct">
                        <img src={email} alt='icon' style={{ "width": "30px", "height": "30px" }}></img>
                        <p>miss.confitures@gmail.com</p>
                    </div>
                    <div className="phoneSct">
                        <img src={phone} alt='icon' style={{ "width": "30px", "height": "30px" }}></img>
                        <p>22 271 616</p>
                        <p>55 271 616</p>
                    </div>
                    <div className="storeSct">
                        <img src={store} alt='icon' style={{ "width": "30px", "height": "30px" }}></img><br />
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3277.8248856509354!2d10.681495514576794!3d34.76000378754873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1301d51e2e47a837%3A0x43e0961a1d1b55b1!2sl&#39;atelier%20Miss%20Confiture!5e0!3m2!1sfr!2stn!4v1587206982242!5m2!1sfr!2stn" className="storeLocation" style={{ "width": "250px" }} title="adresse Miss Confitures"></iframe>
                    </div>
                </div>
            </div>

            <ContactForm />

            <div className="faqSct">
                <h3>FAQ</h3>

                <div className="faqQst"> <Collapsible trigger="Le troc ça se passe comment ??" className="faqQuestion">
                    <p>Prendre & donner .. un peu comme la vie quoi (:</p>
                </Collapsible></div>
                <div className="faqQst"><Collapsible trigger="En combien de temps je reçois ma commande  ??" className="faqQuestion">
                    <p>Pas trop longtemps :p </p>
                </Collapsible></div>
                <div className="faqQst"> <Collapsible trigger="Je peux retourner un article ??" className="faqQuestion">
                    <p>Tu ne le feras pas !</p>
                </Collapsible></div>
                <div className="faqQst"><Collapsible trigger="Quels sont les horaires d'ouverture ??" className="faqQuestion">
                    <p>Pas trop tôt, pas trop tard..</p>
                </Collapsible></div>
                <div className="faqQst">  <Collapsible trigger="Vous mettez quoi dans les produits 'sans' sucre??" className="faqQuestion">
                    <p>Autre que du sucre :p</p>
                </Collapsible></div>

            </div>
        </div >);
    }
}

export default NousContacter;