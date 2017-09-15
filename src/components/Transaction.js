import React from 'react';
import { withRouter } from 'react-router-dom';
import dateFormat from 'dateformat';

class Transaction extends React.Component {

	constructor() {
		super();


	}

	render() {
		const {details} = this.props;
		const showDate = dateFormat(details.date, "mmm d, yyyy");

		const aId = details.area;
    const catId = details.category;
    let category = {};
    let area = {};
    let pId = details.provider;
    // let area = {};
    // console.log(slug);

    if(catId){
      category = this.props.categories[catId];
      const {areas} = category;
      area = areas[aId];
      var {providers} = area;
    }

    let pName = '';

    if(pId){
      var provider = providers[pId];
      if(provider){
        pName = provider.name;
      }
    }

		// console.log(details);
		return (
			<div className="details-box">
        <div className="details-row">
            <p>{category.name}: {area.name}</p>
            <p><strong>{details.cost} tokens</strong></p>
        </div>
        <div className="details-row">
            <p><em>{pName}</em></p>
            <p>contacted {showDate}</p>
        </div>
      </div>
		)
	}
}

export default withRouter(Transaction);