import React from 'react';
import LoginInput from '../LoginInput/LoginInput';

import './Signup.css';

class Signup extends React.Component {

    render() {
        return (
            <div className="look">
                <nav role="navigation"></nav>
                <main role="main">
                <header>
                    <h1>Welcome to BookTrove!</h1>
                    
                </header>
                    <LoginInput 
                        historyProp={this.props.history}
                    />
                </main>

            </div>
        );
    }
}

export default Signup;