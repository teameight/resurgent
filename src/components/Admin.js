import React from 'react';
import AdminAreas from './AdminAreas';

class Admin extends React.Component {

	constructor() {
		super();

		this.state = {
			providers: {},
			areas: {}
		}
	}

	render() {
		return (
			<div className="admin">
				<h1>Admin</h1>
				<AdminAreas areas={this.state.areas} />
			</div>
		)
	}
}

export default Admin;