import React from 'react';
import BookContext from '../BookContext';


class Searchbar extends React.Component {
    static contextType = BookContext;

    render() {
    return (
        <form className="wrapper">
            <label htmlFor="book">Search:</label>
            <input onChange={event => this.context.updateTerm(event.target.value)} name="book" type="text" id="book" required />
            <button onClick={this.context.searchHandler}>Submit</button>
        </form>

    );
    }
}

export default Searchbar;