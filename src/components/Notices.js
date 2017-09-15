import React from 'react';

class Notices extends React.Component {

  constructor() {
    super();

    this.handleCloseNotice = this.handleCloseNotice.bind(this);

  }

  handleCloseNotice(){
    this.props.handleCloseNotice(this.props.id);
  }

  render() {
  	const notice = this.props.notice
    // console.log(this.props.id);
    let itemClass="notice "+notice.type;

    return (
      <div className={itemClass}>
        <p>{notice.message}</p>
        <button type="button" className="tcon tcon-remove" aria-label="remove item"  onClick={this.handleCloseNotice}>
          <span className="tcon-visuallyhidden">Close</span>
        </button>
      </div>
    )
  }
}

export default Notices;