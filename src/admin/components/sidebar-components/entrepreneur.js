import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class Entrepreneurs extends Component {
    constructor(state) {
        super(state);
        this.state = {
            entrepreneurs: [],
            modal: state.initialModalState,
            fade: true,
            Entrepreneur_Name: '',
            Entrepreneur_Description: '',
            Social_Links: "",
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

    setEntrepName = e => {
        this.setState({
            Entrepreneur_Name: e.target.value
        })
    }

    setEntrepDescription = e => {
        this.setState({
            Entrepreneur_Description: e.target.value
        })
    }
    setSocial_Links = e => {

        this.setState({
            Social_Links: e.target.value
        })
    }

    setLink_Img = e => {
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

    addEntrep = () => {

        let file = this.state.Link_Img;
        let formdat = new FormData();
        formdat.append('Link_Img', file)
        formdat.append('Entrepreneur_Name', this.state.Entrepreneur_Name)
        formdat.append('Entrepreneur_Description', this.state.Entrepreneur_Description)
        formdat.append('Social_Links', this.state.Social_Links)
        console.log(this.state.Link_Img)

        axios.post("http://localhost:4000/add_entrepreneur", formdat)
        this.toggle()

        // else { alert('Please fill all required fields!') }
    }

    componentDidMount() {
        console.log("Component did mount")
        axios.get("http://localhost:4000/find_entrepreneurs").then(res => {
            this.setState({ entrepreneurs: res.data })
            console.log(this.state.entrepreneurs)
        })
    }



    componentDidUpdate(PrevProps, PrevState) {
        if ((PrevState.entrepreneurs.length !== this.state.entrepreneurs.length) || (PrevState.entrepreneurs === this.state.entrepreneurs)) {
            console.log("Component did update")
            axios.get("http://localhost:4000/find_entrepreneurs/").then(res => this.setState({
                entrepreneurs: res.data,

            }));
        }
    }

    delete1 = (id) => {
        axios.delete("http://localhost:4000/delete_entrepreneur/" + id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    entrepreneurs: this.state.entrepreneurs.filter(el => el._id !== id)
                })
            })

    }


    render() {
        return (<div className="sellingpt-content pc">
            <div>
                <Button className="addProductButton" variant="outline-primary" onClick={this.toggle} >Add Entrepreneur</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}
                    fade={this.state.fade}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Entrepreneur Form</ModalHeader>
                    <ModalBody className="productForm">

                        <span>Entrepreneur Name</span>
                        <input placeholder="Add Entrepreneur Name" value={this.state.Entrepreneur_Name} onChange={this.setEntrepName}></input>
                        <span>Description</span>
                        <input placeholder="Add description" value={this.state.Entrepreneur_Description} onChange={this.setEntrepDescription}></input>
                        <span>Social Links</span>
                        <input placeholder="social Links" value={this.state.Social_Links} onChange={this.setSocial_Links}></input>
                        <span>Image Link</span>
                        <div className="fileupload-new thumbnail" >
                            {/* <img id='image_upload' alt="" style={{ width: "200px", height: " 150px" }} /> */}
                        </div>
                        <div class="form-group">
                            <span className="btn btn-theme02 btn-file">
                                <input type="file" id="file" name="img" accept="image/*" onChange={(e) => this.setState({ Link_Img: e.target.files[0] })} />
                            </span>
                        </div>



                    </ModalBody>
                    <ModalFooter className="productFormBtns">
                        <Button color="primary" onClick={this.addEntrep}>Add</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>

            <div className="container-fluid" style={{ marginTop: "5%" }}>
                <table class="table table-striped  ">
                    <thead>
                        <tr>

                            <th>Entrepreneur Name</th>
                            <th >Product Description</th>
                            <th>Social Links</th>
                            <th> Image</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.entrepreneurs.map(el => <tr>

                        <td>{el.Entrepreneur_Name}</td>
                        <td >{el.Entrepreneur_Description}</td>
                        <td>{el.Social_Links}</td>
                        <td><img alt="entrepreneur" style={{ width: "50px", height: "50px" }} src={process.env.PUBLIC_URL + `/upload/${el.Link_Img}`} /></td>


                        <td ><button class="btn btn-primary btn-xs" style={{ marginRight: "2px" }} onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) { this.delete1(el._id) } }}><i class="fa fa-trash-o "></i></button> </td>
                        <td > <Link to={`/a/Updateprofile/${el._id}`}><button class="btn btn-primary btn-xs"><i class="fa fa-pencil"></i></button></Link></td>

                    </tr>
                        // Link : front
                    )
                    }</tbody>

                </table>

            </div>
        </div>);
    }
}
export default Entrepreneurs;





