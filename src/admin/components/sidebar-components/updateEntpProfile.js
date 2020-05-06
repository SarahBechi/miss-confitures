import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap';
class UpdateEntpProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {

            Entrepreneur_Name: '',
            Entrepreneur_Description: '',
            Social_Links: "",
            Link_Img: '',
            Entrepreneurs: []
        }
    }

    componentDidMount() {

        axios.get(`http://localhost:4000/find_entrepreneurs`)
            .then(res => {
                console.log(res.data)

                this.setState({ Entrepreneurs: res.data })
                this.state.Entrepreneurs.map(el => (el._id === this.props.match.params.id) &&
                    this.setState({ Entrepreneur_Name: el.Entrepreneur_Name, Entrepreneur_Description: el.Entrepreneur_Description, Social_Links: el.Social_Links }

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

    UpdateProf = () => {
        let file = this.state.Link_Img;
        let formdat = new FormData();
        formdat.append('Link_Img', file)
        formdat.append('Entrepreneur_Name', this.state.Entrepreneur_Name)
        formdat.append('Entrepreneur_Description', this.state.Entrepreneur_Description)
        formdat.append('Social_Links', this.state.Social_Links)

        axios.put('http://localhost:4000/update_entrepreneur/' + this.props.match.params.id, formdat)
    }
    render() {
        return (<div className=' products-content pc '>
            <div className="updatedProduct">
                <input name="Name" placeholder="Name" type="text" value={this.state.Entrepreneur_Name} onChange={(e) => this.setState({ Entrepreneur_Name: e.target.value })} />
                <input name="Description" placeholder="Description" type="text" value={this.state.Entrepreneur_Description} onChange={(e) => this.setState({ Entrepreneur_Description: e.target.value })} />
                <input name="Social_Links" placeholder="Social_Links" type="text" value={this.state.Social_Links} onChange={(e) => this.setState({ Social_Links: e.target.value })} />

                <span>Image Link</span>
                <div className="fileupload-new thumbnail" > {/* <img id='image_upload' alt="" style={{ width: "200px", height: " 150px" }} /> */} </div>
                <div class="form-group">
                    <span className="btn btn-theme02 btn-file">
                        <input type="file" id="file" name="img" accept="image/*" onChange={(e) => this.setState({ Link_Img: e.target.files[0] })} />
                    </span>

                </div>
                <Link to="/a/entrepreneurs"><Button variant="outline-primary" className="editButton" onClick={this.UpdateProf}>Edit Profile</Button></Link>
            </div>
        </div>
        )
    }
}

export default UpdateEntpProfile;