import React from 'react';
import BookContext from '../BookContext';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom'
import TokenService from '../services/token-service';
import './Review.css';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


class Review extends React.Component {

    static contextType = BookContext;

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            title: this.props.title,
            contents: this.props.contents,
            showHideHelpful: 'show',
            helpfulCount: 0,
            helpfulData: [],
            alreadyHelp: false
        }
    }

    editOn(e) {
        e.preventDefault();
        this.setState({edit:true});
        
    }

    editOff() {
        this.setState({edit:false});
    }
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

    updateContent(content) {
        this.setState({contents: content});
    }

    updateTitle(title) {
        this.setState({title: title});
    }

    componentDidMount() {
        this.getHelpfulPerReview(this.props.reviewId);
    }


    helpCountIncrease = (e) => {
            
        e.preventDefault();
        
        let newHelp = {
            book_id: this.props.bookId,
            user_id: this.props.user,
            review_id: this.props.reviewId
        }
        //console.log(`newHelp: ${JSON.stringify(newHelp)}`)
        //console.log(`this.context.reviews: ${JSON.stringify(this.context.reviews)}`)
        
        fetch(`${API_BASE_URL}/helpfulreview/${this.props.reviewId}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(newHelp)
        })
            .then(res => {
                if (res.ok) {
                return res.json()
                }
                throw new Error(res.status)
            })
            .then(data => {
                this.getHelpfulPerReview(this.props.reviewId);
                //this.setState({alreadyHelp: true});
        
            })
            .catch(error => {
                console.error(error)
            })
    }

    alreadyHelpCheck() {
        for (let i = 0; i < this.state.helpfulData.length; i++) {
            if (this.props.user == this.state.helpfulData[i]['user_id']) {
                this.setState({alreadyHelp: true});
            }
            //console.log(`this.state.helpfulData[i]['user_id'] : ${this.state.helpfulData[i]['user_id']}`)
        }

        //console.log(`this.props.user: ${this.props.user}`)
        //console.log(`this.state.helpfulData: ${JSON.stringify(this.state.helpfulData)}`)
        //console.log(`this.state.alreadyHelp: ${this.state.alreadyHelp}`)
    }

    getHelpfulPerReview = (reviewId) => {
        fetch(`${API_BASE_URL}/helpfulreview/${reviewId}`, {
            headers: {
            'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res => {
            if (res.ok) {
                return res.json()
            }
            throw new Error(res.status)
            })
            .then(resJson => 
                {
                this.setState({
                    helpfulCount: resJson.length,
                    helpfulData: resJson
                });
                this.alreadyHelpCheck();
            }
            )
             
            
            .catch(error => console.log({ error }))
            }



    render() {
        let people = 'people';
        if (this.state.helpfulCount == 1) {
            people = 'person';
        }

        let helpfulButton = this.state.alreadyHelp 
            ? <p></p>
            : <button className="helpful" type="submit" onClick={(e) => this.helpCountIncrease(e)}>This review was helpful </button>

        let resultContents = (
            <div className="review">
                <h2>{this.props.title}</h2>
                <div>
                    <div>
                        <p>{this.props.contents}</p>
                        <p className="helpful">{this.state.helpfulCount} {people} found this helpful</p>
                        {/*<p>this.props.user: {this.props.user}</p>*/}
                        {helpfulButton}
                    </div>
                </div>
            </div>

        );

        if (this.context.currentUser == this.props.user || localStorage.getItem('currentUser') == this.props.user) {
            resultContents = (
                <div className="review">
                    <h2>{this.props.title}</h2>
                    <div>
                        <div>
                            <p>{this.props.contents}</p>
                            <p className="helpful">{this.state.helpfulCount} {people} found this helpful</p>
                            <button  className="edit" type="submit" onClick={(e) => this.editOn(e)}>Edit</button>
                            <button  className="edit" type="submit" onClick={(e) => this.context.deleteReview(e, this.props.reviewId, this.props.bookId)}>Delete</button>
                        </div>
                    </div>
                </div>
            );
            }

        if (this.state.edit == true) {
            resultContents = (
                <form className="edit" onSubmit={(e) => this.editReviewHideInput(e/*, this.props.reviewId, this.state.title, this.state.content*/)}>
                    <section>
                        <h2>{this.props.title}</h2>
                        <label htmlFor="title">Title</label>
                        <input className="edit" onChange={e => this.updateTitle(e.target.value)} name="title" type="text" id="title" defaultValue={this.state.title} required />

                        <label htmlFor="content">Review:</label>
                        <textarea className="edit" onChange={e => this.updateContent(e.target.value)} type="text" name="content" placeholder="Write your review here" defaultValue={this.state.contents} required >
                        
                        </textarea>
                        <div>
                            <button  className="edit" type="submit">Submit</button>
                            <button  className="edit" type="button" onClick={() => this.editOff()}>Cancel</button>
                        </div>
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