import React from 'react';
import './Signup';

class Signup extends React.Component {

    render() {
        return (
            <div className="look">
                <nav role="navigation">Nav</nav>
                <main role="main">
                <header>
                    <h1>Welcome!</h1>
                </header>
                    <form>

                    <section class="form-section overview-section">
                        <label for="username">Username</label>
                        <input type="text" name="username" placeholder="bookie411" required />
                    </section>

                    <section class="form-section overview-section">
                        <label for="pw">Password</label>
                        <input type="number" name="pw" id="hours-slept" placeholder="8" />
                    </section>


                    <section class="form-section login-signup-section">

                        <input type="radio" name="sign-up" id="sign-up" value="0" checked />
                        <label for="sign-up">
                        Sign Up
                        </label>

                        <input type="radio" name="log-in" id="log-in" value="1" />
                        <label for="log-in">
                        <span>Log In</span>
                        </label>

                    </section>  

                    <section class="button-section">
                        <button type="submit">Submit</button>
                    </section>

                    </form>
                </main>

            </div>
        );
    }
}

export default Signup;