import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import Newsletter from './newsletterC'
import EventsPage from './EvtPage';
import healthyJam from './images/healthyJam.png'
import axios from 'axios';
class LaMarque extends Component {
    constructor(state) {
        super(state);
        this.state = {
            modal: state.initialModalState,
            fade: true,
            entrepreneurs: []
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
            fade: !this.state.fade

        });
    }


    componentDidMount() {
        console.log("Component did mount")
        axios.get("http://localhost:4000/find_entrepreneurs").then(res => {
            this.setState({ entrepreneurs: res.data })
            console.log(this.state.entrepreneurs)
        })
    }




    render() {
        return (<div>

            <Newsletter />
            <div className="descpCont">
                <div className="DescTxt">
                    <h3>Notre Histoire</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliqui
                    p ex ea commodo consequat. Duis aute irure dolor in reprehenderit in volu
                          ptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
                <img src="https://assets.bonappetit.com/photos/57d31d9bc204478524d87203/16:9/w_2560%2Cc_limit/homemade-jam-main.jpg" alt="contentImg" className="cntImg"></img>
            </div>

            <div className="descpCont">

                <img src={healthyJam} alt="contentImg" className="cntImg"></img>

                <div className="DescTxt">
                    <h3>Nos Valeurs</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliqui
                    p ex ea commodo consequat. Duis aute irure dolor in reprehenderit in volu
                          ptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

                </div>
            </div>

            <div className="descpCont">
                <div className="DescTxt">
                    <h3>Troc et Echange</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliqui
                    p ex ea commodo consequat. Duis aute irure dolor in reprehenderit in volu
                          ptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    <Link to={"/c/nousContacter/"}><Button variant="dark" className="trocBtn">Nous Contacter</Button></Link>
                </div>
                <img src="https://i.pinimg.com/736x/fe/85/ca/fe85caeac3ebb10b0c3809952a714c6a.jpg" alt="contentImg" className="cntImg"></img>

            </div>

            <div className="descpCont">

                <img src="https://image.freepik.com/vector-gratis/girl-power-vector-fondo-floral_53876-80849.jpg" alt="contentImg" className="cntImg"></img>

                <div className="DescTxt">
                    <h3>Soutien aux entrepreuneuses</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliqui
                    p ex ea commodo consequat. Duis aute irure dolor in reprehenderit in volu
          ptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
            </div>

            <div className="entpdreSct">
                <h3>Entreprende au féminin</h3>
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
                    }}

                >

                    {this.state.entrepreneurs.map(el => <div className="container" key={el._id}>
                        <img src={process.env.PUBLIC_URL + `/upload/${el.Link_Img}`} style={{ width: "250px", height: "300px" }} />
                        <h3>{el.Entrepreneur_Name}</h3>
                        <div className="middle enSavplsBtn"  >
                            <Link to={`/c/entrepreneurprofile/${el._id}`}><span className="text"  >En savoir plus</span></Link></div>
                    </div>

                    )}

                </Carousel>

            </div>


            <div className="googlCalendar responsive-iframe-container big-container">
                <iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Africa%2FTunis&amp;src=YmVjaGlzYXJhaEBnbWFpbC5jb20&amp;src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;src=ZW4udG4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&amp;src=ZnIudG4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&amp;color=%23039BE5&amp;color=%2333B679&amp;color=%230B8043&amp;color=%230B8043" style={{ "border": "solid 1px #777", "width": "2000", "height": "400" }} frameborder="0" scrolling="no"></iframe>
            </div>

            <EventsPage />



        </div>);
    }
}

export default LaMarque;