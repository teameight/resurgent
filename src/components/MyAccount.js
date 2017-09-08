import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import Transaction from './Transaction';


class MyAccount extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
      
      this.processLink= this.processLink.bind(this);
      
  }

  // componentWillMount() {
  //   this.setState({ profile: {} });
  //   const { userProfile, getProfile } = this.props.auth;
  //   if (!userProfile) {
  //     getProfile((err, profile) => {
  //       this.setState({ profile });
  //     });
  //   } else {
  //     this.setState({ profile: userProfile });
  //   }
  // }

  handleOpenModal() {
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
  
  render() {
    const user = this.props.users;
    // const { profile } = this.state;
    const userId = "user-1"
    const transactions = this.props.transactions[userId];
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
                    <section className="main edit-account">
                        <header>
                          <h1 className="page-title">Edit My Account</h1>
                        </header>
                        <form>
                          <input name="username" type="text" placeholder="new username" />
                          <input name="email" type="email" placeholder="new e-mail" />
                          <input name="password" type="text" placeholder="new password" />
                          <input className="btn" onClick={this.handleCloseModal} value="Save" />
                          <p><a href="#" onClick={this.handleCloseModal}>cancel</a></p>
                        </form>
                    </section>
                </div>
            </ReactModal>

            <section className="main my-account">
                <header>
                <h1 className="page-title">My Account</h1>
                </header>

                <div className="details-box solo">
                <div className="details-row">
                    <p>{user.name}</p>
                    <p><a className="text-link" href="#" onClick={this.handleOpenModal}>edit details</a></p>
                </div>
                <div className="details-row">
                    <p>{user.email}</p>
                </div>
                </div>


                <h2 className="token-report">{user.tokens} tokens left</h2>

                <p className="instruction">Your History</p>
                {
                  Object
                    .keys(transactions)
                    .map(key => <Transaction keyId={key} categories={this.props.categories} details={transactions[key]} />)
                }
            </section>
        </div>
    )
  }
}

export default withRouter(MyAccount);