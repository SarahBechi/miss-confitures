import React, { Component } from 'react';
import axios from 'axios';
class Gallery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Link_Img: '',
			images: []
		};
	}

	addImage = () => {

		let file = this.state.Link_Img;
		let formdat = new FormData();
		formdat.append('Img_Url', file)
		axios.post("http://localhost:4000/add_image", formdat)

	}


	componentDidMount() {
		console.log("Component did mount")
		axios.get("http://localhost:4000/find_images").then(res => {
			this.setState({ images: res.data })
		})
	}

	delete1 = (id) => {
		axios.delete("http://localhost:4000/delete_image/" + id)
			.then(res => {
				console.log(res.data);
				this.setState({
					images: this.state.images.filter(el => el._id !== id)
				})
			})

	}



	render() {
		return (
			<div className="gallery-content">
				<div className=" imgCont">

					<div className="imageSelectBtn">
						<form action="/api/images" method="post" enctype="multipart/form-data">
							<input type="file" name="image" className="inputImg" onChange={(e) => this.setState({ Link_Img: e.target.files[0] })} />
							<button onClick={this.addImage}>Ajouter</button>
						</form>
					</div>
				</div>
				<div className="container-fluid  images-tab">
					<table class="table table-striped  ">
						<thead>
							<tr>
								<th>Image ID</th>
								<th>Image Url</th>
								<th>Image preview</th>
							</tr>
						</thead>

						<tbody>{this.state.images.map((el, i) => <tr>
							<td>{i + 1}</td>
							<td >{el.Img_Url}</td>
							<td><img style={{ width: "50px", height: "50px" }} src={process.env.PUBLIC_URL + `/upload/${el.Img_Url}`} /></td>
							<td ><button class="btn btn-primary btn-xs" style={{ marginRight: "2px" }} onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) { this.delete1(el._id) } }}><i class="fa fa-trash-o "></i></button> </td>
						</tr>
						)
						}</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default Gallery;

/**<img src=imageURL /> */

/**<tbody>
							{this.state.images.map((el) => (
								<tr>
									<td>{el._id}</td>
									<td>{el}</td>
									<td>{el}</td>


									<td>
										<button
											class="btn btn-primary btn-xs"
											style={{ marginRight: '2px' }}
											onClick={() => {
												if (window.confirm('Are you sure you wish to delete this image?')) {
													this.delete1(el._id);
												}
											}}
										>
											<i class="fa fa-trash-o " />
										</button>
									</td>
								</tr>
							))}
						</tbody> */