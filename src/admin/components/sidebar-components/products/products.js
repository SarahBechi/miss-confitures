import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class Products extends Component {
    constructor(state) {
        super(state);
        this.state = {
            products: [],
            modal: state.initialModalState,
            fade: true,
            Product_Name: '',
            Product_Category: '',
            Price: "",
            Jar_Size: "",
            Description: '',
            Link_Img: ''

        }


    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            fade: !this.state.fade

        });
    }

    setName = e => {
        this.setState({
            Product_Name: e.target.value
        })
    }

    setCategory = e => {
        this.setState({
            Product_Category: e.target.value
        })
    }
    setPrice = e => {

        this.setState({
            Price: e.target.value
        })
    }

    setJar_Size = e => {
        this.setState({
            Jar_Size: e.target.value
        })
    }

    setJar_Size = e => {
        this.setState({
            Jar_Size: e.target.value
        })
    }

    setDescription = e => {
        this.setState({
            Description: e.target.value
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

    addproduct = () => {

        let file = this.state.Link_Img;
        let formdat = new FormData();
        formdat.append('Link_Img', file)
        formdat.append('Product_Name', this.state.Product_Name)
        formdat.append('Product_Category', this.state.Product_Category)
        formdat.append('Price', this.state.Price)
        formdat.append('Jar_Size', this.state.Jar_Size)
        formdat.append('Description', this.state.Description)

        console.log(this.state.Link_Img)
        axios.post("http://localhost:4000/add_product", formdat)
        this.toggle()

        // else { alert('Please fill all required fields!') }
    }

    componentDidMount() {
        console.log("Component did mount")
        axios.get("http://localhost:4000/find_products").then(res => {
            this.setState({ products: res.data })
            console.log(this.state.products)
        })
    }



    componentDidUpdate(PrevProps, PrevState) {
        if ((PrevState.products.length !== this.state.products.length) || (PrevState.products === this.state.products)) {
            console.log("Component did update")
            axios.get("http://localhost:4000/find_products/").then(res => this.setState({
                products: res.data,

            }));
        }
    }

    delete1 = (id) => {
        axios.delete("http://localhost:4000/delete_product/" + id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    products: this.state.products.filter(el => el._id !== id)
                })
            })

    }


    render() {
        return (<div className="sellingpt-content pc">
            <div>
                <Button className="addProductButton" variant="outline-primary" onClick={this.toggle} >Add product</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}
                    fade={this.state.fade}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Product Form</ModalHeader>
                    <ModalBody className="productForm">

                        <span>Product Name</span>
                        <input placeholder="Add product name" value={this.state.Product_Name} onChange={this.setName}></input>
                        {console.log(this.Product_Name)}
                        <span>Category</span>
                        <input placeholder="Add category" value={this.state.Product_Category} onChange={this.setCategory}></input>
                        <span>Product Price</span>
                        <input placeholder="Add price" value={this.state.Price} onChange={this.setPrice}></input>
                        <span>Jar Size</span>
                        <input placeholder="Add jar size" value={this.state.Jar_Size} onChange={this.setJar_Size}></input>
                        <span>Image Link</span>
                        <div className="fileupload-new thumbnail" >
                            {/* <img id='image_upload' alt="" style={{ width: "200px", height: " 150px" }} /> */}
                        </div>
                        <div class="form-group">

                            <span className="btn btn-theme02 btn-file">
                                <input type="file" id="file" name="img" accept="image/*" onChange={(e) => this.setState({ Link_Img: e.target.files[0] })} />
                            </span>

                        </div>
                        <span>Product description</span>
                        <input placeholder="Add product description" value={this.state.Description} onChange={this.setDescription}></input>


                    </ModalBody>
                    <ModalFooter className="productFormBtns">
                        <Button color="primary" onClick={this.addproduct}>Add</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>

            <div className="container-fluid" style={{ marginTop: "5%" }}>
                <table class="table table-striped  ">
                    <thead>
                        <tr>

                            <th>Product Name</th>
                            <th >Product Category</th>
                            <th>Price</th>
                            <th >Jar Size</th>
                            <th>Product Description</th>
                            <th>Product Image</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.products.map(el => <tr>

                        <td>{el.Product_Name}</td>
                        <td >{el.Product_Category}</td>
                        <td>{el.Price}</td>
                        <td >{el.Jar_Size}</td>
                        <td>{el.Description}</td>
                        <td><img alt="produit" style={{ width: "50px", height: "50px" }} src={process.env.PUBLIC_URL + `/upload/${el.Link_Img}`} /></td>


                        <td ><button class="btn btn-primary btn-xs" style={{ marginRight: "2px" }} onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) { this.delete1(el._id) } }}><i class="fa fa-trash-o "></i></button> </td>
                        <td > <Link to={`/a/Updateproduct/${el._id}`}><button class="btn btn-primary btn-xs"><i class="fa fa-pencil"></i></button></Link></td>

                    </tr>
                        // Link : front
                    )
                    }</tbody>

                </table>

            </div>
        </div>);
    }
}
export default Products;





