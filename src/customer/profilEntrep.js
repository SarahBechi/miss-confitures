import React, { Component } from 'react';
import axios from 'axios'
class EntrepProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entrepreneur: []
        }
    }





    componentDidMount() {
        axios.get(`http://localhost:4000/find_entrepreneur/${this.props.match.params.id}`).then(res => {
            this.setState({ entrepreneur: [res.data] })

        })
    }

    render() {
        return (<div className="profileEntrep">

            {this.state.entrepreneur.map(el => <div key={el._id}>
                <img src={process.env.PUBLIC_URL + `/upload/${el.Link_Img}`} className="profPic" />
                <h1>{el.Entrepreneur_Name}</h1>
                <p>{el.Entrepreneur_Description}</p>

            </div>)}


        </div>);
    }
}

export default EntrepProfile;