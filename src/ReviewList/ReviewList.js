import React from 'react';
import Review from '../Review/Review';


class ReviewList extends React.Component {

    render() {

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
    } )

    return (
        <>
        {reviews2}
        </>
    )
    }
}

export default ReviewList;