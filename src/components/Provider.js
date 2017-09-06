import React from 'react';
import { withRouter } from 'react-router-dom';

class Provider extends React.Component {

	constructor() {
		super();

		this.openModal = this.openModal.bind(this);
		this.flipCard = this.flipCard.bind(this);
	}

	openModal(e, keyId, mname) {
		e.preventDefault();
  	this.props.passProvider(keyId, mname);
  	// this.props.history.push(path);
	}


	flipCard(e) {
		e.preventDefault();
  	this.props.flipCard(this.props.keyId);
  	// this.props.history.push(path);
	}

	render() {
		const { details } = this.props;
		const { keyId } = this.props;

		let pClass = 'provider';
		if(this.props.card === this.props.keyId){
	    pClass += ' flipped';
	  }

		return (
			<div className={pClass}>
				<div className="front">
					<div className="profile-img">
						<img src={require('../img/profile-pic.jpg')} alt={details.name} />
					</div>
	        <a className="video-link" src="#" title="Play Video"></a>
	        <p className="token-cost"><span>tokens</span><br />5</p>
	        <h1 className="provider-name">{details.name}</h1>
	        <div className="bio">
		        <p>{details.desc}</p>
	        </div>
	        <a href="#" onClick={ (e) => this.flipCard(e) } className="bio-handle">Read More</a>
	        <div className="rating">
	            <a onClick={ (e) => this.openModal(e, keyId, 'rating') }>
	                <h3>Ratings & Reviews</h3>
	                <div className="stars-static" data-stars="https://codepen.io/ekeric13/project/editor/DkJYpA"><span>&#9734; </span><span>&#9734; </span><span>&#9734; </span><span>&#9734; </span><span>&#9734; </span></div>
	            </a>
	        </div>
	        <button className="btn" onClick={ (e) => this.openModal(e, keyId, 'book') }>Book a Session</button>
        </div>
        <div className="back">
        	<div className="back-inner">
	        	<h1 className="provider-name">{details.name}</h1>
	        	<p><a href="#" onClick={ (e) => this.flipCard(e) }>back to profile</a></p>
	        	<div className="bio">
			        <p>{details.desc}</p>
		        </div>
	        </div>
        </div>
      </div>
		)
	}
} 

export default withRouter(Provider);