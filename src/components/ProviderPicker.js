import React from 'react';
import Provider from './Provider';

class ProviderPicker extends React.Component {

  constructor() {
    super();
  }

  render() {

    const slug = this.props.match.params.slug;

    return (
      <div className="provider-picker">
        {
          Object
            .keys(this.props.providers)
            .filter(function(thisSlug) {
              thisSlug => thisSlug === slug
            })
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