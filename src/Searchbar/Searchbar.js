import React from 'react';
import BookContext from '../BookContext';


class Searchbar extends React.Component {
    static contextType = BookContext;

    render() {
    return (
        <form className="wrapper">
            <label className="searchlabel" htmlFor="book">Search:</label>
            <input className="search" onChange={event => this.context.updateTerm(event.target.value)} name="book" type="text" id="book" required />
            <button className="search" onClick={this.context.searchHandler}>Submit</button>
        </form>

    );
    }
}

export default Searchbar;