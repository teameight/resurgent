import Flickity from 'react-flickity-component';
import React from 'react';
import Area from './Area';

const flickityOptions = {
  cellSelector: '.carousel-cell',
  pageDots: false,
  groupCells: true
}

class AreaPicker extends React.Component {

  render() {
    return (
      <div className="main section-areas">
        {/* <button onClick={this.props.loadSamples}>Load Samples</button> */}
        <h2 className="section-label">{this.props.areas1.name}</h2>
        <div className="section-row">
          <Flickity
            className={"carousel"}
            options={ flickityOptions }
            elementType={"div"}
          >
            {
              Object
                .keys(this.props.areas1)
                .map(key => <Area key={key} slug={this.props.areas1.slug} details={this.props.areas1[key]} />)
            }
          </Flickity>
        </div>
        <h2 className="section-label">{this.props.areas2.name}</h2>
        <div className="section-row">
          <Flickity
            className={"carousel"}
            options={ flickityOptions }
          >
            {
              Object
                .keys(this.props.areas2)
                .map(key => <Area key={key} slug={this.props.areas2.slug} details={this.props.areas2[key]} />)
            }
          </Flickity>
        </div>
        <h2 className="section-label">{this.props.areas3.name}</h2>
        <div className="section-row">
          <Flickity
            className={"carousel"}
            options={ flickityOptions }
          >
            {
              Object
                .keys(this.props.areas3)
                .map(key => <Area key={key} slug={this.props.areas3.slug} details={this.props.areas3[key]} />)
            }
          </Flickity>
        </div>
        <h2 className="section-label">{this.props.areas4.name}</h2>
        <div className="section-row">
          <Flickity
            className={"carousel"}
            options={ flickityOptions }
          >
            {
              Object
                .keys(this.props.areas4)
                .map(key => <Area key={key} slug={this.props.areas4.slug} details={this.props.areas4[key]} />)
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