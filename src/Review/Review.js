import React from 'react';
import BookContext from '../BookContext';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom'

class Review extends React.Component {

    static contextType = BookContext;

    /*
    //tried this to fix refresh not working (didn't fix it)
    goToBook = (bookId) => {
        this.props.history.push({
        pathname: `/book/${bookId}`,
        state: { bookId: `${bookId}` }
    });
    }
    //add to an element:
    onClick={() => this.goToBook(this.props.id)}

    */

    render() {

    return (
        <div className="result">
            <h2>{this.props.title}</h2>
            <div>
                <div>
                    <p>{this.props.contents}</p>
                    <p>{this.props.helpCount} people found this helpful</p>
                    <button type="submit" onClick={(e) => this.context.helpCountIncrease(e, this.props.reviewId)}>This review was helpful </button>
                </div>
            </div>
        </div>
    )
    }
}

export default withRouter(Review);