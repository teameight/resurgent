import React from 'react';
import { withRouter } from 'react-router-dom';

class EditAccount extends React.Component {
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
      <section className="main edit-account">
          <header>
              <h1 className="page-title">Edit My Account</h1>
          </header>
          <form>
              <input name="username" type="text" placeholder="username" />
              <input name="email" type="email" placeholder="e-mail" />
              <input name="password" type="text" placeholder="password" />
              <input className="btn" onClick={() => this.props.history.push('/my-account')} type="submit" value="Save" />
              <p><a href="#" onClick={  (e) => this.processLink(e, '/my-account') }>cancel</a></p>
          </form>
      </section>
    )
  }
}

export default withRouter(EditAccount);