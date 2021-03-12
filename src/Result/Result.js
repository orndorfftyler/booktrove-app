import React from 'react';
import BookContext from '../BookContext';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom'
import './Result.css';

class Result extends React.Component {

    static contextType = BookContext;
    constructor(props) {
        super(props);
        this.state = {
            desc: this.props.description ? this.props.description.split(' ').slice(0,50).join(' ') : '',
            buttonLabel:'More'
        }
    }



    showHideDesc() {
        if (this.state.desc && this.state.desc.split(' ').length <= 50) {
            this.setState({
                desc:this.props.description,
                buttonLabel: 'Less'
            })
        } else if (this.state.desc && this.state.desc.split(' ').length > 50) {
            this.setState({
                desc:this.props.description.split(' ').slice(0,50).join(' '),
                buttonLabel: 'More'
            })
        }

    }

    render() {

        let buttonVersion = '';
        if (this.props.description.split(' ').length > 50) {
            buttonVersion = (
                <button className="showHide" type="button" onClick={() => this.showHideDesc()}>{this.state.buttonLabel}</button>
            );
        } 

        let descText = this.state.desc;
        if (this.props.description.split(' ').length > 50 && this.state.desc.split(' ').length <= 50) {
            descText = this.state.desc + '...'
        } 

        let resultVersion = (
            <section className="result">
            <Link onClick={() => this.context.getReviews(this.props.id)} to={`book/${this.props.id}`}><h2>{this.props.title}</h2></Link>
                <div className="picdesc">
                    <Link onClick={() => this.context.getReviews(this.props.id)} to={`book/${this.props.id}`}>
                        <img src={this.props.src} width="200" />
                    </Link>
                    <div className="desc">
                        <p>Author: {this.props.author.join(', ')}</p>
                        {/*<p>Publisher: {this.props.details}</p>*/}
                        <p>{descText}</p>
                        {/*<p onClick={() => this.context.detailsHandler(this.props.title)}>Show/Hide Details (click me)</p> */}
                        {buttonVersion}
                    </div>
                </div>
            </section>
            
        );
        if (this.props.linkify == false) {
            resultVersion = (
            <section className="result">
            <h2>{this.props.title}</h2>
                <div className="picdesc">
                        <img src={this.props.src} width="200" />
                    <div className="desc">
                    <p>Author: {this.props.author.join(' ')}</p>
                        {/*<p>Publisher: {this.props.details}</p>*/}
                        <p>{descText}</p>
                        {/*<p onClick={() => this.context.detailsHandler(this.props.title)}>Show/Hide Details (click me)</p> */}
                        {buttonVersion}
                    </div>
                </div>
            </section>
            )
        }
    
    return (
        <>
        {resultVersion}
        </>
    )
    }
}

export default withRouter(Result);