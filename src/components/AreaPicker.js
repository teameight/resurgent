import React from 'react';
import Area from './Area';
import firebase from '../fire';

const catRef = firebase.database().ref('categories');
let catObj = {};
let key = 1;
catRef.orderByChild('order').once('value').then(function(snapshot) {
  snapshot.forEach(function(data) {
    catObj[key] = data.val();
    catObj[key].id = data.key;
    key++;
  });
});


class AreaPicker extends React.Component {

  constructor() {
    super();

    this.filterCats = this.filterCats.bind(this);
  }

  filterCats() {
    const areas = this.props.areas;
    let catArray = [];

    Object
      .keys(areas)
      .forEach(function(area) {
        catArray.push(areas[area].category);
      });

    return catArray;
  }


  render() {
    let filterArray = this.filterCats();

    return (
      <div className="main section-areas">

        {
          Object
            .keys(catObj)
            .filter(current => filterArray.includes(catObj[current].id))
            .map(key =>
              <Area key={key} categories={this.props.categories} catId={catObj[key].id} providers={this.props.providers} />
            )
        }
      </div>
    )
  }
}

AreaPicker.contextTypes = {
  router: React.PropTypes.object
}

export default AreaPicker;