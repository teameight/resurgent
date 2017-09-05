import React from 'react';
import Provider from './Provider';
import Flickity from 'react-flickity-component';
import ReactModal from 'react-modal';
import RatingStars from './RatingStars';

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
      zone : 1,
      category: null,
      area: null,
      provider: null
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.processLink= this.processLink.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.goToZone = this.goToZone.bind(this);

    this.passProvider= this.passProvider.bind(this);
    this.flipCard= this.flipCard.bind(this);
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

  processLink(e, path) {
    e.preventDefault();
    this.closeMenu();
    this.props.history.push(path);
  }

  handleSend = function(e, pTokens) {
    e.preventDefault();
    const user = this.props.users;
    const tokens = user.tokens;
    //console.log(tokens);
    user.tokens = tokens - pTokens;

    this.setState({
      zone : 2
    });

    //this.props.history.push('/book-confirm');
  }

  goToZone = function(e, znum) {
    e.preventDefault();
    this.setState({
      zone : znum
    });
  }

  render() {
    // Get the slug
    const slug = this.props.match.params.slug;
    const catId = this.props.match.params.cat;
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

    const user = this.props.users;

    let pName = '';
    let pTokens = '';
    let pCat = '';
    let pArea = '';

    if(pId){
      var provider = providers[pId];
      pName = provider.name;
      pTokens = provider.tokens;
      pCat = provider.sectionName;
      pArea = provider.areaName;
    }

    let tokenCounts = [];
    for (var i = user.tokens; i <= user.tokens + pTokens; i++) {
      tokenCounts.push(<li>{i}</li>);
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
                <a href="#" onClick={ (e) => this.processLink(e, '/home') }><img src={require('../img/logo.png')} alt="Resurgent - Legal Outplacement" /></a>
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
                      <p>{pCat}: {pArea} <strong>({pTokens} tokens)</strong></p>
                  </div>
                  <form>
                      <input name="subject" type="text" placeholder="Subject" />
                      <textarea name="message" rows="12" cols="50">Default form letter text. Lorem ipsum dolor sit amet.

        Thanks!
                      </textarea>
                      <input className="btn" onClick={  (e) => this.handleSend(e, pTokens) } type="submit" value="Send" />
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
                <a href="#" onClick={ (e) => this.processLink(e, '/home') }><img src={require('../img/logo.png')} alt="Resurgent - Legal Outplacement" /></a>
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
                      <div className="stars-static-top" style={{width: '87%'}}>
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
                  <p><em>(5 user ratings)</em></p>
                  <hr />
                  <article className="review">
                      <h1>Sample user review 1</h1>
                      <p>Vestibulum volutpat, enim vel tempus finibus, velit odio mattis sem, vel luctus arcu velit ut elit. Sed non cursus sem, eget iaculis massa. Nam sit amet risus et ligula eleifend laoreet ut in neque. Proin sed maximus nibh. Donec vel rhoncus lectus. Sed porttitor quam et risus varius finibus fermentum et dolor...</p>
                      <a className="readmore" href="#">Read More</a>
                  </article>
                  <article className="review">
                      <h1>Sample user review 2</h1>
                      <p>Vestibulum volutpat, enim vel tempus finibus, velit odio mattis sem, vel luctus arcu velit ut elit. Sed non cursus sem, eget iaculis massa. Nam sit amet risus et ligula eleifend laoreet ut in neque. Proin sed maximus nibh. Donec vel rhoncus lectus. Sed porttitor quam et risus varius finibus fermentum et dolor...</p>
                      <a className="readmore" href="#">Read More</a>
                  </article>
                  <article className="review">
                      <h1>Sample user review 3</h1>
                      <p>Vestibulum volutpat, enim vel tempus finibus, velit odio mattis sem, vel luctus arcu velit ut elit. Sed non cursus sem, eget iaculis massa. Nam sit amet risus et ligula eleifend laoreet ut in neque. Proin sed maximus nibh. Donec vel rhoncus lectus. Sed porttitor quam et risus varius finibus fermentum et dolor...</p>
                      <a className="readmore" href="#">Read More</a>
                  </article>
                  <article className="review">
                      <h1>Sample user review 4</h1>
                      <p>Vestibulum volutpat, enim vel tempus finibus, velit odio mattis sem, vel luctus arcu velit ut elit. Sed non cursus sem, eget iaculis massa. Nam sit amet risus et ligula eleifend laoreet ut in neque. Proin sed maximus nibh. Donec vel rhoncus lectus. Sed porttitor quam et risus varius finibus fermentum et dolor...</p>
                      <a className="readmore" href="#">Read More</a>
                  </article>

              </section>
              <section className="main write-review">
                  <header>
                      <p className="subtitle">leave a review for</p>
                      <h1 className="page-title">{pName}</h1>
                      <RatingStars />
                  </header>


                  <p className="instruction">Write an optional review here. Your name will be kept anonymous.</p>
                  <form>
                      <input name="headline" type="text" placeholder="Your review headline" />
                      <textarea name="message" rows="12" cols="50" placeholder="Write your review here"></textarea>
                      <input className="btn" value="Submit Review" onClick={this.handleCloseModal} />
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
              .map(key => <Provider flipCard={this.flipCard} handleCloseModal={this.handleCloseModal} passProvider={this.passProvider} keyId={key} details={providers[key]} card={this.state.card} />)
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