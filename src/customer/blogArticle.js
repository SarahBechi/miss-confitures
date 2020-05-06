import React, { Component } from 'react';
import axios from 'axios';

class BlogPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogpost: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/find_blogpost/${this.props.match.params.id}`).then(res => {
            this.setState({ blogpost: [res.data] })

        })
    }

    render() {
        return (<div className="blogPostpg">{this.state.blogpost.map(el => <div key={el._id}>
            <h1>{el.Post_Title} </h1>
            <p>{el.Post_Body}</p>
        </div>
        )}
        </div>);
    }
}

export default BlogPost;