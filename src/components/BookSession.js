import React from 'react';
import { withRouter } from 'react-router-dom';

class BookSession extends React.Component {
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
              <input className="btn" onClick={() => this.props.history.push('/book-confirm')} type="submit" value="Send" />
          </form>
      </section>
    )
  }
}

export default withRouter(BookSession);