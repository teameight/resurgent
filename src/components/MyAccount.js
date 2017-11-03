import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import Transaction from './Transaction';
import firebase from '../fire';


class MyAccount extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        showModal: false,
        reauthed: true
      };

      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
      this.updateUser = this.updateUser.bind(this);
      this.handleUserDetails = this.handleUserDetails.bind(this);

      this.processLink= this.processLink.bind(this);
      this.reauth= this.reauth.bind(this);
      this.setReauth= this.setReauth.bind(this);
      this.setNotice = this.setNotice.bind(this);

  }

  componentWillUnmount () {
    this.props.clearNotices();
  }

  setNotice(notice) {
    this.props.setNotice(notice);
  }

  handleOpenModal(e) {
    e.preventDefault();
      this.setState({
        showModal: true
      });
    this.props.setModal(true);
  }

  handleCloseModal() {
    this.setState({
      showModal: false
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
    this.props.history.push(path);
  };

  handleUserDetails() {

    var name = document.getElementById('name').value;
    var lastname = document.getElementById('lastname').value;
    var email = document.getElementById('email').value;
    var pword = document.getElementById('pword').value;
    if (email.length < 4 && email.length > 0) {
      alert('Please enter a valid email address.');
      return;
    }
    if (pword.length < 4 && pword.length > 0) {
      alert('Please enter a valid password.');
      return;
    }

    this.updateUser(name, lastname, email, pword);
  }

  updateUser(name,lastname,email,pword) {
    var user = firebase.auth().currentUser;
    const userRef = firebase.database().ref('users/'+user.uid);

    let userObj = {
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
      emailVerified: user.emailVerified,
      uid: user.uid
    };

    var that = this;
    //var setReauth = this.setReauth();

    if(name.length>0){
      user.updateProfile({
        displayName: name
      }).then(function() {
        userObj.name = name;
        userRef.update({name: name});
        that.handleCloseModal();
        that.setNotice({
          type: 'success',
          message: 'Your first name has been updated.'
        });
      }).catch(function(error) {
        that.setNotice({
          type: 'warning',
          message: 'There was an error updating your first name.'
        });
      });
    }

    if(lastname.length>0){
      userObj.lastname = lastname;
        userRef.update({lastname: lastname});
        that.handleCloseModal();
        that.setNotice({
          type: 'success',
          message: 'Your last name has been updated.'
        });
    }

    if(email.length>0){
      user.updateEmail(email).then(function() {
        userObj.email = email;
        userRef.update({email: email});
        that.handleCloseModal();
        that.setNotice({
          type: 'success',
          message: 'Your email has been updated.'
        });
      }).catch(function(error) {
        that.setNotice({
          type: 'warning',
          message: 'There was an error updating your email.'
        });
        that.setReauth(false);
      });
    }

    if(pword.length>0){
      user.updatePassword(pword).then(function() {
        that.setNotice({
          type: 'success',
          message: 'Your password has been updated.'
        });
        that.handleCloseModal();
      }).catch(function(error) {
        that.setNotice({
          type: 'warning',
          message: 'There was an error updating your password.'
        });
        that.setReauth(false);
      });
    }

    this.props.setUser(userObj);
  }

  reauth(){
    const email = document.getElementById('email').value;
    const pword = document.getElementById('pword').value;

    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
        email, 
        pword
    );

    var that = this;

    user.reauthenticateWithCredential(credential).then(function() {

      that.setReauth(true);

    }).catch(function(error) {
      that.setNotice({
        type: 'warning',
        message: 'Reauthentication failed.'
      });
      console.log('reauth failed:');
      console.log(error);

    });
  }

  setReauth(reauth) {
    this.setState({
      reauthed: reauth
    });
  }



  render() {
    const user = this.props.user;
    let uName = '';
    let uTokens = '';
    let uEmail = '';
    let lastName = '';

    if(user != null){
      uName = user.name;
      uTokens = user.tokens;
      uEmail = user.email;
      lastName = user.lastname;
    }

    const transactions = this.props.transactions;
    // console.log(transactions);

    let zoneClass = 'modal-zones ';
    zoneClass += 'm-zone-' + this.state.zone;

    return (
        <div>
            <ReactModal
            isOpen={this.state.showModal}
            contentLabel="onRequestClose"
            onRequestClose={this.handleCloseModal}
            className="flow-account"
            overlayClassName="Overlay"
            closeTimeoutMS={500}
            >
                <header className="header-modal">
                    <div className="logo">
                    <a href="#" onClick={ (e) => this.processLink(e, '/') }><img src="../img/logo.png" alt="Resurgent - Legal Outplacement" /></a>
                    </div>
                    <div className="menu-icon" >
                        <button type="button" className="tcon tcon-remove" aria-label="remove item"  onClick={this.handleCloseModal}>
                          <span className="tcon-visuallyhidden">Close</span>
                        </button>
                    </div>
                </header>
                <div className={zoneClass}>
                    { this.state.reauthed && (
                      <section className="main edit-account">
                        <header>
                          <h1 className="page-title">Edit My Account Details</h1>
                        </header>
                        <form>
                          <input name="name" id="name" type="text" placeholder="update first name" />
                          <input name="lastname" id="lastname" type="text" placeholder="update last name" />
                          <input name="email" id="email"  type="email" placeholder="new e-mail" />
                          <input name="pword" id="pword" type="text" placeholder="new password" />
                          <input className="btn" onClick={this.handleUserDetails} type="button" value="Save" />
                          <p><a href="#" onClick={this.handleCloseModal}>cancel</a></p>
                        </form>
                      </section>
                    )}
                    { !this.state.reauthed && (
                      <section className="main edit-account">
                        <header>
                          <h1 className="page-title">Edit My Account Details</h1>
                          <p className="subtitle">For security, please provide your login credentials to edit your primary account details.</p>
                        </header>
                        <form>
                          <input name="email" id="email"  type="email" placeholder="current e-mail address" />
                          <input name="pword" id="pword" type="password" placeholder="current password" />
                          <input className="btn" onClick={this.reauth} type="button" value="Go" />
                          <p><a href="#" onClick={this.handleCloseModal}>cancel</a></p>
                      </form>
                    </section>
                    )}
                </div>
            </ReactModal>

            <section className="main my-account">
                <header>
                <h1 className="page-title">My Account</h1>
                </header>

                <div className="details-box solo">
                <div className="details-row">
                    <p>{uName} {lastName}</p>
                    <p><a className="text-link" href="#" onClick={ (e) => this.handleOpenModal(e) }>edit details</a></p>
                </div>
                <div className="details-row">
                    <p>{uEmail}</p>
                </div>
                </div>


                <h2 className="token-report">{uTokens} tokens left</h2>

                <p className="instruction">Your History</p>
                <div className="t-wrap">
                {
                  Object
                    .keys(transactions)
                    .map(key => <Transaction 
                      key={key} keyId={key} 
                      categories={this.props.categories}
                      areas={this.props.areas}
                      providers={this.props.providers} 
                      details={transactions[key]} 
                    />)
                }
                </div>
            </section>
        </div>
    )
  }
}

export default withRouter(MyAccount);