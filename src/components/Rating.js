import React from 'react';
import { withRouter } from 'react-router-dom';

class Rating extends React.Component {

  constructor(props) {
      super(props);
      this.processLink= this.processLink.bind(this);
  }

  processLink(e, path) {
    e.preventDefault();
    this.props.history.push(path);
  }


  render() {

    return (
      <section className="main read-ratings">
            <header>
                <p className="subtitle">[Provider Name]'s</p>
                <h1 className="page-title">Ratings & Reviews</h1>
                <a href="#" onClick={  (e) => this.processLink(e, '/write-review')}>write a review</a>
            </header>
            <hr />
            <div className="stars-static" data-stars="https://codepen.io/ekeric13/project/editor/DkJYpA">
                <div className="stars-static-top" style={{width: '87%'}}>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                </div>
                <div className="stars-static-bottom">
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                </div>
            </div>
            <p><em>(5 user ratings)</em></p>
            <hr />
            <article className="review">
                <h1>Sample user review 1</h1>
                <p>Vestibulum volutpat, enim vel tempus finibus, velit odio mattis sem, vel luctus arcu velit ut elit. Sed non cursus sem, eget iaculis massa. Nam sit amet risus et ligula eleifend laoreet ut in neque. Proin sed maximus nibh. Donec vel rhoncus lectus. Sed porttitor quam et risus varius finibus fermentum et dolor...</p>
                <a className="readmore" href="#">Read More</a>
            </article>
            <article className="review">
                <h1>Sample user review 2</h1>
                <p>Vestibulum volutpat, enim vel tempus finibus, velit odio mattis sem, vel luctus arcu velit ut elit. Sed non cursus sem, eget iaculis massa. Nam sit amet risus et ligula eleifend laoreet ut in neque. Proin sed maximus nibh. Donec vel rhoncus lectus. Sed porttitor quam et risus varius finibus fermentum et dolor...</p>
                <a className="readmore" href="#">Read More</a>
            </article>
            <article className="review">
                <h1>Sample user review 3</h1>
                <p>Vestibulum volutpat, enim vel tempus finibus, velit odio mattis sem, vel luctus arcu velit ut elit. Sed non cursus sem, eget iaculis massa. Nam sit amet risus et ligula eleifend laoreet ut in neque. Proin sed maximus nibh. Donec vel rhoncus lectus. Sed porttitor quam et risus varius finibus fermentum et dolor...</p>
                <a className="readmore" href="#">Read More</a>
            </article>
            <article className="review">
                <h1>Sample user review 4</h1>
                <p>Vestibulum volutpat, enim vel tempus finibus, velit odio mattis sem, vel luctus arcu velit ut elit. Sed non cursus sem, eget iaculis massa. Nam sit amet risus et ligula eleifend laoreet ut in neque. Proin sed maximus nibh. Donec vel rhoncus lectus. Sed porttitor quam et risus varius finibus fermentum et dolor...</p>
                <a className="readmore" href="#">Read More</a>
            </article>

        </section>
    )
  }
}

export default withRouter(Rating);