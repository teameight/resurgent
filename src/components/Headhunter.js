import React from 'react';
import Flickity from 'react-flickity-component';
import firebase from '../fire';

const flickityOptions = {
  pageDots: false
}

class Headhunter extends React.Component {

  constructor() {
    super();
    this.state = {
      card: false,
      category: null,
      area: null,
      provider: null,
      formValues: {name:''},
      providersObj: {}
    };

    this.flipCard= this.flipCard.bind(this);
  }


  componentWillMount() {
    let providersObj = {};
    let key = 1;
    let that = this;

    const providersRef = firebase.database().ref('providers');
    providersRef.orderByChild('order').once('value').then(function(snapshot) {
      snapshot.forEach(function(data) {
        providersObj[key] = data.val();
        providersObj[key].id = data.key;
        key++;
      });
    }).then(function(){
      that.setState({
        providersObj:providersObj
      });
    });

  }

  componentWillUnmount () {
    this.props.clearNotices();
  }

  flipCard(keyId) {
    var card = !this.state.card;
    this.setState({ card: card });
  }

  processLink(e, path) {
    e.preventDefault();
    this.props.history.push(path);
  }

  render() {

    const catId = this.props.location.state.catId;
    const areaId = this.props.location.state.areaId;
    let pId = this.state.provider;

    let pcheck = (Object.keys(this.state.providersObj).length !== 0);
    const providersObj = this.state.providersObj;

    console.log(providersObj, pId);

    const user = this.props.user;

    let pName = '';
    let pCost = '';
    let pCat = '';
    let pArea = this.props.areas[areaId].name;

    if(pId && pcheck){
      var provider = providersObj[pId];

      pName = provider.name;
      pCat = this.props.categories[catId].name;

    }
    let pClass = 'provider';
    if(this.state.card){
      pClass += ' flipped';
    }


    return (
      <div>
          <h1 className="area-title">{pArea}</h1>
          {
            pcheck && (
            <Flickity
              className="providers"
              options={ flickityOptions }
            >
            <div className={pClass}>
              <div className="front">
                <div className="profile-img">
                  <img src={provider.image} alt={pName} />
                </div>
                {/* <a className="video-link" src="#" title="Play Video"></a> TODO: video */}
                <h1 className="provider-name">{provider.name}</h1>
                <div className="bio">
                  <p>{provider.desc}</p>
                </div>
                <a href="#" onClick={ (e) => this.flipCard(e) } className="bio-handle">Read More</a>
              </div>
              <div className="back">
                <div className="back-inner">
                  <h1 className="provider-name">{provider.name}</h1>
                  <p><small>bio and services</small></p>
                  <div className="bio">
                    <p>{provider.desc}</p>
                  </div>
                  <p><a className="text-link" href="#" onClick={ (e) => this.flipCard(e) }>back to profile</a></p>
                </div>
              </div>
            </div>
            </Flickity>
            )
          }
      </div>
    )
  }
}

Headhunter.contextTypes = {
  router: React.PropTypes.object
}

export default Headhunter;