import React, { Component } from 'react';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import jar from '../images/jar.png'
import stevia from '../images/stevia.png'
import { Button } from 'react-bootstrap'
import engineer from '../images/engineer.png'
import ecolo from '../images/ecolo.jpg'
import logo from '../images/logo.png'
import { Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert'
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            events: [],
            NSemail: ""
        }
    }



    componentDidMount() {
        console.log("Component did mount")
        axios.get("http://localhost:4000/find_products").then(res => {
            this.setState({ products: res.data })
            console.log(this.state.products)
        })
    }


    setNSemail = (e) => {
        this.setState({
            NSemail: e.target.value
        })
    }

    addnewsltrEmail = () => {

        let formdat = new FormData();
        formdat.append('NSemail', this.state.NSemail)
        axios.post("http://localhost:4000/add_newsletter", formdat)
        swal('Nous vous remercions pour votre abonnement !')
    }





    render() {
        return (<div>

            <div className="presentation">
                <div className="textAreaLP">
                    <h3>Miss Confitures</h3>
                    <p>ipsum dolor sit amet, consectetur adipiscing elit, sed do eiu
                    smod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n
                    ostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
                <img src={logo} alt="landingImg" className="landingImg"></img>
            </div>

            <div className="Nouveautés">
                <h3 className="NvTitre">Les Nouveautés</h3>


                <Carousel
                    slidesPerPage={4}
                    arrows
                    infinite
                    breakpoints={{
                        640: {
                            slidesPerPage: 1,
                            arrows: false
                        },
                        900: {
                            slidesPerPage: 2,
                            arrows: false
                        }
                    }} >


                    {this.state.products.splice(this.state.products.length - 3, 3).map(el => <div className="container" > <div key={el._id}>
                        <img src={process.env.PUBLIC_URL + `/upload/${el.Link_Img}`} className="image" />
                        <h3>{el.Product_Name}</h3>

                        <div className="middle"><Link to={`/c/products/product${el._id}`}><span className="text">Consulter</span></Link></div> </div>
                    </div>)}


                </Carousel>
                <Link to="/c/products/"> <Button className="PdtBtn">Voir la liste des produits</Button></Link>
            </div>

            <div className="SPLink">
                <i class="fas fa-map-marker-alt"></i>
                <Link to="/c/nousContacter/" className="lienPtVente"> <p>Trouver un point de vente</p></Link>
            </div>

            <div className="BrandAdvg">
                <div className="AdvContainer"><img src={jar} className="BrandAdvLogo" alt="img"></img><div className="ContOverlay"> <span className="AdvOverlay">Une Large sélection</span></div></div>
                <div className="AdvContainer"><img src={stevia} className="BrandAdvLogo" alt="img"></img><div className="ContOverlay"> <span className="AdvOverlay">Des produits à base de stévia</span></div></div>
                <div className="AdvContainer"><img src={engineer} className="BrandAdvLogo" alt="img"></img><div className="ContOverlay"> <span className="AdvOverlay">Un savoir faire scientifique </span></div></div>
                <div className="AdvContainer"><img src={ecolo} className="BrandAdvLogo" alt="img"></img><div className="ContOverlay"> <span className="AdvOverlay">Une marque engagée</span></div></div>
            </div>

            <div className="NewsEvt">
                <h3 className="evtSctTitle">Les Evénnement</h3>

                <Carousel
                    slidesPerPage={3}
                    arrows
                    infinite
                    breakpoints={{
                        640: {
                            slidesPerPage: 1,
                            arrows: false
                        },
                        900: {
                            slidesPerPage: 2,
                            arrows: false
                        }
                    }}

                >
                    {this.state.events.map(el => <div className="evtCont" key={el._id}>
                        <h3>{el.Event_Name}</h3>
                        <p>{el.Event_Date}</p>
                    </div>

                    )}


                </Carousel>
                <Link to="/c/laMarque/"><Button className="EvtBtn">Voir les évennements</Button></Link>
            </div>

            <div className="InstaFeed">
                <h3>Instagram Feed</h3>
                <iframe
                    src="//lightwidget.com/widgets/12ecd855ae755182992f94b0494d31ea.html" scrolling="no" allowtransparency="true"
                    class="lightwidget-widget" title="InstaFrame" ></iframe>
            </div>

            <div className="Sucscription">

                <h3>Abonnez-vous à notre Neswletter !</h3>
                <div className="mailSubsc"><i class="fas fa-envelope"></i>
                    <Input type="email" name="email" id="exampleEmail" placeholder="Entrer votre email" className="mailInput" value={this.state.NSemail} onChange={this.setNSemail} />
                    {console.log(this.NSemail)}
                    <Button className="mailBtn" onClick={this.addnewsltrEmail} type="submit">Je m'abonne</Button>
                    {console.log(this.addnewsltrEmail)}

                </div>

            </div>

        </div>);
    }
}

export default HomePage;