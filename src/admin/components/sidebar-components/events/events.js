import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Events extends Component {
    constructor(state) {
        super(state);
        this.state = {
            events: [],
            modal: state.initialModalState,
            fade: true,
            Event_Name: '',
            Event_Date: '',
            Event_Hour: "",
            Event_Place: "",
            Event_Description: '',
            Link_Img: ''

        }

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
            fade: !this.state.fade

        });
    }

    setEventName = e => {
        this.setState({
            Event_Name: e.target.value
        })
    }

    setDate = e => {
        this.setState({
            Event_Date: e.target.value
        })
    }
    setEventHour = e => {

        this.setState({
            Event_Hour: e.target.value
        })
    }

    setEventPlace = e => {
        this.setState({
            Event_Place: e.target.value
        })
    }



    setEventDescription = e => {
        this.setState({
            Event_Description: e.target.value
        })
    }


    setEvtLink_Img = e => {
        this.setState({
            Link_Img: e.target.value
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

    addevent = () => {

        let file = this.state.Link_Img;
        let formdat = new FormData();
        formdat.append('Link_Img', file)
        formdat.append('Event_Name', this.state.Event_Name)
        formdat.append('Event_Date', this.state.Event_Date)
        formdat.append('Event_Hour', this.state.Event_Hour)
        formdat.append('Event_Place', this.state.Event_Place)
        formdat.append('Event_Description', this.state.Event_Description)

        console.log(this.state.Link_Img)
        axios.post("http://localhost:4000/add_event", formdat)
        this.toggle()

        // else { alert('Please fill all required fields!') }
    }

    componentDidMount() {
        console.log("Component did mount")
        axios.get("http://localhost:4000/find_events/").then(res => {
            this.setState({ events: res.data })
            console.log(this.state.events)
        })
    }



    componentDidUpdate(PrevProps, PrevState) {
        if ((PrevState.events.length !== this.state.events.length) || (PrevState.events === this.state.events)) {
            console.log("Component did update")
            axios.get("http://localhost:4000/find_events/").then(res => this.setState({
                events: res.data,

            }));
        }
    }

    delete1 = (id) => {
        axios.delete("http://localhost:4000/delete_event/" + id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    events: this.state.events.filter(el => el._id !== id)
                })
            })

    }


    render() {
        return (<div className="sellingpt-content pc">
            <div>
                <Button className="addProductButton" variant="outline-primary" onClick={this.toggle} >Add Event</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}
                    fade={this.state.fade}
                    className={this.props.className} >
                    <ModalHeader toggle={this.toggle}>Event Form</ModalHeader>
                    <ModalBody className="productForm">

                        <span>Event Name</span>
                        <input placeholder="Add event name" value={this.state.Event_Name} onChange={this.setEventName}></input>
                        <span>Event Date</span>
                        <input placeholder="Add event date" value={this.state.Event_Date} onChange={this.setDate}></input>
                        <span>Event Time</span>
                        <input placeholder="Add event time" value={this.state.Event_Hour} onChange={this.setEventHour}></input>
                        <span>Event Place</span>
                        <input placeholder="Add event place" value={this.state.Event_Place} onChange={this.setEventPlace}></input>
                        <span>Image Link</span>
                        <div className="fileupload-new thumbnail" >
                            {/* <img id='image_upload' alt="" style={{ width: "200px", height: " 150px" }} /> */}
                        </div>
                        <div class="form-group">

                            <span className="btn btn-theme02 btn-file">
                                <input type="file" id="file" name="img" accept="image/*" onChange={(e) => this.setState({ Link_Img: e.target.files[0] })} />
                            </span>

                        </div>
                        <span>Event description</span>
                        <input placeholder="Add event description" value={this.state.Event_Description} onChange={this.setEventDescription}></input>


                    </ModalBody>
                    <ModalFooter className="productFormBtns">
                        <Button color="primary" onClick={this.addevent}>Add</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>

            <div className="container-fluid" style={{ marginTop: "5%" }}>
                <table class="table table-striped  ">
                    <thead>
                        <tr>

                            <th>Event Name</th>
                            <th >Event Date</th>
                            <th>Event Time</th>
                            <th >Event Place</th>
                            <th>Event Description</th>
                            <th>Event Image</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.events.map(el => <tr>

                        <td>{el.Event_Name}</td>
                        <td >{el.Event_Date}</td>
                        <td>{el.Event_Hour}</td>
                        <td >{el.Event_Place}</td>
                        <td>{el.Event_Description}</td>
                        <td>< img alt="evénnement" style={{ width: "50px", height: "50px" }} src={process.env.PUBLIC_URL + `/upload/${el.Link_Img}`} /></td>


                        <td ><button class="btn btn-primary btn-xs" style={{ marginRight: "2px" }} onClick={() => { if (window.confirm('Are you sure you wish to delete this event?')) { this.delete1(el._id) } }}><i class="fa fa-trash-o "></i></button> </td>
                        <td > <Link to={`/a/Updateevent/${el._id}`}><button class="btn btn-primary btn-xs"><i class="fa fa-pencil"></i></button></Link></td>

                    </tr>
                        // Link : front
                    )
                    }</tbody>

                </table>

            </div>
        </div>);
    }
}

export default Events;