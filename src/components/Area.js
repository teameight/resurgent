import React from 'react';
import { Link } from 'react-router-dom';

class Area extends React.Component {
	render() {
		const { details } = this.props;
		return (
			<div className="area">
				<Link to="/providers/">
				<img src={details.image} alt={details.name} />
				</Link>
      </div>
		)
	}
}

export default Area;