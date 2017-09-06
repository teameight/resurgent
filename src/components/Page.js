import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';

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
    // const { profile } = this.state;

    // let zoneClass = 'modal-zones ';
    // zoneClass += 'm-zone-' + this.state.zone;

    return (
        <section className="main">
          <div className="content" dangerouslySetInnerHTML={{__html: this.props.page.content}}></div>
        </section>
    )
  }
}

export default withRouter(Page);