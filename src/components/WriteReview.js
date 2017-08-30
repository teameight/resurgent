import React from 'react';
import { withRouter } from 'react-router-dom';

class WriteReview extends React.Component {
  render() {

    return (
      <section className="main write-review">
            <header>
                <p className="subtitle">leave a review for</p>
                <h1 className="page-title">[Provider Name]</h1>
                <div className="stars-static" data-stars="https://codepen.io/ekeric13/project/editor/DkJYpA"><span>&#9733; </span><span>&#9733; </span><span>&#9733; </span><span>&#9733; </span><span>&#9734; </span></div>
            </header>


            <p className="instruction">Write an optional review here. Your name will be kept anonymous.</p>
            <form>
                <input name="headline" type="text" placeholder="Your review headline" />
                <textarea name="message" rows="12" cols="50" placeholder="Write your review here"></textarea>
                <input className="btn" value="Submit Review" onClick={() => this.props.history.go(-2)} />
            </form>
            
        </section>
    )
  }
}

export default withRouter(WriteReview);