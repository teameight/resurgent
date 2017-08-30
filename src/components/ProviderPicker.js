import React from 'react';
import Provider from './Provider';
import Flickity from 'react-flickity-component';

const flickityOptions = {
  pageDots: false
}

class ProviderPicker extends React.Component {

  constructor() {
    super();
    this.passProvider= this.passProvider.bind(this);
  }

  passProvider(keyId) {
    this.props.selectProvider(keyId);
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
            options = { flickityOptions }
          >
          {
            Object
              .keys(this.props.providers)
              .map(key => this.props.providers[key].area == slug && <Provider passProvider={this.passProvider} keyId={key} details={this.props.providers[key]} />)
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