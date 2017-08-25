import React from 'react';
import Area from './Area';

class AreaPicker extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="main section-areas">
        <h2 className="section-label">Areas</h2>
        <div className="section-row">
          <div className="slide-wrap carousel">
            {
              Object
                .keys(this.props.areas)
                .map(key => <Area key={key} details={this.props.areas[key]} />)
            }
          </div>
        </div>
      </div>
    )
  }
}

AreaPicker.contextTypes = {
  router: React.PropTypes.object
}

export default AreaPicker;