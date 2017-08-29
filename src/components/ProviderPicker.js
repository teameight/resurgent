import React from 'react';
import Provider from './Provider';
import Flickity from 'react-flickity-component';

class ProviderPicker extends React.Component {

  constructor() {
    super();
  }

  render() {
    // Get the slug
    const slug = this.props.match.params.slug;

    return (
      <div>
        <h1 className="area-title">Area Title</h1>
        <p className="area-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis quaerat a eaque excepturi fuga consectetur aperiam neque corrupti molestiae aut totam et laborum nesciunt ipsam, repellendus consequatur. Provident, neque, debitis!</p>
          <Flickity
            className="providers"
          >
          {
            Object
              .keys(this.props.providers)
              .map(key => this.props.providers[key].area == slug && <Provider key={key} details={this.props.providers[key]} />)
          }
          </Flickity>
      </div>
    )
  }
}

ProviderPicker.contextTypes = {
  router: React.PropTypes.object
}

export default ProviderPicker;