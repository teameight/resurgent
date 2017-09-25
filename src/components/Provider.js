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
						<img src={details.image} alt={details.name} />
					</div>
	        {/* <a className="video-link" src="#" title="Play Video"></a> TODO: video */}
	        <p className="token-cost"><span>tokens</span><br />{details.cost}</p>
	        <h1 className="provider-name">{details.name}</h1>
	        <div className="bio">
		        <p>{details.desc}</p>
	        </div>
	        <a href="#" onClick={ (e) => this.flipCard(e) } className="bio-handle">Read More</a>
	        <div className="rating">
	            <a onClick={ (e) => this.openModal(e, keyId, 'rating') }>
	                <h3>Ratings & Reviews</h3>
                  <div className="stars-static small" data-stars="https://codepen.io/ekeric13/project/editor/DkJYpA">
                      <div className="stars-static-top" style={{width: (details.rating ? details.rating : 0) + '%'}}>
                          <span>&#9733;</span>
                          <span>&#9733;</span>
                          <span>&#9733;</span>
                          <span>&#9733;</span>
                          <span>&#9733;</span>
                      </div>
                      <div className="stars-static-bottom">
                          <span>&#9733;</span>
                          <span>&#9733;</span>
                          <span>&#9733;</span>
                          <span>&#9733;</span>
                          <span>&#9733;</span>
                      </div>
                  </div>
	            </a>
	        </div>
	        <button className="btn" onClick={ (e) => this.openModal(e, keyId, 'book') }>Book a Session</button>
        </div>
        <div className="back">
        	<div className="back-inner">
	        	<h1 className="provider-name">{details.name}</h1>
	        	<p><small>complete bio</small></p>
	        	<div className="bio">
			        <p>{details.desc}</p>
		        </div>
	        	<p><a className="text-link" href="#" onClick={ (e) => this.flipCard(e) }>back to profile</a></p>
	        </div>
        </div>
      </div>
		)
	}
}

export default withRouter(Provider);