import React from 'react';
import SignupLoginErr from '../ErrorComps/SignupLoginErr';
import BookContext from '../BookContext';

import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-api-service'

//import './Signup.css';

class LoginInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pw1: '',
            error: null,
        }
    }
    static contextType = BookContext;

    usernameUpdate(val) {
        this.setState({username:val});
    }

    pw1Update(val) {
        this.setState({pw1:val});
    }


    handleSubmitJwtAuth = (e, user, pw) => {
        e.preventDefault()
        this.setState({ error: null })
    
        AuthApiService.postLogin({
          user_name: user,
          password: pw
        })
          .then(res => {
            this.setState({ username: '', pw1:'' })

            TokenService.saveAuthToken(res.authToken)
            //this.props.onLoginSuccess()
            this.context.updateCurrentUser(user);
            this.props.historyProp.push('/search');

        })
          .catch(res => {
            this.setState({ error: res.error })
        })
    }
    
    render() {


            let pwSection = (
                <>
                    <label htmlFor="pw1">Password</label>
                    <input type="password" name="pw1" id="pw1" onChange={e => this.pw1Update(e.target.value)}/>
                </>
            );
            let buttonSection = (
                <button type="submit" >
                    Submit
                </button>
            );


        return (
                <div className="look">
                    <nav role="navigation"></nav>
                    <main role="main">
                        <header>
                            <h1>Login to BookTrove!</h1>
                            
                        </header>

                        <form onSubmit={(e) => this.handleSubmitJwtAuth(e, this.state.username, this.state.pw1)}>
                            <section className="overview-section">
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" placeholder="bookie411" required onChange={e => this.usernameUpdate(e.target.value)}/>

                                {pwSection}
                            </section>
                            
                            <section className="button-section">
                                {buttonSection}
                                {/*<p>{JSON.stringify(this.context.users)}</p>
                                <p>{`currentUser: ${this.context.currentUser}`}</p>*/}

                            </section>

                        </form>
                    </main>

                </div>

        );
    }
}

export default LoginInput;

