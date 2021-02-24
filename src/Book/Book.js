import React from 'react';
import Result from '../Result/Result';
import BookContext from '../BookContext';
import ReviewList from '../ReviewList/ReviewList';
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

    componentDidMount = () => {
    
        /*
        fetch('https://obscure-peak-49376.herokuapp.com/api/folders')
          .then(res => {
            if (res.ok) {
              return res.json()
            }
            throw new Error(res.status)
          })
          .then(resJson =>
            
            this.setState({
              folders: resJson
            })
            
            )
          .catch(error => console.log({ error }))
          */
         

    }

    showHideReview(e, current, title, content) {
        e.preventDefault();
        //console.log('testFunc ran');
        this.setState({showHideReviewInput: 'hidden'});
        this.context.addReview(e, current, title, content)
        
    }

    render() {
        /*
        if (!this.state.current) {
            console.log('resetting this.state.current')
            let bookId = this.props.match.params.bookId;
            let current = this.context.results.find(book => book.identifier == bookId);
            this.setState({current: current});
        }
        */
        let bookId = this.props.match.params.bookId;
        let current = this.context.results.find(book => book.identifier == bookId);
        //console.log(JSON.stringify(bookId));
        //console.log(this.context.results);
        
        return (
            <div className="look">
                <nav role="navigation">Nav
                <button type="submit">Log Out</button>
                </nav>
                <main role="main">
                    <Result 
                        title={current.title}
                        src={current.src}
                        author={current.author}
                        description={current.description}
                        details={current.details}
                        id={current.identifier}
                    />

            <div className={this.state.showHideReviewInput}>
                    <form onSubmit={(e) => this.showHideReview(e, current.identifier, this.state.title, this.state.content)}>
                        <section className="form-section overview-section">
                            <h3>Read this book? What did you think?</h3>
                            <label htmlFor="title">Title</label>
                            <input onChange={e => this.updateTitle(e.target.value)} name="title" type="text" id="title" required />

                            <label htmlFor="content">Review:</label>
                            <textarea type="text" name="content" placeholder="Write your review here" required onChange={e => this.updateContent(e.target.value)}>
                            
                            </textarea>

                            <button  type="submit">Submit</button>
                        </section>
                    </form>
            </div>
                    <section>
                        <h3>Review Name</h3>
                        <p>{JSON.stringify(this.context.reviews)}</p>
                        <p>Awesome and worth reading...</p>
                        <p>9 people found this helpful</p>
                        <button type="submit">This review was helpful</button>
                    </section>
                    
                    {/* use this.context.results to generate review list*/}

                    <ReviewList 
                        reviews={this.context.reviews}
                        currentBook={current}
                        historyProp={this.props.history}
                    />
                    <section>
                        <h3>Review Name</h3>
                        <p>Kinda meh...</p>
                        <p>8 people found this helpful</p>
                        <button type="submit">This review was helpful</button>
                    </section>

                    <section>
                        <h3>Review Name</h3>
                        <p>Review content</p>
                        <p>7 people found this helpful</p>
                        <button type="submit">This review was helpful</button>
                    </section>

                    <section>
                        <h3>Review Name</h3>
                        <p>Review content</p>
                        <p>6 people found this helpful</p>
                        <button type="submit">This review was helpful</button>
                    </section>
                    
                </main>

            </div>
        );
    }
}

export default Book;