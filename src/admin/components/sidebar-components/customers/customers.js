import React, { Component } from 'react';
import axios from 'axios';

class Customers extends Component {
	constructor(state) {
		super(state);
		this.state = {
			users: []
		};
	}

	componentDidMount() {
		console.log('Component did mount ');
		axios.get('http://localhost:4000/find_users/').then((res) => {
			this.setState({ users: [...res.data] });
			console.log(this.state.users);
		});
	}

	componentDidUpdate(PrevProps, PrevState) {
		if (PrevState.users.length !== this.state.users.length || PrevState.users === this.state.users) {
			console.log('Component did update');
		}
	}

	delete1 = (id) => {
		axios.delete('http://localhost:4000/delete_user/' + id).then((res) => {
			console.log(res.data);
			this.setState({
				users: this.state.users.filter((el) => el._id !== id)
			});
		});
	};

	render() {
		return (
			<div className="container-fluid  users-tab nsemails">
				<table class="table table-striped  ">
					<thead>
						<tr>
							<th>User ID</th>
							<th>User First Name</th>
							<th>User Last Name</th>
							<th>User Email</th>
							<th>User Phone Number</th>
						</tr>
					</thead>
					<tbody>
						{this.state.users.map((el) => (
							<tr>
								<td>{el._id}</td>
								<td>{el.First_Name}</td>
								<td>{el.Last_Name}</td>
								<td>{el.Email}</td>
								<td>{el.Phone_Number}</td>

								<td>
									<button
										class="btn btn-primary btn-xs"
										style={{ marginRight: '2px' }}
										onClick={() => {
											if (window.confirm('Are you sure you wish to delete user information?')) {
												this.delete1(el._id);
											}
										}}
									>
										<i class="fa fa-trash-o " />
									</button>{' '}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Customers;

