import React from 'react';
import { withRouter } from 'react-router-dom';

class BookSession extends React.Component {

  constructor() {
    super();

    this.handleSend = this.handleSend.bind(this);
  }

  handleSend = function(e) {
    e.preventDefault();
    const user = this.props.users;
    const tokens = user.tokens;
    console.log(tokens);
    user.tokens = tokens - 5;

    this.setState({
      users: user
    });

    this.props.history.push('/book-confirm');
  }

  render() {

    return (
      <section className="main">
          <header>
              <h1 className="page-title">Book A Session</h1>
          </header>
          <div className="form-intro">
              <p className="messaging"><strong>Messaging:</strong> [Provider Name]</p>
              <p>[Section Label]: [Area Label] <strong>([x] tokens)</strong></p>
          </div>
          <form>
              <input name="subject" type="text" placeholder="Subject" />
              <textarea name="message" rows="12" cols="50">[Provider Name],

Default form letter text. Lorem ipsum dolor sit amet.

Thanks,
[user name]
              </textarea>
              <input className="btn" onClick={this.handleSend} type="submit" value="Send" />
          </form>
      </section>
    )
  }
}

export default withRouter(BookSession);