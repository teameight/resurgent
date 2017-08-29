import React from 'react';
import { withRouter } from 'react-router-dom';

class Area extends React.Component {
	render() {
		const { details } = this.props;
		return (
			<div className="area carousel-cell" onClick={() => this.props.history.push('/providers')}>
				<img src={details.image} alt={details.name} />
				<span>{details.name}</span>
      </div>
		)
	}
}

export default withRouter(Area);