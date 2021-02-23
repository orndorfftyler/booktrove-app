import React from 'react';
import './Landing.css';


class Landing extends React.Component {

    render() {
        return (
            <div className="look">
                <nav>Nav</nav>
                <main>
                    <header>
                        <h1>BookTrove</h1>
                        <h2>All your favorite books in one place</h2>
                        <button type="submit">Let's Go!</button>
                    </header>
            
                    <section>
                        <h3>Looking for your next big read?</h3>
                        <p>Read dozens of book reviews written by our expert BookTrove readers.</p>
                    </section>
            
                    <section>
                    <h3>Want to tell the world about an amazing book you just read? Look no further!</h3>
                    <p>Your reviews will be adored by dozens of amped up BookTrovers.</p>
                    </section>
            
                    <section>
                        <h3>Find a book review you don't like? No problem!</h3>
                    <p>BookTrove lets you rate reviews! Your feedback matters!</p>
                    </section>
            
                    <section >
                    <button type="submit">Let's Go!</button>
                    </section>
            
                </main>
                <footer >Footer</footer>
            </div>
        );
    }
}

export default Landing;