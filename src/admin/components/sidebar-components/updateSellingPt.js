import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap';
class UpdateSellingPt extends Component {
    constructor(props) {
        super(props);
        this.state = {

            SellingPt_Name: '',
            SellingPt_Adresse: '',

            Link_Img: '',
            sellingPts: []
        }
    }

    componentDidMount() {

        axios.get(`http://localhost:4000/find_sellingpts`)
            .then(res => {
                console.log(res.data)

                this.setState({ sellingPts: res.data })
                this.state.sellingPts.map(el => (el._id === this.props.match.params.id) &&
                    this.setState({ SellingPt_Name: el.SellingPt_Name, SellingPt_Adresse: el.SellingPt_Adresse }

                    ))
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

    UpdateSellPt = () => {
        let file = this.state.Link_Img;
        let formdat = new FormData();

        formdat.append('Link_Img', file)
        formdat.append('SellingPt_Name', this.state.SellingPt_Name)
        formdat.append('SellingPt_Adresse', this.state.SellingPt_Adresse)


        axios.put('http://localhost:4000/update_sellingpt/' + this.props.match.params.id, formdat)
    }
    render() {
        return (<div className=' products-content pc '>
            <div className="updatedProduct">
                <input name="Name" placeholder="Selling Point Name" type="text" value={this.state.SellingPt_Name} onChange={(e) => this.setState({ SellingPt_Name: e.target.value })} />
                <input name="Adresse" placeholder="Selling Point Adresse" type="text" value={this.state.SellingPt_Adresse} onChange={(e) => this.setState({ SellingPt_Adresse: e.target.value })} />


                <span>Image Link</span>
                <div className="fileupload-new thumbnail" > {/* <img id='image_upload' alt="" style={{ width: "200px", height: " 150px" }} /> */} </div>
                <div class="form-group">
                    <span className="btn btn-theme02 btn-file">
                        <input type="file" id="file" name="img" accept="image/*" onChange={(e) => this.setState({ Link_Img: e.target.files[0] })} />
                    </span>

                </div>
                <Link to="/a/sellingPts"><Button variant="outline-primary" className="editButton" onClick={this.UpdateSellPt}>Edit Selling Point</Button></Link>
            </div>
        </div>
        )
    }
}

export default UpdateSellingPt;