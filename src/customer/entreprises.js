import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
class Entreprises extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<div className="dspCnt">
            <div className="descpCont">
                <div className="DescTxt">
                    <h3>Cadeaux</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliqui
                    p ex ea commodo consequat. Duis aute irure dolor in reprehenderit in volu
                          ptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
                <img src="https://www.greavesjams.com/shop/images/Greaves-embossed-2-4-pack-gift-box-web.jpg" alt="contentImg" className="cntImg"></img>
            </div>

            <div className="descpCont">

                <img src="https://my-test-11.slatic.net/p/7fee54f2637453d1031e3e1fdac0d51f.jpg" alt="contentImg" className="cntImg"></img>

                <div className="DescTxt">
                    <h3>Organisation des petits-déjeuners</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliqui
                    p ex ea commodo consequat. Duis aute irure dolor in reprehenderit in volu
                          ptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

                </div>
            </div>

            <div className="descpCont">
                <div className="DescTxt">
                    <h3>Restaurants, Cafés et Hôtels</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliqui
                    p ex ea commodo consequat. Duis aute irure dolor in reprehenderit in volu
                          ptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

                </div>
                <img src="https://i0.wp.com/uneparisiennenhelvetie.com/wp-content/uploads/2015/11/sans-titre-12.jpg" alt="contentImg" className="cntImg"></img>
            </div>

            <Link to={"/c/nousContacter/"}><Button variant="dark" className="contcBtn">Nous Contacter</Button></Link>
        </div>);
    }
}

export default Entreprises;