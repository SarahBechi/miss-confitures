import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import swal from 'sweetalert'
import ingredient from './images/ingredient.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogposts: [],
            search: "",
            NSemail: ""
        }
    }




    componentDidMount() {
        console.log("Component did mount")
        axios.get("http://localhost:4000/find_blogposts/").then(res => {
            this.setState({ blogposts: res.data })
            console.log(this.state.blogposts)
        })
    }

    changeInput = (e) => {
        this.setState({ search: e.target.value })


    }

    setNSemail = (e) => {
        this.setState({
            NSemail: e.target.value
        })
    }

    addnewsltrEmail = () => {

        let formdat = new FormData();
        formdat.append('NSemail', this.state.NSemail)
        axios.post("http://localhost:4000/add_newsletter", formdat)
        swal('Nous vous remercions pour votre abonnement !')
    }




    render() {
        return (<div className="blogSct">
            <div className="blogTitle">
                <h1>Bienvenue sur le blog de Miss Confitures !</h1>
            </div>

            <div className="blogCarousel">

                <img src={ingredient}
                    className="blogImg" ></img>


            </div>




            <div className="blogBody">

                <div className="blogCnt">
                    <div className="blogPosts">

                        {this.state.blogposts.filter(el => (el.Post_Title.toUpperCase().includes(this.state.search.toUpperCase()))).map(el => <div className="blogPost" key={el._id}>
                            <Link to={`/c/blog/post${el._id}`}> <img src={process.env.PUBLIC_URL + `/upload/${el.Link_Img}`} style={{ width: "300px", height: "230px", 'margin-bottom': '17px' }} className="bgImg" alt="blogPost"></img></Link>
                            <div className="blogPostInf" >
                                <div>
                                    <h3>{el.Post_Title}</h3>
                                    <h6>{el.Post_Date}</h6>
                                </div>
                                <Link to={`/c/blog/post${el._id}`}><span className="plusBtn"><i class="fas fa-angle-right"></i></span></Link>
                            </div>
                        </div>)}



                    </div>
                </div>

                <div className="blogSB">

                    <div className="FbInsta">
                        <h3>Suivez-Nous !</h3>
                        <a href="https://www.instagram.com/miss_confitures/?hl=fr"><i class="fab fa-instagram iconScl" style={{ padding: "10px" }}></i></a>
                        <a href="https://www.facebook.com/MissConfitures"><i class="fab fa-facebook iconScl" style={{ padding: "10px" }} ></i></a>
                    </div>
                    <hr></hr>
                    <div>
                        <FormControl
                            placeholder="Recherche .."
                            aria-describedby="basic-addon2" onChange={(e) => this.changeInput(e)}
                            style={{ margin: "10px", width: "380px" }} />
                    </div>

                    <hr></hr>
                    <h3 style={{ 'margin-bottom': '20px', color: 'gray' }}>Newsletter</h3>
                    <div className="newsltdiv">

                        <FormControl
                            placeholder="@-email"
                            aria-describedby="basic-addon2" className="abnInput" value={this.state.NSemail} onChange={this.setNSemail} /><span className="abnBtn" onClick={this.addnewsltrEmail} >Je m'abonne</span>
                    </div>

                    <hr></hr>
                    <div className="apropdiv">
                        <h3 style={{ 'margin-bottom': '30px' }}>A propos</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                        do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad m
                        inim veniam, quis nostrud exercitation ullamco laboris nisi
                        ut aliquip ex ea commodo conseq
                        orem t amet, consectetur adipiscing elit, sed
                        do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad m
                        inim veniam, quis nostrud exeruat. </p>
                    </div>
                </div>


            </div>

        </div >);
    }
}

export default Blog;

/**  <div className="blogCarousel">


                    </div> */