import React from 'react';

class Provider extends React.Component {
	render() {
		const { details } = this.props;
		return (
			<div className="provider">
				<img src={details.image} alt={details.name} />
        <h3>{details.name}</h3>
        <p>{details.desc}</p>
      </div>
		)
	}
}

export default Provider;