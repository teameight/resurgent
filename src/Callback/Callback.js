import React, { Component } from 'react';

class Callback extends Component {
  render() {
    return (
      <div>
        Loading
        { alert('callback') }
      </div>
    );
  }
}

export default Callback;