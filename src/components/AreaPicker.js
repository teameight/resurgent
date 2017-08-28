import React from 'react';
import Area from './Area';
import Flickity from 'react-flickity-component';

    const flickityOptions = {
      cellSelector: '.carousel-cell',
      pageDots: false
    }

class AreaPicker extends React.Component {

  render() {

    const areas =
      Object.keys(this.props.areas)
      .map(key => <Area key={key} details={this.props.areas[key]} />);

    const areaOne =
      areas.filter( function(el) {
        return el.props.details.category === 'Career Coaching';
      });

      for ( var prop in areaOne ) {
        if ( areaOne.hasOwnProperty(prop)) {
          console.log(`areaOne.${prop} = ${areaOne[prop]}`);
        }
      }

    // console.log(areaOne);

    return (
      <div className="main section-areas">
        <h2 className="section-label">Areas</h2>
        <div className="section-row">
          <Flickity
            className={"carousel"}
            options={ flickityOptions }
          >
            {
              Object
                .keys(this.props.areas)
                .map(key => <Area key={key} details={this.props.areas[key]} />)
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