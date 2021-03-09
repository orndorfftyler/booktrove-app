import React from 'react';
import { Link } from 'react-router-dom';
import BookContext from '../BookContext';
import TokenService from '../services/token-service';


export default class Nav extends React.Component {
    static contextType = BookContext;

    renderLogoutLink() {
        return (
        <div>
            <Link onClick={this.handleLogoutClick} to='/'>
                Logout
            </Link>
        </div>
        )
    }

    renderLoginLink() {
        return (
        <div>
            <Link to='/signup'>
                Sign Up / Log In
            </Link>
        </div>
        )
    }

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
    }
    

    render() {
/*
        localStorage.getItem('currentUsername')
        let displayUser = localStorage.getItem('currentUsername') 
        ? localStorage.getItem('currentUsername') 
        : 'none';
*/
        let displayUser = this.context.currentUsername 
            || localStorage.getItem('currentUsername') 
            || 'none';
            
        return (
            <nav className='Nav'>
                <p>Current User: {displayUser}</p>
                {TokenService.hasAuthToken()
                    ? this.renderLogoutLink()
                    : this.renderLoginLink()}
            </nav>
        );
    }
}
