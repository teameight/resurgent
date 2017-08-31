import React from 'react';
import BookSession from './BookSession';
import { withRouter } from 'react-router-dom';

class Provider extends React.Component {

	constructor() {
		super();

		this.bookSession = this.bookSession.bind(this);
	}

	bookSession(e, keyId, path) {
		e.preventDefault();
  	this.props.passProvider(keyId);
  	// this.props.history.push(path);
	}

	render() {
		const { details } = this.props;
		const { keyId } = this.props;
		return (
			<div className="provider">
				<div className="profile-img">
					<img src="../img/profile-pic.jpg" alt={details.name} />
				</div>
        <a className="video-link" src="#" title="Play Video"></a>
        <p className="token-cost"><span>tokens</span><br />5</p>
        <h1 className="provider-name">{details.name}</h1>
        <div className="bio">
	        <p>{details.desc}</p>
        </div>
        <a href="#" className="bio-handle">Read More</a>
        <div className="rating">
            <a onClick={() => this.props.history.push('/rating')}>
                <h3>Ratings & Reviews</h3>
                <div className="stars-static" data-stars="https://codepen.io/ekeric13/project/editor/DkJYpA"><span>&#9734; </span><span>&#9734; </span><span>&#9734; </span><span>&#9734; </span><span>&#9734; </span></div>
            </a>
        </div>
        <button className="btn" onClick={  (e) => this.bookSession(e, keyId, '/book-session') }>Book a Session</button>

      </div>
		)
	}
} 

export default withRouter(Provider);