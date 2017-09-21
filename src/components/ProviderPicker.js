import React from 'react';
import Provider from './Provider';
import Flickity from 'react-flickity-component';
import ReactModal from 'react-modal';
import RatingStars from './RatingStars';
import firebase from '../fire';

const flickityOptions = {
  pageDots: false
}

class ProviderPicker extends React.Component {

  constructor() {
    super();
    this.state = {
      showModal: false,
      showRating: false,
      card: false,
      zone: 1,
      category: null,
      area: null,
      provider: null,
      formValues: {name:''}
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
  }

  componentWillUnmount () {
    this.props.clearNotices();
  }

  passProvider(keyId, mname) {
    this.props.selectProvider(keyId);
    this.handleOpenModal(mname);
    this.setState({ provider: keyId });
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
        showRating: false
      });
    }else{
      this.setState({
        showModal: false,
        showRating: true
      });
    }
    this.props.setModal(true);
  }

  handleCloseModal() {
    this.setState({
      showModal: false,
      showRating: false
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

    // Get the slug
    const catId = this.props.match.params.cat;
    const areaId = this.props.location.state.areaId;
    const pId = this.state.provider;
    let formValues = this.state.formValues;
    let adminEmail = '';
    let providerEmail = '';
    let providerName = '';
    // store `this` to use inside firebase promise
    let component = this;

    // get admin email address
    const settings = firebase.database().ref('settings');
    settings.once('value', function(snapshot) {
        formValues.adminEmail = snapshot.val().adminEmail ? snapshot.val().adminEmail : 'communicate@team-eight.com';
      });
    // get provider name and email address
    const provider = firebase.database().ref('providers').child(pId);
    provider.once('value', function(snapshot) {
        formValues.providerEmail = snapshot.val().email ? snapshot.val().email : adminEmail;
        formValues.providerName = snapshot.val().name ? snapshot.val().name : '';
      }).then(function() {
        component.props.updateReviews(formValues, catId, areaId, pId);
      });

    this.handleCloseModal();
  }

  processLink(e, path) {
    e.preventDefault();
    this.handleCloseModal();
    this.props.history.push(path);
  }

  handleBookSubmit(e, pCost) {
    e.preventDefault();
    const catId = this.props.match.params.cat;
    const areaId = this.props.location.state.areaId;
    const pId = this.state.provider;
    const user = this.props.user;
    const uTokens = user.tokens;
    user.tokens = uTokens - pCost;
    let adminEmail = '';
    let providerEmail = '';
    let providerName = '';
    let formValues = {
      subject: this.subject.value,
      body: this.body.value,
      userEmail: user.email,
      userName: user.name
    };

    // store `this` to use inside firebase promise
    let component = this;

    this.setState({
      zone : 2
    });

    // get admin email address
    const settings = firebase.database().ref('settings');
    settings.once('value', function(snapshot) {
        formValues.adminEmail = snapshot.val().adminEmail ? snapshot.val().adminEmail : 'communicate@team-eight.com';
      });
    // get provider name and email address
    const provider = firebase.database().ref('providers').child(pId);
    provider.once('value', function(snapshot) {
        formValues.providerEmail = snapshot.val().email ? snapshot.val().email : adminEmail;
        formValues.providerName = snapshot.val().name ? snapshot.val().name : '';
      }).then(function() {
        component.props.bookSessionTransaction(pCost, catId, areaId, pId, formValues);
      });
  }

  goToZone(e, znum) {
    e.preventDefault();
    this.setState({
      zone : znum
    });
  }

  render() {
    // Get the slug
    const slug = this.props.match.params.slug;
    const catId = this.props.location.state.catId;
    let category = {};
    let area = {};
    let pId = this.state.provider;
    // let area = {};
    // console.log(slug);


    if(catId){
      category = this.props.categories[catId];
      const {areas} = category;
      let areaId = Object.keys(areas).filter((key) => areas[key].slug === slug);
      area = areas[areaId];
      var {providers} = area;
    }

    const user = this.props.user;

    let pName = '';
    let pCost = '';
    let pCat = '';
    let pArea = '';
    let pRating = '';
    let pRatingNum = 0;
    let pReviews = '';
    let tokenCounts = [];

    if(pId){
      var provider = providers[pId];
      pName = provider.name;
      pCost = provider.cost;
      pCat = category.name;
      pArea = area.name;
      pRating = provider.rating;
      if ( provider.ratingArr ) {
        pRatingNum = provider.ratingArr.length;
      }
      if ( provider.reviews ) {
        pReviews = provider.reviews;
      }

      if(user != null){

        const total = parseInt(user.tokens, 10) + parseInt(pCost, 10);

        for (var i = user.tokens; i <= total; i++) {
          // console.log((total)+' '+i);
          tokenCounts.push(<li key={i}>{i}</li>);
        }
      }

    }

    let zoneClass = 'modal-zones ';
    zoneClass += 'm-zone-' + this.state.zone;

    return (
      <div>
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
                      <input ref={(input) => this.subject = input}name="subject" type="text" placeholder="Subject" required />
                      <textarea ref={(input) => this.body = input}name="message" rows="6" cols="50" required >Default form letter text. Lorem ipsum dolor sit amet.

        Thanks!
                      </textarea>
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
                      <div className="stars-static-top" style={{width: pRating + '%'}}>
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
                  <p><em>({pRatingNum} user rating{pRatingNum !== 1 && ('s')})</em></p>
                  <hr />
                  {
                    pReviews && (
                      pReviews.map(function(review, index) {
                        return (
                          <article className="review">
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

          <h1 className="area-title">{area.name}</h1>
          <Flickity
            className="providers"
            options={ flickityOptions }
          >
          {
            Object
              .keys(providers)
              .map(key => <Provider key={key} flipCard={this.flipCard} handleCloseModal={this.handleCloseModal} passProvider={this.passProvider} keyId={key} details={providers[key]} card={this.state.card} />)
          }
          </Flickity>
      </div>
    )
  }
}

ProviderPicker.contextTypes = {
  router: React.PropTypes.object
}

export default ProviderPicker;