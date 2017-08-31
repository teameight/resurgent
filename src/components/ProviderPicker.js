import React from 'react';
import Provider from './Provider';
import Flickity from 'react-flickity-component';
import ReactModal from 'react-modal';
import CSSTransitionGroup from 'react-transition-group';

const flickityOptions = {
  pageDots: false
}

class ProviderPicker extends React.Component {

  constructor() {
    super();
    this.state = {
      showModal: false,
      provider: null
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.processLink= this.processLink.bind(this);

    this.passProvider= this.passProvider.bind(this);
  }

  passProvider(keyId) {
    this.props.selectProvider(keyId);
    this.handleOpenModal();
    this.setState({ provider: keyId });
  }

  handleOpenModal () {
    this.setState({ showModal: true });
    this.props.setModal(true);
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
    this.props.setModal(false);
  }

  processLink(e, path) {
    e.preventDefault();
    this.closeMenu();
    this.props.history.push(path);
  }

  render() {
    // Get the slug
    const slug = this.props.match.params.slug;

    const user = this.props.users;
    let pId = this.state.provider;
    const provider = this.props.providers[pId];
    let pName = '';
    let pTokens = '';
    let pCat = '';
    let pArea = '';

    if(pId){
      pName = this.props.providers[pId].name;
      pTokens = this.props.providers[pId].tokens;
      // pName = this.props.providers[pId].category;
      // pTokens = this.props.providers[pId].areaname;
      // !!! need to store these in the provider object for easy access
    }

    return (
      <div>
        <ReactModal 
             isOpen={this.state.showModal}
             contentLabel="onRequestClose Example"
             onRequestClose={this.handleCloseModal}
             className="flow-book-session"
             overlayClassName="Overlay"
             closeTimeoutMS={500}
          >
            <header className="header-modal">
              <div className="logo">
                <a href="#" onClick={ (e) => this.processLink(e, '/home') }><img src="../img/logo.png" alt="Resurgent - Legal Outplacement" /></a>
              </div>
              <div className="menu-icon" >
                <button type="button" className="tcon tcon-remove" aria-label="remove item"  onClick={this.handleCloseModal}>
                  <span className="tcon-visuallyhidden">Close</span>
                </button>
              </div>
            </header>
            <section className="main">
                <header>
                    <h1 className="page-title">Book A Session</h1>
                </header>
                <div className="form-intro">
                    <p className="messaging"><strong>Messaging:</strong> {pName}</p>
                    <p>[Section Label]: [Area Label] <strong>({pTokens} tokens)</strong></p>
                </div>
                <form>
                    <input name="subject" type="text" placeholder="Subject" />
                    <textarea name="message" rows="12" cols="50">Default form letter text. Lorem ipsum dolor sit amet.

      Thanks!
                    </textarea>
                    <input className="btn" onClick={  (e) => this.handleSend(e, pTokens) } type="submit" value="Send" />
                </form>
                <button onClick={this.handleCloseModal}>Close Modal</button>
            </section>
            
          </ReactModal>
        <h1 className="area-title">Area Title</h1>
        <p className="area-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis quaerat a eaque excepturi fuga consectetur aperiam neque corrupti molestiae aut totam et laborum nesciunt ipsam, repellendus consequatur. Provident, neque, debitis!</p>
        <button onClick={this.handleOpenModal}>Trigger Modal</button>
          <Flickity
            className="providers"
            options = { flickityOptions }
          >
          {
            Object
              .keys(this.props.providers)
              .map(key => this.props.providers[key].area == slug && <Provider handleCloseModal = {this.handleCloseModal} passProvider={this.passProvider} keyId={key} details={this.props.providers[key]} />)
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