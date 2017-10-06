import React from 'react';
import Flickity from 'react-flickity-component';
import { withRouter } from 'react-router-dom';
import firebase from '../fire';

const flickityOptions = {
  pageDots: false,
  groupCells: true
}

class Area extends React.Component {
	constructor() {
    super();

    this.state = {
			areaObj: {}
		}

    this.passCatArea= this.passCatArea.bind(this);
    this.filterAreas = this.filterAreas.bind(this);

  }

	componentDidMount() {
		let areaObj = {};
		let key = 1;
		let filterArray = this.filterAreas();

		let that = this;
		let orderedAreas;
		const areaRef = firebase.database().ref('areas');
		areaRef.orderByChild('order').once('value')
		.then(function(snapshot) {
			snapshot.forEach(function(data) {
				areaObj[key] = data.val();
				areaObj[key].id = data.key;
				key++;
			})
		}).then(function(){
			orderedAreas = Object
        .keys(areaObj)
        .filter((current) => areaObj[current].category === that.props.catId && filterArray.includes(areaObj[current].id))
        .map(key => 
          <div key={key} className="area carousel-cell" onClick={ (e) => that.passCatArea(areaObj[key].slug, that.props.catId, areaObj[key].id) }>
						<img height="155" width="155" src={areaObj[key].image} alt={areaObj[key].name} />
						<h3>{areaObj[key].name}</h3>
		      </div>
        )
		}).then(function(){
			that.setState({
	      areaObj:orderedAreas
	    });
		});

	}

  passCatArea(slug, catId, areaId) {
  	this.props.history.push('/area/' + slug, { catId: catId, areaId: areaId });
    //this.props.passCatArea(catId, areaId);
  }

  filterAreas() {
    const providers = this.props.providers;
    let areaArray = [];

    Object
      .keys(providers)
      .forEach(function(provider) {
      	if(!providers[provider].isArchived){
	        areaArray.push(providers[provider].area);
	      }
      });

    return areaArray;
  }

	render() {
		const categories = this.props.categories;
		const catId = this.props.catId;
		const categoryName = categories[catId].name;
		let areacheck = (Object.keys(this.state.areaObj).length !== 0);
		// console.log(this.state.areaObj);


		return (
			<div>
	      	{
	      		areacheck && (
	      				<div>
			      		<h2 className="section-label">{categoryName}</h2>
			      			<div className="section-row">
		      				<Flickity
					          className={"carousel"}
					          options={ flickityOptions }
					          elementType={"div"}
					        >
					          { this.state.areaObj }
					        </Flickity>
		      			</div>
								</div>
	      			)
	      	}
      </div>
		)
	}
}

export default withRouter(Area);