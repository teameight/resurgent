import React from 'react';
import Provider from './Provider';

class ProviderPicker extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="provider-picker">
        {
          Object
            .keys(this.props.providers)
            .map(key => <Provider key={key} details={this.props.providers[key]} />)
        }
      </div>
    )
  }
}

ProviderPicker.contextTypes = {
  router: React.PropTypes.object
}

export default ProviderPicker;