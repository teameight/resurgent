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
      <section className="main">
        { page && (
          <div className="content" dangerouslySetInnerHTML={{__html: this.props.page.content}}></div>
          )
        }
      </section>
    )
  }
}

export default withRouter(Page);