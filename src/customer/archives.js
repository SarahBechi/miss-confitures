import React, { Component } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import axios from 'axios';
class Archives extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    componentDidMount() {
        console.log("Component did mount")
        axios.get("http://localhost:4000/find_events").then(res => {
            this.setState({ events: res.data })
            console.log(this.state.events)
        })
    }



    render() {
        return (<div className="archivesTimeline">

            <VerticalTimeline>{this.state.events.map(el => < VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: '#2C3A47', color: '#fff', height: "300px", overflow: "hidden" }}
                contentArrowStyle={{ borderRight: '7px solid  #F8F9FA' }}
                key={el._id}>


                <h3 className="vertical-timeline-element-title">{el.Event_Name}</h3><br></br>
                <h6 style={{ opacity: "60%" }}>{el.Event_Date},{el.Event_Place} </h6>
                <p>{el.Event_Description}</p>


            </ VerticalTimelineElement>
            )}
            </VerticalTimeline>



        </div>);
    }
}

export default Archives;