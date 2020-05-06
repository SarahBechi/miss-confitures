import React, { Component } from 'react';
import Carousel from '@brainhubeu/react-carousel';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class EventsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
        this.handleChange = this.handleChange.bind(this);
    }


    componentDidMount() {
        console.log("Component did mount")
        axios.get("http://localhost:4000/find_events").then(res => {
            this.setState({ events: res.data })
            console.log(this.state.events)
        })
    }


    handleChange(date) {
        console.log(date);
    }


    render() {
        return (<div className="evntSct">


            <h3>Évennements</h3>
            <Carousel
                slidesPerPage={1}
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

                {this.state.events.map(el => <div className="evtInfCont" key={el._id}>
                    <div>
                        <h2>{el.Event_Name}</h2>
                        <h5>{el.Event_Date}</h5>
                        <p>{el.Event_Description}</p>
                    </div>
                    <img src={process.env.PUBLIC_URL + `/upload/${el.Link_Img}`} className="image" alt="event" style={{ height: "300px", width: "500px" }} />
                </div>

                )}

            </Carousel>




            <Link to="/c/archives/"> <Button>Archives</Button></Link>




        </div>);
    }
}

export default EventsPage;



