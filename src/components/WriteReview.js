import React from 'react';
import { withRouter } from 'react-router-dom';
import RatingStars from './RatingStars';

class WriteReview extends React.Component {
  render() {

    return (
      <section className="main write-review">
            <header>
                <p className="subtitle">leave a review for</p>
                <h1 className="page-title">[Provider Name]</h1>
                <RatingStars />
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