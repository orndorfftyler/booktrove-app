import React from 'react';
import Result from '../Result/Result';
import BookContext from '../BookContext';
import ReviewList from '../ReviewList/ReviewList';
import Navbar from '../Navbar/Navbar';
import './Book.css';

class Book extends React.Component {
    static contextType = BookContext;

    constructor(props) {
        super(props);
        this.state = {
            current: {},
            content:'',
            title:'',
            showHideReviewInput: 'show'
        }
    }

    updateContent(content) {
        this.setState({content: content});
    }

    updateTitle(title) {
        this.setState({title: title});
    }

    updateShowHideReviewInput(state) {
        this.setState({showHideReviewInput: state});
    }

    componentDidMount = () => {

        window.scrollTo(0,0);

    }

    showHideReview(e, bookId, title, content) {
        e.preventDefault();
        //console.log('testFunc ran');
        this.updateShowHideReviewInput('hide');
        this.context.addReview(e, bookId, title, content);
        
    }


    render() {
        let bookId = this.props.match.params.bookId;
        let current = this.context.results.find(book => book.identifier == bookId);

        let reviewUserCheck = 'book show';
        if (this.context.currentUser) {
            for (let i = 0; i < this.context.reviews.length; i++) {
                if (this.context.reviews[i]['user'] == this.context.currentUser) {
                    reviewUserCheck = 'book hide';
                }
            }
    
        } else {
            for (let i = 0; i < this.context.reviews.length; i++) {
                if (this.context.reviews[i]['user'] == localStorage.getItem('currentUser')) {
                    reviewUserCheck = 'book hide';
                }
            }
        }

        
        return (
            <div className="book-page">

                <Navbar 
                    historyProp={this.props.history}
                />

                <div className="spacer"></div>

                <Result 
                    title={current.title}
                    src={current.src}
                    author={current.author}
                    description={current.description}
                    details={current.details}
                    id={current.identifier}
                    linkify={false}
                />

                <div className={reviewUserCheck}>
                    <div className={this.state.showHideReviewInput}>
                        <form className="book" onSubmit={(e) => this.showHideReview(e, current.identifier, this.state.title, this.state.content)}>
                            <section className="prompt">
                                <h3 className="prompt">Have you read this book? What did you think?</h3>
                                <label htmlFor="title">Title</label>
                                <input  className="book" onChange={e => this.updateTitle(e.target.value)} name="title" type="text" id="title" required />

                                <label htmlFor="content">Review:</label>
                                <textarea  className="book" type="text" name="content" placeholder="Write your review here" required onChange={e => this.updateContent(e.target.value)}>
                                
                                </textarea>
                                <div>
                                    <button className="book" type="submit">Submit</button>
                                </div>
                            </section>
                        </form>
                    </div>
                </div>
                    {/*<section>
                        <h3>Review Name</h3>
                        <p>{JSON.stringify(this.context.reviews)}</p>
                        <p>current user: {this.context.currentUser}</p>
                    </section>*/}
                    
                    {/* use this.context.reviews to generate review list*/}

                    <ReviewList 
                        reviews={this.context.reviews}
                        currentBook={current}
                        historyProp={this.props.history}
                    />
                    {/*<section>
                        <h3>Placeholder Review</h3>
                        <p>This is where reviews will go</p>
                        <p>8 people found this helpful</p>
                    </section>*/}
                    
                <div className="spacer"></div>
            </div>
        );
    }
}

export default Book;