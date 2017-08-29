import React from 'react';
import Area from './Area';
import Flickity from 'react-flickity-component';

    const flickityOptions = {
      cellSelector: '.carousel-cell',
      pageDots: false
    }

class AreaPicker extends React.Component {

  render() {
    return (
      <div className="main section-areas">
        {/* <button onClick={this.props.loadSamples}>Load Samples</button> */}
        <h2 className="section-label">Career Coaching</h2>
        <div className="section-row">
          <Flickity
            className={"carousel"}
            options={ flickityOptions }
          >
            {
              Object
                .keys(this.props.areas1)
                .map(key => <Area key={key} details={this.props.areas1[key]} />)
            }
          </Flickity>
        </div>
        <h2 className="section-label">Written &amp; Online Word</h2>
        <div className="section-row">
          <Flickity
            className={"carousel"}
            options={ flickityOptions }
          >
            {
              Object
                .keys(this.props.areas2)
                .map(key => <Area key={key} details={this.props.areas2[key]} />)
            }
          </Flickity>
        </div>
        <h2 className="section-label">Nuts &amp; Bolts</h2>
        <div className="section-row">
          <Flickity
            className={"carousel"}
            options={ flickityOptions }
          >
            {
              Object
                .keys(this.props.areas3)
                .map(key => <Area key={key} details={this.props.areas3[key]} />)
            }
          </Flickity>
        </div>
        <h2 className="section-label">Hey It's Personal</h2>
        <div className="section-row">
          <Flickity
            className={"carousel"}
            options={ flickityOptions }
          >
            {
              Object
                .keys(this.props.areas4)
                .map(key => <Area key={key} details={this.props.areas4[key]} />)
            }
          </Flickity>
        </div>
      </div>
    )
  }
}

AreaPicker.contextTypes = {
  router: React.PropTypes.object
}

export default AreaPicker;