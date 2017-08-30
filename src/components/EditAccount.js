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

    const user = this.props.users;

    return (
      <section className="main edit-account">
          <header>
              <h1 className="page-title">Edit My Account</h1>
          </header>
          <form>
              <input name="username" type="text" placeholder="new username" />
              <input name="email" type="email" placeholder="new e-mail" />
              <input name="password" type="text" placeholder="new password" />
              <input className="btn" onClick={() => this.props.history.push('/my-account')} type="submit" value="Save" />
              <p><a href="#" onClick={  (e) => this.processLink(e, '/my-account') }>cancel</a></p>
          </form>
      </section>
    )
  }
}

export default withRouter(EditAccount);