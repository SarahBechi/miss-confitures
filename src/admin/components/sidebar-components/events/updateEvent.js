import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap';
class updateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Event_Name: '',
            Event_Date: '',
            Event_Hour: "",
            Event_Place: "",
            Event_Description: '',
            Link_Img: ''
        }
    }



    componentDidMount() {

        axios.get(`http://localhost:4000/find_event/${this.props.match.params.id}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    Event_Name: res.data.Event_Name,
                    Event_Date: res.data.Event_Date,
                    Event_Hour: res.data.Event_Hour,
                    Event_Place: res.data.Event_Place,
                    Event_Description: res.data.Event_Description
                })
            })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    preview_image = (event) => {
        {
            var reader = new FileReader();
            reader.onload = function () {
                var output = document.getElementById('image_upload');
                output.src = reader.result;

            }
            reader.readAsDataURL(event.target.files[0]);
            console.log(event.target.files[0].path);


        }
    }

    UpdateEvt = () => {
        let file = this.state.Link_Img;
        let formdat = new FormData();
        formdat.append('Link_Img', file)
        formdat.append('Event_Name', this.state.Event_Name)
        formdat.append('Event_Date', this.state.Event_Date)
        formdat.append('Event_Hour', this.state.Event_Hour)
        formdat.append('Event_Place', this.state.Event_Place)
        formdat.append('Event_Description', this.state.Event_Description)

        axios.put('http://localhost:4000/update_event/' + this.props.match.params.id, formdat)
    }
    render() {
        return (<div className=' products-content pc '>
            <div className="updatedProduct">
                <input name="EventName" placeholder="Event Name" type="text" value={this.state.Event_Name} onChange={(e) => this.setState({ Event_Name: e.target.value })} />
                <input name="EventDate" placeholder="Event Date" type="text" value={this.state.Event_Date} onChange={(e) => this.setState({ Event_Date: e.target.value })} />
                <input name="EventHour" placeholder="Event Hour" type="text" value={this.state.Event_Hour} onChange={(e) => this.setState({ Event_Hour: e.target.value })} />
                <input name="EventPlace" placeholder="Event Place" type="text" value={this.state.Event_Place} onChange={(e) => this.setState({ Event_Place: e.target.value })} />
                <input name="EventDescription" placeholder="Event Description" type="text" value={this.state.Event_Description} onChange={(e) => this.setState({ Event_Description: e.target.value })} />
                <span>Image Link</span>
                <div className="fileupload-new thumbnail" > {/* <img id='image_upload' alt="" style={{ width: "200px", height: " 150px" }} /> */} </div>
                <div class="form-group">
                    <span className="btn btn-theme02 btn-file">
                        <input type="file" id="file" name="img" accept="image/*" onChange={(e) => this.setState({ Link_Img: e.target.files[0] })} />
                    </span>

                </div>
                <Link to="/a/events"><Button variant="outline-primary" className="editButton" onClick={this.UpdateEvt}>Edit Event</Button></Link>
            </div>
        </div>
        )
    }
}


export default updateEvent;