import React from 'react';
import BookContext from '../BookContext';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom'

class Result extends React.Component {

    static contextType = BookContext;

    render() {

    
    return (
        <div className="result">
            <h2>{this.props.title}</h2>
            <div>
                <Link to={`book/${this.props.id}`}>
                    <img src={this.props.src} width="200" />
                </Link>
                <div>
                    <p >Author: {this.props.author}</p>
                    <p>Publisher: {this.props.details}</p>
                    {this.props.description}
                    {/*<p onClick={() => this.context.detailsHandler(this.props.title)}>Show/Hide Details (click me)</p> */}
                </div>
            </div>
        </div>
    )
    }
}

export default withRouter(Result);