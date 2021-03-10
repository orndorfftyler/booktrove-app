import React from 'react';
import SignupLoginErr from '../ErrorComps/SignupLoginErr';
import BookContext from '../BookContext';
//import { withRouter } from 'react-router-dom';
//import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-api-service'

import './Signup.css';

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signOrLogin:'sign',
            username: '',
            pw1: '',
            pw2: '',
            error: null,
            signupSuccess: false
        }
    }
    static contextType = BookContext;

    signOrLogin(val) {
        this.setState({signOrLogin:val});
    }

    usernameUpdate(val) {
        this.setState({username:val});
    }

    pw1Update(val) {
        this.setState({pw1:val});
    }

    pw2Update(val) {
        this.setState({pw2:val});
    }

    validatePw() {
        if (this.state.pw1 != this.state.pw2) {
            return 'passwords do not match';
        } 
    }

    loginHandler(e, user, pw) {
        e.preventDefault();
        if (this.state.signOrLogin == 'sign') {

            this.handleSignup(e, user, pw);
        } else {

            this.handleSubmitJwtAuth(e, user, pw);
        }
    }

    handleSignup = (e, user, pw) => {
        e.preventDefault()
        //const { full_name, nick_name, user_name, password } = ev.target
    
        this.setState({ error: null })
        AuthApiService.postUser({
          user_name: user,
          password: pw
        })
          .then(user => {
            //this.handleSubmitJwtAuth(e, user.user_name, pw);
            //this.setState({ username: '', pw1:'' })
            this.setState({signupSuccess:true})
            

        })
          .catch(res => {
            this.setState({ error: res.error })
        })
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
        let nowLogin = <h3></h3>;

        if (this.state.signupSuccess) {
            nowLogin = (
            <h3>
                Signup Successful! Please 
                <Link to='/login'>
                    log in 
                </Link>
            </h3>
            )
        }

        let pwSection = (
            <>
                <label htmlFor="pw1">Password</label>
                <input type="password" name="pw1" id="pw1" required onChange={e => this.pw1Update(e.target.value)}/>
                <label htmlFor="pw2">Confirm Password</label>
                <input type="password" name="pw2" id="pw2" required onChange={e => this.pw2Update(e.target.value)}/>
            </>
        );

        let buttonSection = (
            <>
                <button 
                    type="submit" 
                    disabled={this.validatePw()}>
                    Sign Up
                </button>
                <SignupLoginErr 
                    message={this.validatePw()}
                />
            </>
        );



        return (
                    <form onSubmit={(e) => this.loginHandler(e, this.state.username, this.state.pw1)}>
                        <section className="overview-section">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" placeholder="bookie411" required onChange={e => this.usernameUpdate(e.target.value)}/>

                            {pwSection}
                        </section>
                        
                        <section className="login-signup-section">
                        {nowLogin}

                        </section>  

                        <section className="button-section">
                            {buttonSection}
                            {/*<p>{JSON.stringify(this.context.users)}</p>
                            <p>{`currentUser: ${this.context.currentUser}`}</p>*/}

                        </section>

                    </form>
        );
    }
}

export default Signup;