import React from 'react';
import Review from '../Review/Review';


class ReviewList extends React.Component {

    render() {
    const reviews = this.props.reviews.map((review) => {
        return (

        <Review 
            key={review.reviewId}
            reviewId={review.reviewId}
            bookId={review.bookId}
            title={review.title}
            contents={review.contents}
            helpCount={review.helpCount}
        />
        )
    } )
    console.log(this.props.reviews);
    console.log(reviews);

    return (
        <>
        {reviews}
        </>
    )
    }
}

export default ReviewList;