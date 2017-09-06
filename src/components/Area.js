import React from 'react';
import Flickity from 'react-flickity-component';
import { withRouter } from 'react-router-dom';

const flickityOptions = {
  pageDots: false,
  groupCells: true
}

class Area extends React.Component {
	constructor() {
    super();

    this.passCatArea= this.passCatArea.bind(this);
  }


  passCatArea(slug, catId, areaId) {
  	this.props.history.push('/area/' + slug + '/' + catId);
    //this.props.passCatArea(catId, areaId);
  }

	render() {
		const { areas } = this.props;
		const { areaName } = this.props;
		return (
			<div>
				<h2 className="section-label">{areaName}</h2>
	      <div className="section-row">
	        <Flickity
	          className={"carousel"}
	          options={ flickityOptions }
	          elementType={"div"}
	        >
	          {
	            Object
	              .keys(areas)
	              .map(key => 
	                <div className="area carousel-cell" onClick={ (e) => this.passCatArea(areas[key].slug, this.props.catId, key) }>
										<img height="155" width="155" src={areas[key].image} alt={areas[key].name} />
										<h3>{areas[key].name}</h3>
						      </div>
	              )
	          }
	        </Flickity>
	      </div>
      </div>
		)
	}
}

export default withRouter(Area);