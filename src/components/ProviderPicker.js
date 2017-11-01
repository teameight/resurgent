import React from 'react';
import Provider from './Provider';
import Flickity from 'react-flickity-component';
import ReactModal from 'react-modal';
import RatingStars from './RatingStars';
import firebase from '../fire';
import axios from 'axios';

const flickityOptions = {
  pageDots: false
}

class ProviderPicker extends React.Component {

  constructor() {
    super();
    this.state = {
      showModal: false,
      showRating: false,
      showIStream: false,
      card: false,
      zone: 1,
      category: null,
      area: null,
      provider: null,
      formValues: {name:''},
      providersObj: {},
      iStreamValue: ''
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.processLink= this.processLink.bind(this);
    this.goToZone = this.goToZone.bind(this);
    this.handleReviewChange = this.handleReviewChange.bind(this);
    this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
    this.handleBookSubmit = this.handleBookSubmit.bind(this);

    this.handleRating = this.handleRating.bind(this);

    this.passProvider= this.passProvider.bind(this);
    this.flipCard= this.flipCard.bind(this);
    this.launchInterviewStream = this.launchInterviewStream.bind(this);
  }


  componentWillMount() {
    let providersObj = {};
    let key = 1;
    let that = this;

    const providersRef = firebase.database().ref('providers');
    providersRef.orderByChild('order').once('value').then(function(snapshot) {
      snapshot.forEach(function(data) {
        providersObj[key] = data.val();
        providersObj[key].id = data.key;
        key++;
      });
    }).then(function(){
      that.setState({
        providersObj:providersObj
      });
    });

  }

  componentWillUnmount () {
    this.props.clearNotices();
  }

  passProvider(keyId, mname) {
    this.props.selectProvider(keyId);
    this.handleOpenModal(mname);
    this.setState({ provider: keyId }, function() {
      if(mname === 'istream'){
        this.handleBookSubmit(false, '0', true);
      }
    });
    this.forceUpdate();
  }

  flipCard(keyId) {
    if(keyId === this.state.card){
      this.setState({ card: false });
    }else{
      this.setState({ card: keyId });
    }
  }

  handleOpenModal(mname) {
    if(mname === 'book'){
      this.setState({
        showModal: true,
        showRating: false,
        showIStream: false
      });
    }

    if(mname === 'rating'){
      this.setState({
        showModal: false,
        showRating: true,
        showIStream: false
      });
    }

    if(mname === 'istream'){
      this.setState({
        showModal: false,
        showRating: false,
        showIStream: true
      });
    }

    this.props.setModal(true);
  }

  handleCloseModal() {
    this.setState({
      showModal: false,
      showRating: false,
      showIStream: false
    });
    this.props.setModal(false);
    setTimeout(() => {
      this.setState({
        zone : 1
      })
    }, 500);
  }

  handleRating(rating) {
      let formValues = this.state.formValues;
      let newRating = rating;

      formValues["newRating"] = newRating;
  }

  handleReviewChange(e) {
    e.preventDefault();
    let formValues = this.state.formValues;
    let name = e.target.name;
    let value = e.target.value;

    formValues[name] = value;

    this.setState({formValues});
  }

  handleReviewSubmit(e) {
    e.preventDefault();
    // Firebase refs
    const settings = firebase.database().ref('settings');
    const provider = firebase.database().ref('providers');

    const providersObj = this.state.providersObj;

    // Get the slug
    const catId = this.props.location.state.catId;
    const areaId = this.props.location.state.areaId;
    const pId = providersObj[this.state.provider].id;
    let formValues = this.state.formValues;
    // store `this` to use inside firebase promise
    let component = this;

    function getFirebaseData() {
      return settings.once('value').then(function(snapshot) {
        formValues.adminEmail = snapshot.val().adminEmail;
        formValues.adminUrl = snapshot.val().adminUrl;
        formValues.nodeUrl = snapshot.val().nodeUrl;
      }).then(function() {
        return provider.child(pId).once('value').then(function(snapshot) {
          formValues.providerName = snapshot.val().name;
          formValues.providerEmail = snapshot.val().email;
        });
      }).then(function() {
        component.props.updateReviews(formValues, catId, areaId, pId);
      });
    }

    getFirebaseData();

    this.handleCloseModal();
  }

  processLink(e, path) {
    e.preventDefault();
    this.handleCloseModal();
    this.props.history.push(path);
  }

  handleBookSubmit(e, pCost, istream = false) {
    if(!istream){
      e.preventDefault();
    }
    // Firebase refs
    const settings = firebase.database().ref('settings');
    const provider = firebase.database().ref('providers');

    // Other vars
    const providersObj = this.state.providersObj;
    const catId = this.props.location.state.catId;
    const areaId = this.props.location.state.areaId;
    const pId = providersObj[this.state.provider].id;
    const user = this.props.user;
    const uTokens = user.tokens;

    if(istream){
      pCost = providersObj[this.state.provider].cost
    }

      user.tokens = uTokens - pCost;

      let formValues = {};
      if(istream){
        formValues = {
          subject: 'Resurgent: You are now signed up for InterviewStream',
          body: 'Congratulations! You have signed up to InterviewStream through Resurgent Outplacement. Visit https://resurgentoutplacement.com/area/mock-interview to log in and start sharpening your interview skills.',
          userEmail: user.email,
          userName: user.name
        };
      }else{
        formValues = {
          subject: this.subject.value,
          body: this.body.value,
          userEmail: user.email,
          userName: user.name
        };
      }

      // store `this` to use inside firebase promise
      let component = this;

      if(!istream){
        this.setState({
          zone : 2
        });
      }

      function getFirebaseData() {
        return settings.once('value').then(function(snapshot) {
          formValues.adminEmail = snapshot.val().adminEmail;
          formValues.nodeUrl = snapshot.val().nodeUrl;
        }).then(function() {
          return provider.child(pId).once('value').then(function(snapshot) {
            formValues.providerEmail = snapshot.val().email;
            formValues.providerName = snapshot.val().name;
          });
        }).then(function() {
          component.props.bookSessionTransaction(pCost, catId, areaId, pId, formValues, true);
        });
      }

      getFirebaseData();



  }

  goToZone(e, znum) {
    e.preventDefault();
    this.setState({
      zone : znum
    });
  }

  launchInterviewStream(e) {
    e.preventDefault();
    const settings = firebase.database().ref('settings');
    let nodeUrl = '';

    function getFirebaseData() {
      return settings.once('value').then(function(snapshot) {
        nodeUrl = snapshot.val().nodeUrl;
      });
    }

    function fireForm() {

    }

    getFirebaseData();

    let that = this;

    axios.post('//localhost:5000/interview-stream')
      .then(function (response) {
        that.setState({ iStreamValue: response.data}, function() {
          that.inputElement.click();
        });
        console.log('iStreamValue', response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {

    const catId = this.props.location.state.catId;
    const areaId = this.props.location.state.areaId;
    let pId = this.state.provider;
    let isInterviewStream = false;

    let pcheck = (Object.keys(this.state.providersObj).length !== 0);
    const providersObj = this.state.providersObj;

    const user = this.props.user;

    let pName = '';
    let pCost = '';
    let pCat = '';
    let pArea = this.props.areas[areaId].name;
    let pRating = '';
    let pRatingNum = 0;
    let pReviews = '';
    let tokensLeft = 0;
    let tokenCounts = [];


    let zoneClass = 'modal-zones ';
    zoneClass += 'm-zone-' + this.state.zone;
    if(this.state.zone === 2){
      zoneClass += ' m-zone-tokens';
    }
    
    let hasIstream = false;
    
    if(user != null){
      if(user.istream){
        hasIstream = true;
      }
      
      tokensLeft = user.tokens;
    }

    if(pId && pcheck){
      var provider = providersObj[pId];

      pName = provider.name;
      pCost = provider.cost;
      pCat = this.props.categories[catId].name;
      pRating = provider.rating;
      if ( provider.ratingArr ) {
        pRatingNum = provider.ratingArr.length;
      }
      if ( provider.reviews ) {
        pReviews = provider.reviews;
      }

      if(pName === "InterviewStream"){
        isInterviewStream = true;
        zoneClass += ' m-zone-tokens';
      }

      console.log(isInterviewStream);

      // console.log(pReviews);


      if(user != null){

        const total = parseInt(user.tokens, 10) + parseInt(pCost, 10);

        for (var i = user.tokens; i <= total; i++) {
          tokenCounts.push(<li key={i}>{i}</li>);
        }


      }

    }


    return (
      <div>
        <ReactModal
           isOpen={this.state.showIStream}
           contentLabel="onRequestClose"
           onRequestClose={this.handleCloseModal}
           className="flow-book-session i-stream-zone"
           overlayClassName="Overlay"
           closeTimeoutMS={500}
        >
          <header className="header-modal">
            <div className="logo">
              <a href="#" onClick={ (e) => this.processLink(e, '/') }><img src={require('../img/logo.png')} alt="Resurgent - Legal Outplacement" /></a>
            </div>
            <div className="menu-icon" >
              <button type="button" className="tcon tcon-remove" aria-label="remove item"  onClick={this.handleCloseModal}>
                <span className="tcon-visuallyhidden">Close</span>
              </button>
            </div>
          </header>
          <div className={zoneClass}>
            <section className="main book-confirm">
              <header>
                  <p className="subtitle">You now have access to</p>
                  <h1 className="page-title">InterviewStream</h1>
              </header>
              <div className="token-wrap">
                  <div className="token-spinner">
                      <ul>
                        { tokenCounts }
                      </ul>
                  </div>
                  <span>Tokens</span>
              </div>
              <a className="btn" href="" onClick={this.launchInterviewStream}>Launch InterviewStream</a>
              <p>Your account now includes unlimited visits to InterviewStream. Come back to this card to login and access practice interviews.</p>
          </section>
          </div>
        </ReactModal>

        <ReactModal
           isOpen={this.state.showModal}
           contentLabel="onRequestClose"
           onRequestClose={this.handleCloseModal}
           className="flow-book-session"
           overlayClassName="Overlay"
           closeTimeoutMS={500}
        >
          <header className="header-modal">
            <div className="logo">
              <a href="#" onClick={ (e) => this.processLink(e, '/') }><img src={require('../img/logo.png')} alt="Resurgent - Legal Outplacement" /></a>
            </div>
            <div className="menu-icon" >
              <button type="button" className="tcon tcon-remove" aria-label="remove item"  onClick={this.handleCloseModal}>
                <span className="tcon-visuallyhidden">Close</span>
              </button>
            </div>
          </header>
          <div className={zoneClass}>
            <section className="main">
                <header>
                    <h1 className="page-title">Book A Session</h1>
                </header>
                <div className="form-intro">
                    <p className="messaging"><strong>Messaging:</strong> {pName}</p>
                    <p>{pCat}: {pArea} <strong>({pCost} tokens)</strong></p>
                </div>
                <form ref={(input) => this.bookForm = input}onSubmit={(e) => this.handleBookSubmit(e, pCost)}>
                    <input ref={(input) => this.subject = input}name="subject" type="text" placeholder="Book your session" required defaultValue="Book your session" />
                    <textarea ref={(input) => this.body = input}name="message" rows="6" cols="50" required defaultValue="Hello, I am seeking to book a session via Resurgent. I look forward to your reply."></textarea>
                    <input className="btn" type="submit" value="Send" />
                </form>
            </section>
            <section className="main book-confirm">
              <header>
                  <p className="subtitle">You have requested a session with</p>
                  <h1 className="page-title">{pName}</h1>
              </header>
              <p className="instruction">You will receive an email confirmation</p>
              <div className="token-wrap">
                  <div className="token-spinner">
                      <ul>
                        { tokenCounts }
                      </ul>
                  </div>
                  <span>Tokens</span>
              </div>
              <a className="btn" onClick={this.handleCloseModal}>Back to Provider</a>
          </section>
          </div>
        </ReactModal>

        <ReactModal
             isOpen={this.state.showRating}
             contentLabel="onRequestClose"
             onRequestClose={this.handleCloseModal}
             className="flow-rating"
             overlayClassName="Overlay"
             closeTimeoutMS={500}
          >
            <header className="header-modal">
              <div className="logo">
                <a href="#" onClick={ (e) => this.processLink(e, '/') }><img src={require('../img/logo.png')} alt="Resurgent - Legal Outplacement" /></a>
              </div>
              <div className="menu-icon" >
                <button type="button" className="tcon tcon-remove" aria-label="remove item"  onClick={this.handleCloseModal}>
                  <span className="tcon-visuallyhidden">Close</span>
                </button>
              </div>
            </header>
            <div className={zoneClass}>
              <section className="main read-ratings">
                  <header>
                      <p className="subtitle">{pName}'s</p>
                      <h1 className="page-title">Ratings & Reviews</h1>
                      <a href="#" onClick={ (e) => this.goToZone(e, 2) }>write a review</a>
                  </header>
                  <hr />
                  <div className="stars-static" data-stars="https://codepen.io/ekeric13/project/editor/DkJYpA">
                      <div className="stars-static-top" style={{width: (pRating ? pRating : 0) + '%'}}>
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
                  <p className="user-rating-count"><em>({pRatingNum} user rating{pRatingNum !== 1 && ('s')})</em></p>
                  <hr />
                  {
                    pReviews && (
                      pReviews
                        .filter(current => current.approved && !current.isArchived)
                        .map(function(review, index) {
                        return (
                          <article key={index} className="review">
                              <h1>{review.headline}</h1>
                              <p>{review.message}</p>
                            {/* <a className="readmore" href="#">Read More</a> */}
                          </article>
                        )
                      })
                    )
                  }
                  {
                    !pReviews && (
                      <p>Be the first to leave a review.</p>
                    )
                  }
              </section>
              <section className="main write-review">
                  <header>
                      <p className="subtitle">leave a review for</p>
                      <h1 className="page-title">{pName}</h1>
                      <RatingStars handleRating={this.handleRating} provider={pId} />
                  </header>


                  <p className="instruction">Write an optional review here. Your name will be kept anonymous.</p>
                  <form onSubmit={(e) => this.handleReviewSubmit(e)}>
                      <input name="headline" type="text" placeholder="Your review headline" onChange={this.handleReviewChange} />
                      <textarea name="message" rows="6" cols="50" placeholder="Write your review here" onChange={this.handleReviewChange} ></textarea>
                      <input className="btn" type="submit" value="Submit Review" />
                  </form>

              </section>
            </div>
          </ReactModal>

          <h1 className="area-title">{pArea}</h1>
          {
            pcheck && (
            <Flickity
              className="providers"
              options={ flickityOptions }
            >
            {
              Object
                .keys(providersObj)
                .filter((current) => providersObj[current].area === areaId && !providersObj[current].isArchived)
                .map(key => <Provider key={key} flipCard={this.flipCard} handleCloseModal={this.handleCloseModal} launchInterviewStream={this.launchInterviewStream} passProvider={this.passProvider} keyId={key} pId={providersObj[key].id} pArea={pArea} tokensLeft={tokensLeft} hasIstream={hasIstream} details={providersObj[key]} card={this.state.card} />)
            }
            </Flickity>
            )
          }
          {
            pArea === 'Mock Interviews' && (
              <form className='istream-form' name='form' action='https://isprep.interviewstream.com/SSO/SSO_SC' method='post'><input type='hidden' name='login' value={this.state.iStreamValue} /><input type="submit" ref={input => this.inputElement = input} /></form>
            )
          }

      </div>
    )
  }
}

ProviderPicker.contextTypes = {
  router: React.PropTypes.object
}

export default ProviderPicker;