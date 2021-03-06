import React from 'react';
import { withRouter } from 'react-router-dom';
var HtmlToReactParser = require('html-to-react').Parser;

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

    let isInterviewStream = false;
    if(details.type === "interviewstream"){
      isInterviewStream = true;
      pClass += ' i-stream';
    }

    let hasIstream = false;
    if(isInterviewStream){
    	hasIstream = this.props.hasIstream;
    }

    let isHeadhunter = false;
    if(details.type === "headhunter"){
      isHeadhunter = true;
    }

    let isVideoProvider = false;
    if(details.type === "watchvideos"){
      isVideoProvider = true;
    }

    let hasVideo = false;
    if(isVideoProvider){
    	hasVideo = this.props.hasVideo;
    }

    let canPay = false;
    if(this.props.tokensLeft > 0){
    	const total = parseInt(this.props.tokensLeft, 10) - parseInt(details.cost, 10);
      if(total >= 0){
        canPay = true;
      }
    }

    const pArea = this.props.pArea;
    let backLabel = 'bio and services';
    let backText = 'back to profile';
    let descText = details.desc;

    if(pArea === "Finding your Headhunter"){
    	//backLabel = 'Non-attorney Professionals';
    	backLabel = '...continued';
    	//backText = 'back to Attorneys';
    	pClass += ' headhunters';
    	descText = details.desc;
    }

		return (
			<div className={pClass}>
			{
				isHeadhunter && (
					<div className="front">
		        {/* <a className="video-link" src="#" title="Play Video"></a> TODO: video */}
		        <h1 className="provider-name">{details.name}</h1>
		        <div className="bio" dangerouslySetInnerHTML={{__html: details.desc}}></div>
	        </div>
				)
			}
			{
				!isHeadhunter && (
					<div className="front">
						<div className="profile-img">
							<img src={details.image} alt={details.name} />
						</div>
		        {/* <a className="video-link" src="#" title="Play Video"></a> TODO: video */}
		        <p className="token-cost"><span>tokens</span><br />{details.cost}</p>
		        <h1 className="provider-name">{details.name}</h1>
		        <div className="bio" dangerouslySetInnerHTML={{__html: details.desc}}></div>
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
		        { !isVideoProvider && !isInterviewStream && canPay && (
		        		<button className="btn" onClick={ (e) => this.openModal(e, keyId, 'book') }>Book a Session</button>
		        	)
		        }

		        { isVideoProvider &&  !hasVideo && canPay && (
		        		<button className="btn" onClick={ (e) => this.openModal(e, keyId, 'videos') }>Watch Videos Now</button>
		        	)
		        }
		        { isInterviewStream && !hasIstream && canPay && (
		        		<button className="btn" onClick={ (e) => this.openModal(e, keyId, 'istream') }>Launch Practice Interviews</button>
		        	)
		        }
		        { hasIstream && (
		        		<a className="btn" href="" onClick={this.props.launchInterviewStream}>Relaunch Practice Interviews</a>
		        	)
		        }
		        { hasVideo && (
		        		<a className="btn" href="https://vimeopro.com/studiobdc/resurgent-outplacement-media">Return to Videos</a>
		        	)
		        }
		        { !canPay && !hasIstream && !hasVideo && (
		        		<p><em>You do not have enough tokens left for this provider.</em></p>
		        	)
		        }
		        { canPay && isInterviewStream && !hasIstream && (
		        		<p>({details.cost} tokens)</p>
		        	)
		        }
	        </div>
	      )
			}
			{
				!isHeadhunter && (
					<div className="back">
	        	<div className="back-inner">
		        	<h1 className="provider-name">{details.name}</h1>
		        	<p><small>{backLabel}</small></p>
		        	<div className="bio" dangerouslySetInnerHTML={{__html: descText}}></div>
		        	<p><a className="text-link" href="#" onClick={ (e) => this.flipCard(e) }>{backText}</a></p>
		        </div>
	        </div>
	        )
			}
			</div>
		)
	}
}

export default withRouter(Provider);