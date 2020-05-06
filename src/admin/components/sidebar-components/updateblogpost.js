import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap';
class updateBlogPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Post_Title: '',
            Post_Date: '',
            Post_Body: "",

            Link_Img: ''
        }
    }



    componentDidMount() {

        axios.get(`http://localhost:4000/find_blogpost/${this.props.match.params.id}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    Post_Title: res.data.Post_Title,
                    Post_Date: res.data.Post_Date,
                    Post_Body: res.data.Post_Body,

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

    UpdateBgPost = () => {
        let file = this.state.Link_Img;
        let formdat = new FormData();
        formdat.append('Link_Img', file)
        formdat.append('Post_Title', this.state.Post_Title)
        formdat.append('Post_Date', this.state.Post_Date)
        formdat.append('Post_Body', this.state.Post_Body)


        axios.put('http://localhost:4000/update_blogpost/' + this.props.match.params.id, formdat)
    }
    render() {
        return (<div className=' products-content pc '>
            <div className="updatedProduct blogpdt">
                <input name="Post_Title" placeholder="Post Title" type="text" value={this.state.Post_Title} onChange={(e) => this.setState({ Post_Title: e.target.value })} />
                <input name="Post_Date" placeholder="Post Date" type="text" value={this.state.Post_Date} onChange={(e) => this.setState({ Post_Date: e.target.value })} />
                <textarea name="Post_Body" placeholder="Post Body" type="text" rows={10} cols={30} value={this.state.Post_Body} onChange={(e) => this.setState({ Post_Body: e.target.value })} className="artcbodyinput" />


                <span>Image Link</span>
                <div className="fileupload-new thumbnail" > {/* <img id='image_upload' alt="" style={{ width: "200px", height: " 150px" }} /> */} </div>
                <div class="form-group">
                    <span className="btn btn-theme02 btn-file">
                        <input type="file" id="file" name="img" accept="image/*" onChange={(e) => this.setState({ Link_Img: e.target.files[0] })} />
                    </span>

                </div>
                <Link to="/a/blogposts"><Button variant="outline-primary" className="editButton" onClick={this.UpdateBgPost}>Edit Blog Post</Button></Link>
            </div>
        </div>
        )
    }
}


export default updateBlogPost;