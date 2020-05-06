import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class SellingPt extends Component {
    constructor(state) {
        super(state);
        this.state = {
            sellingPts: [],
            modal: state.initialModalState,
            fade: true,
            SellingPt_Name: '',
            SellingPt_Adresse: '',

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

    setSellingPtName = e => {
        this.setState({
            SellingPt_Name: e.target.value
        })
    }

    setSellingPtAdresse = e => {
        this.setState({
            SellingPt_Adresse: e.target.value
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

    addSellingPt = () => {

        let file = this.state.Link_Img;
        let formdat = new FormData();

        formdat.append('Link_Img', file)

        formdat.append('SellingPt_Name', this.state.SellingPt_Name)
        formdat.append('SellingPt_Adresse', this.state.SellingPt_Adresse)

        axios.post("http://localhost:4000/add_sellingpt", formdat)
        this.toggle()


    }

    componentDidMount() {
        console.log("Component did mount")
        axios.get("http://localhost:4000/find_sellingpts").then(res => {
            this.setState({ sellingPts: res.data })
            console.log(this.state.sellingPts)
        })
    }



    componentDidUpdate(PrevProps, PrevState) {
        if ((PrevState.sellingPts.length !== this.state.sellingPts.length) || (PrevState.sellingPts === this.state.sellingPts)) {
            console.log("Component did update")
            axios.get("http://localhost:4000/find_sellingpts/").then(res => this.setState({
                sellingPts: res.data,

            }));
        }
    }

    delete1 = (id) => {
        axios.delete("http://localhost:4000/delete_sellingpt/" + id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    sellingPts: this.state.sellingPts.filter(el => el._id !== id)
                })
            })

    }


    render() {
        return (<div className="sellingpt-content pc">
            <div>
                <Button className="addProductButton" variant="outline-primary" onClick={this.toggle} >Add Selling Point</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}
                    fade={this.state.fade}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Selling Point Form</ModalHeader>
                    <ModalBody className="productForm">

                        <span>Selling Point Name</span>
                        <input placeholder="Add Selling Point Name" value={this.state.SellingPt_Name} onChange={this.setSellingPtName}></input>
                        <span>Selling Point Adresse</span>
                        <input placeholder="Add adresse" value={this.state.SellingPt_Adresse} onChange={this.setSellingPtAdresse}></input>

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
                        <Button color="primary" onClick={this.addSellingPt}>Add</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>

            <div className="container-fluid" style={{ marginTop: "5%" }}>
                <table class="table table-striped  ">
                    <thead>
                        <tr>

                            <th>Selling Point Name</th>
                            <th >Selling Point Adresse</th>

                            <th> Image</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.sellingPts.map(el => <tr>

                        <td>{el.SellingPt_Name}</td>
                        <td >{el.SellingPt_Adresse}</td>

                        <td><img style={{ width: "50px", height: "50px" }} src={process.env.PUBLIC_URL + `/upload/${el.Link_Img}`} alt="point de vente" /></td>


                        <td ><button class="btn btn-primary btn-xs" style={{ marginRight: "2px" }} onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) { this.delete1(el._id) } }}><i class="fa fa-trash-o "></i></button> </td>
                        <td > <Link to={`/a/UpdateSellingpt/${el._id}`}><button class="btn btn-primary btn-xs"><i class="fa fa-pencil"></i></button></Link></td>

                    </tr>
                        // Link : front
                    )
                    }</tbody>

                </table>

            </div>
        </div>);
    }
}
export default SellingPt;


