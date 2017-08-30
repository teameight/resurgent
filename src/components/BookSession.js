import React from 'react';
import { withRouter } from 'react-router-dom';

class BookSession extends React.Component {

  constructor() {
    super();

    this.handleSend = this.handleSend.bind(this);
  }

  handleSend = function(e, pTokens) {
    e.preventDefault();
    const user = this.props.users;
    const tokens = user.tokens;
    //console.log(tokens);
    user.tokens = tokens - pTokens;

    this.setState({
      users: user
    });

    this.props.history.push('/book-confirm');
  }

  render() {

    const user = this.props.users;
    const pId = this.props.selectedProvider;
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
      </section>
    )
  }
}

export default withRouter(BookSession);