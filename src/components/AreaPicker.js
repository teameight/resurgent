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

  render() {
    return (
      <div className="main section-areas">

        {
          Object
            .keys(catObj)
            .map(key =>
              <Area key={key} categories={this.props.categories} catId={catObj[key].id} />
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