import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap';
class Updateproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {

            Product_Name: '',
            Product_Category: '',
            Price: 0,
            Jar_Size: 0,
            Description: '',
            Link_Img: ''
        }
    }

    componentDidMount() {

        axios.get(`http://localhost:4000/find_product/${this.props.match.params.id}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    Product_Name: res.data.Product_Name,
                    Product_Category: res.data.Product_Category,
                    Price: res.data.Price, Jar_Size: res.data.Jar_Size,
                    Description: res.data.Description
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

    UpdateProd = () => {
        console.log(this.state.Link_Img)
        let file = this.state.Link_Img;
        let formdat = new FormData();
        formdat.append('Link_Img', file)
        formdat.append('Product_Name', this.state.Product_Name)
        formdat.append('Product_Category', this.state.Product_Category)
        formdat.append('Price', this.state.Price)
        formdat.append('Jar_Size', this.state.Jar_Size)
        formdat.append('Description', this.state.Description)
        // console.log(formdat)

        axios.put('http://localhost:4000/update_product/' + this.props.match.params.id, formdat)
    }
    render() {
        return (<div className=' products-content pc '>
            <div className="updatedProduct">
                <input name="Name" placeholder="Name" type="text" value={this.state.Product_Name} onChange={(e) => this.setState({ Product_Name: e.target.value })} />
                <input name="Category" placeholder="Category" type="text" value={this.state.Product_Category} onChange={(e) => this.setState({ Product_Category: e.target.value })} />
                <input name="Price" placeholder="Price" type="text" value={this.state.Price} onChange={(e) => this.setState({ Price: e.target.value })} />
                <input name="Jar_Size" placeholder="Jar_Size" type="text" value={this.state.Jar_Size} onChange={(e) => this.setState({ Jar_Size: e.target.value })} />
                <input name="Description" placeholder="Description" type="text" value={this.state.Description} onChange={(e) => this.setState({ Description: e.target.value })} />
                <span>Image Link</span>
                {/* <div className="fileupload-new thumbnail" > {/* <img id='image_upload' alt="" style={{ width: "200px", height: " 150px" }} /> */}
                <div class="form-group">
                    <span className="btn btn-theme02 btn-file">
                        <input type="file" id="file" name="img" accept="image/*" onChange={(e) => this.setState({ Link_Img: e.target.files[0] })} />
                    </span>

                </div>
                <Link to="/a/products"><Button variant="outline-primary" className="editButton" onClick={this.UpdateProd}>Edit Product</Button></Link>
            </div>
        </div >
        )
    }
}

export default Updateproduct;