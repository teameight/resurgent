import React from 'react';

class Provider extends React.Component {
	render() {
		const { details } = this.props;
		return (
			<div className="provider">
				<div className="profile-img">
					<img src={details.image} alt={details.name} />
				</div>
        <a className="video-link" src="#" title="Play Video"></a>
        <p className="token-cost"><span>tokens</span><br />5</p>
        <h1 className="provider-name">{details.name}</h1>
        <div className="bio">
	        <p>{details.desc}</p>
        </div>
        <a href="#" className="bio-handle">Read More</a>
        <div className="rating">
            <a href="../resurgent/rating.html">
                <h3>Ratings & Reviews</h3>
                <div className="stars-static" data-stars="https://codepen.io/ekeric13/project/editor/DkJYpA"><span>&#9734; </span><span>&#9734; </span><span>&#9734; </span><span>&#9734; </span><span>&#9734; </span></div>
            </a>
        </div>
        <a className="btn" href="../resurgent/book-a-session.html">Book a Session</a>

      </div>
		)
	}
}

export default Provider;