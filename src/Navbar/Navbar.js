import React from 'react';
import { Link } from 'react-router-dom';
import BookContext from '../BookContext';

export default class Nav extends React.Component {
    static contextType = BookContext;
/*
    logout(e) {
        e.preventDefault();
        this.context.updateCurrentUser('');
        this.props.historyProp.push('/');
    }
*/
    render() {

        let displayUser = this.context.currentUser 
            ? this.context.currentUser 
            : 'none';
        return (
            <nav className='Nav'>
                <p>Current User: {displayUser}</p>
                {/*<button type="button" onClick={(e) => this.logout(e)}>Log Out</button>*/}
            </nav>
        );
    }
}
