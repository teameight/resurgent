import React from 'react';
import Flickity from 'react-flickity-component';
import { withRouter } from 'react-router-dom';
import firebase from '../fire';

const flickityOptions = {
  pageDots: false,
  groupCells: true
}

const areaRef = firebase.database().ref('areas');
let areaObj = {};
let key = 1;
areaRef.orderByChild('order').once('value').then(function(snapshot) {
	snapshot.forEach(function(data) {
		areaObj[key] = data.val();
		areaObj[key].id = data.key;
		key++;
	});
});

class Area extends React.Component {
	constructor() {
    super();

    this.passCatArea= this.passCatArea.bind(this);
  }


  passCatArea(slug, catId, areaId) {
  	this.props.history.push('/area/' + slug, { catId: catId, areaId: areaId });
    //this.props.passCatArea(catId, areaId);
  }

	render() {
		const categories = this.props.categories;
		const catId = this.props.catId;
		const categoryName = categories[catId].name;


		return (
			<div>
				<h2 className="section-label">{categoryName}</h2>
	      <div className="section-row">
	        <Flickity
	          className={"carousel"}
	          options={ flickityOptions }
	          elementType={"div"}
	        >
	          {
	            Object
	              .keys(areaObj)
	              .filter((current) => areaObj[current].category === this.props.catId)
	              .map(key =>
	                <div key={key} className="area carousel-cell" onClick={ (e) => this.passCatArea(areaObj[key].slug, this.props.catId, areaObj[key].id) }>
										<img height="155" width="155" src={areaObj[key].image} alt={areaObj[key].name} />
										<h3>{areaObj[key].name}</h3>
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