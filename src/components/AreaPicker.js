import React from 'react';
import Area from './Area';
import Flickity from 'react-flickity-component';
import firebase from '../fire';

const flickityOptions = {
  pageDots: false,
  groupCells: true
}

const catRef = firebase.database().ref('categories');
let catObj = {};
const categories = catRef.orderByChild('order').once('value').then(function(snapshot) {
          snapshot.forEach(function(data) {
            catObj[data.key] = data.val();
          });
        });

console.log(catObj);


class AreaPicker extends React.Component {

  render() {
    const cats = this.props.categories;

    return (
      <div className="main section-areas">

        {
          // {this.props.categories.category1.areas.map((item, index) => (
          //   <div className="area carousel-cell" key={index} onClick={() => this.props.history.push('/providers/' + details.slug)}>
          //     <img src={item.image} alt={item.name} />
          //     <h3>{item.name}</h3>
          //   </div>
          // ))}
          Object
            .keys(cats)
            .map(key =>
              <Area key={key} catId={key} areaName={cats[key].name} areas={cats[key].areas} />
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