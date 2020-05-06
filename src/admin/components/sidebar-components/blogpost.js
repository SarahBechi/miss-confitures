import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class BlogPost extends Component {
    constructor(state) {
        super(state);
        this.state = {
            blogposts: [],
            modal: state.initialModalState,
            fade: true,

            Post_Title: '',
            Post_Date: '',
            Post_Body: "",

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

    setBlogPostTitle = e => {
        this.setState({
            Post_Title: e.target.value
        })
    }

    setBlogPostContent = e => {
        this.setState({
            Post_Body: e.target.value
        })
    }

    setBlogPostDate = e => {
        this.setState({
            Post_Date: e.target.value
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

    addblogpost = () => {

        let file = this.state.Link_Img;
        let formdat = new FormData();
        formdat.append('Link_Img', file)
        formdat.append('Post_Title', this.state.Post_Title)
        formdat.append('Post_Date', this.state.Post_Date)
        formdat.append('Post_Body', this.state.Post_Body)

        axios.post("http://localhost:4000/add_blogpost", formdat)
        this.toggle()

    }

    componentDidMount() {

        console.log("Component did mount")
        axios.get("http://localhost:4000/blogposts/").then(res => {
            this.setState({ blogposts: res.data })

        })
    }



    componentDidUpdate(PrevProps, PrevState) {
        if ((PrevState.blogposts.length !== this.state.blogposts.length) || (PrevState.blogposts === this.state.blogposts)) {
            console.log("Component did update")
            axios.get("http://localhost:4000/find_blogposts/").then(res => this.setState({
                blogposts: res.data,

            }));
        }
    }

    delete1 = (id) => {
        axios.delete("http://localhost:4000/delete_blogpost/" + id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    blogposts: this.state.blogposts.filter(el => el._id !== id)
                })
            })

    }


    render() {
        return (<div className="sellingpt-content pc">
            <div>
                <Button className="addProductButton" variant="outline-primary" onClick={this.toggle} >Add Blog Post</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}
                    fade={this.state.fade}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Blog Post Form</ModalHeader>
                    <ModalBody className="productForm">

                        <span>Blog Title</span>
                        <input placeholder="Add blog title" value={this.state.Post_Title} onChange={this.setBlogPostTitle}></input>
                        <span>Post Date</span>
                        <input placeholder="Add post date" value={this.state.Post_Date} onChange={this.setBlogPostDate}></input>
                        <span>Post Content</span>
                        <input placeholder="Add post content" value={this.state.Post_Body} onChange={this.setBlogPostContent}></input>


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
                        <Button color="primary" onClick={this.addblogpost}>Add</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>

            <div className="container-fluid" style={{ marginTop: "5%" }}>
                <table class="table table-striped  ">
                    <thead>
                        <tr>

                            <th>Blog Title</th>
                            <th >Post Date</th>
                            <th>Post Content</th>
                            <th>Post Image</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.blogposts.map(el => <tr>

                        <td>{el.Post_Title}</td>
                        <td >{el.Post_Date}</td>
                        <td>{el.Post_Body}</td>

                        <td><img style={{ width: "50px", height: "50px" }} src={process.env.PUBLIC_URL + `/upload/${el.Link_Img}`} /></td>


                        <td ><button class="btn btn-primary btn-xs" style={{ marginRight: "2px" }} onClick={() => { if (window.confirm('Are you sure you wish to delete this post?')) { this.delete1(el._id) } }}><i class="fa fa-trash-o "></i></button> </td>
                        <td > <Link to={`/a/Updateblogpost/${el._id}`}><button class="btn btn-primary btn-xs"><i class="fa fa-pencil"></i></button></Link></td>

                    </tr>

                    )
                    }</tbody>

                </table>

            </div>
        </div>);
    }
}

export default BlogPost;