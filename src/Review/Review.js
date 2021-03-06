import React from 'react';
import BookContext from '../BookContext';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom'

class Review extends React.Component {

    static contextType = BookContext;

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            title: this.props.title,
            contents: this.props.contents
        }
    }

    editOn(e) {
        e.preventDefault();
        this.setState({edit:true});
        
    }

    editOff() {
        this.setState({edit:false});
    }
/*
    patchHelper() {
        return {
            reviewId: this.props.reviewId,
            bookId: this.props.bookId,
            title: this.state.title,
            contents: this.state.contents,
            helpCount: this.props.helpCount
          }
    }
*/
    editReviewHideInput(e/*, reviewId, title, content*/) {
        e.preventDefault();
        this.setState({edit:false});

        this.context.patchReview(e, 
            {
                reviewId: this.props.reviewId,
                bookId: this.props.bookId,
                title: this.state.title,
                contents: this.state.contents,
                helpCount: this.props.helpCount
            }
        );
    }

    helpCountIncrease(e) {
        this.context.patchReview(e, 
            {
                reviewId: this.props.reviewId,
                bookId: this.props.bookId,
                title: this.state.title,
                contents: this.state.contents,
                helpCount: this.props.helpCount + 1
            }
        );
    }

    updateContent(content) {
        this.setState({contents: content});
    }

    updateTitle(title) {
        this.setState({title: title});
    }

    render() {

        let resultContents = (
            <div className="result">
                <h2>{this.props.title}</h2>
                <div>
                    <div>
                        <p>{this.props.contents}</p>
                        <p>{this.props.helpCount} people found this helpful</p>
                        <p>this.props.user: {this.props.user}</p>
                        <button type="submit" onClick={(e) => this.helpCountIncrease(e)}>This review was helpful </button>
                    </div>
                </div>
            </div>

        );

        if (this.context.currentUser == this.props.user) {
            resultContents = (
                <div className="result">
                    <h2>{this.props.title}</h2>
                    <div>
                        <div>
                            <p>{this.props.contents}</p>
                            <p>{this.props.helpCount} people found this helpful</p>
                            <button type="submit" onClick={(e) => this.editOn(e)}>Edit</button>
                            <button type="submit" onClick={(e) => this.context.deleteReview(e, this.props.reviewId, this.props.bookId)}>Delete</button>
                        </div>
                    </div>
                </div>
            );

        }

        if (this.state.edit == true) {
            resultContents = (
                <form onSubmit={(e) => this.editReviewHideInput(e/*, this.props.reviewId, this.state.title, this.state.content*/)}>
                    <section className="form-section overview-section">
                        <h2>{this.props.title}</h2>
                        <label htmlFor="title">Title</label>
                        <input onChange={e => this.updateTitle(e.target.value)} name="title" type="text" id="title" defaultValue={this.state.title} required />

                        <label htmlFor="content">Review:</label>
                        <textarea onChange={e => this.updateContent(e.target.value)} type="text" name="content" placeholder="Write your review here" defaultValue={this.state.contents} required >
                        
                        </textarea>

                        <button  type="submit">Submit</button>
                        <button  type="button" onClick={() => this.editOff()}>Cancel</button>
                    </section>
                </form>
            );
        }
        

        return (
            <>
            {/*<p>{this.state.edit.toString()}</p>
            <p>User:{this.context.currentUser}</p>
            <p>Review author user:{this.props.user}</p>*/}
            {resultContents}
            </>
        )
    }
}

export default withRouter(Review);