import React from 'react';
import Area from './Area';
import firebase from '../fire';


class AreaPicker extends React.Component {

  constructor() {
    super();

    this.state = {
      catObj: {}
    }

    this.filterCats = this.filterCats.bind(this);
  }


  componentWillMount() {
    let catObj = {};
    let key = 1;
    let that = this;

    const catRef = firebase.database().ref('categories');
    catRef.orderByChild('order').once('value').then(function(snapshot) {
      snapshot.forEach(function(data) {
        catObj[key] = data.val();
        catObj[key].id = data.key;
        key++;
      });
    }).then(function(){
      that.setState({
        catObj:catObj
      });
    });

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
    let catcheck = (Object.keys(this.state.catObj).length !== 0);
    const catObj = this.state.catObj;

    return (
      <div className="main section-areas">

        {
          catcheck && (
            Object
            .keys(catObj)
            .filter(current => filterArray.includes(catObj[current].id))
            .map(key => 
              <Area key={key} categories={this.props.categories} catId={catObj[key].id} providers={this.props.providers} />
            )
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