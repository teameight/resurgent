import React from 'react';
import { withRouter } from 'react-router-dom';

class Page extends React.Component {

  constructor(props) {
      super(props);

      this.processLink= this.processLink.bind(this);

  }

  processLink(e, path) {
    e.preventDefault();
    this.props.history.push(path);
  };


  render() {
    const page = this.props.page;

    return (
      <div>
        { this.props.noReg && (
          <section className="main accept-terms">
            <header>
                <h1 className="page-title">Welcome</h1>
                <p className="subtitle">Please review and accept the terms and conditions to complete your registration.</p>
            </header>
            <a href='' className="btn"  onClick={this.props.acceptTerms}>I Accept</a>
          </section>
          )
        }
        <section className="main">
          { page && (
            <div className="content" dangerouslySetInnerHTML={{__html: this.props.page.content}}></div>
            )
          }
      </section>
      </div>
    )
  }
}

export default withRouter(Page);