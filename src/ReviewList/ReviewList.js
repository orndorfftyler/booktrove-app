import React from 'react';
import Review from '../Review/Review';

class ReviewList extends React.Component {

    render() {

    console.log(`this.context.reviews: ${this.props.reviews}`)
    let reviews = this.props.reviews.filter(review => review.bookId == this.props.currentBook.identifier);
    let reviews1 = reviews.reverse();
    let reviews2 = reviews1.map(review => {
        return (

        <Review 
            key={review.reviewId}
            reviewId={review.reviewId}
            bookId={review.bookId}
            title={review.title}
            contents={review.contents}
            helpCount={review.helpCount}
            user={review.user}
            historyProp={this.props.historyProp}
        />
        )
    } );

    let title = '';
    if (reviews.length >= 1) {
        title = <p className="reviewList">Reviews:</p>
    }

    return (
        <>
        {title}
        {reviews2}
        </>
    )
    }
}

export default ReviewList;