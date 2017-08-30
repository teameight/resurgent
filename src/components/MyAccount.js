import React from 'react';
import { withRouter } from 'react-router-dom';

class MyAccount extends React.Component {

  constructor(props) {
      super(props);
      
      this.processLink= this.processLink.bind(this);
      
  }

  processLink(e, path) {
    e.preventDefault();
    this.props.history.push(path);
  };
  
  render() {

    return (
      <section className="main my-account">
            <header>
                <h1 className="page-title">My Account</h1>
            </header>

            <div className="details-box solo">
                <div className="details-row">
                    <p>[username]</p>
                    <p><a href="#" onClick={  (e) => this.processLink(e, '/edit-account') }>edit details</a></p>
                </div>
                <div className="details-row">
                    <p>email@emailaddress.com</p>
                </div>
            </div>


            <h2 className="token-report">30 tokens left</h2>

            <p className="instruction">Your History</p>
            <div className="details-box">
                <div className="details-row">
                    <p>Career Coaching: Getting Unstuck</p>
                    <p><strong>5 tokens</strong></p>
                </div>
                <div className="details-row">
                    <p><em>Lauren Laitlin</em></p>
                    <p>contacted Sep 12, 2017</p>
                </div>
            </div>
            <div className="details-box">
                <div className="details-row">
                    <p>Career Coaching: Getting Unstuck</p>
                    <p><strong>5 tokens</strong></p>
                </div>
                <div className="details-row">
                    <p><em>Lauren Laitlin</em></p>
                    <p>contacted Sep 12, 2017</p>
                </div>
            </div>
            <div className="details-box">
                <div className="details-row">
                    <p>Career Coaching: Getting Unstuck</p>
                    <p><strong>5 tokens</strong></p>
                </div>
                <div className="details-row">
                    <p><em>Lauren Laitlin</em></p>
                    <p>contacted Sep 12, 2017</p>
                </div>
            </div>
            <div className="details-box">
                <div className="details-row">
                    <p>Career Coaching: Getting Unstuck</p>
                    <p><strong>5 tokens</strong></p>
                </div>
                <div className="details-row">
                    <p><em>Lauren Laitlin</em></p>
                    <p>contacted Sep 12, 2017</p>
                </div>
            </div>
            <div className="details-box">
                <div className="details-row">
                    <p>Career Coaching: Getting Unstuck</p>
                    <p><strong>5 tokens</strong></p>
                </div>
                <div className="details-row">
                    <p><em>Lauren Laitlin</em></p>
                    <p>contacted Sep 12, 2017</p>
                </div>
            </div>
            <div className="details-box">
                <div className="details-row">
                    <p>Career Coaching: Getting Unstuck</p>
                    <p><strong>5 tokens</strong></p>
                </div>
                <div className="details-row">
                    <p><em>Lauren Laitlin</em></p>
                    <p>contacted Sep 12, 2017</p>
                </div>
            </div>
            
        </section>
    )
  }
}

export default withRouter(MyAccount);