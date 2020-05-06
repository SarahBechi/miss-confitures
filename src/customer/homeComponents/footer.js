import React, { Component } from 'react';
import ScrollToTop from 'react-scroll-up';
import toteBag from '../images/toteBag.png';
import { Link } from 'react-router-dom';
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<div>
            <div className="footer">
                <ul className="InfoList APropos">
                    <strong><li>A Propos</li></strong>
                    <Link to="/c/laMarque/"><li>La Marque</li></Link>
                    <Link to="/c/laMarque/"> <li>Notre histoire</li></Link>
                    <Link to="/c/laMarque/"> <li>Nos valeurs</li></Link>
                    <Link to="/c/laMarque/"> <li>Troc et échange</li></Link>
                    <Link to="/c/laMarque/"> <li>Soutien aux entrepreneuses</li></Link>
                </ul>
                <ul className="InfoList InfEse">
                    <strong><li>Entreprises</li></strong>
                    <Link to="/c/nousContacter/"> <li>Nos partenaires</li></Link>
                    <Link to="/c/entreprises/"> <li>Services aux entreprises</li></Link>
                    <Link to="/c/nousContacter/"><li>Nous contacter</li></Link>
                </ul>
                <ul className="InfoList Infcta">
                    <strong><li>Informations de contact</li></strong>
                    <li>miss.confitures@gmail.com</li>
                    <div className="phNumbr"> <li>22 271 616 <br></br>55 271 616</li></div>
                </ul>
            </div>
            <div className="SMediaLinks">
                <a href="https://www.instagram.com/miss_confitures/?hl=fr"><i class="fab fa-instagram"></i></a>
                <a href="https://www.facebook.com/MissConfitures"><i class="fab fa-facebook"></i></a>

            </div>
            <ScrollToTop showUnder={100} className="upBtn">
                <img src={toteBag} alt="tote-bag" className="toteBag" ></img>
            </ScrollToTop>
        </div>);
    }
}

export default Footer;