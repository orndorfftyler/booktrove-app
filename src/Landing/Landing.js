import React from 'react';
import { Link } from 'react-router-dom';

import './Landing.css';


class Landing extends React.Component {

    render() {
        return (
            <div className="landing-page look">
                <main className="landing-page">
                    <div className="top-bar"></div>
                    <header className="landing-page">
                        <h1>BookTrove</h1>
                        <h2>All your favorite books in one place!</h2>
                        <p>BookTrove lets book lovers write reviews of their favorite books. </p>
                        <p>To get started, click the "Let's Go!" button to go the sign up page. </p>
                        <p>From there, feel free to follow the link to the login page and use the admin account:</p>
                        <p>username: admin</p>
                        <p>password: admin</p>
                        <p>Then search for a book using the search page. Click on a result to write and rate reviews!</p>

                        <Link to='/signup'><button className="landing" type="button">Let's Go!</button></Link>
                    </header>

                    <section className="landing-page">
                        <h3>Looking for your next big read?</h3>
                        <p>Read dozens of book reviews written by our expert BookTrove readers.</p>
                    </section>
            
                    <section className="landing-page">
                        <h3>Want to tell the world about an amazing book you just read? Look no further!</h3>
                        <p>Your reviews will be adored by dozens of amped up BookTrovers.</p>
                    </section>
            
                    <section className="landing-page">
                        <h3>Find a book review you don't like? No problem!</h3>
                        <p>BookTrove lets you rate reviews! Your feedback matters!</p>
                    </section>
            
                    <section className="landing-page">
                        <Link to='/signup'><button className="landing" type="button">Let's Go!</button></Link>
                    </section>
            
                </main>
            </div>
        );
    }
}

export default Landing;