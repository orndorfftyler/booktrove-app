import React from 'react';
import SearchBar from '../Searchbar/Searchbar';
import ResultList from '../ResultList/ResultList';
import BookContext from '../BookContext';
import './Search.css';


class Search extends React.Component {
    static contextType = BookContext;

    render() {
        return (
            <div className="look">

                <nav role="navigation">Nav
                <button type="submit">Log Out</button>
                </nav>

                <header>
                    <h1>"quote about books" - famous author</h1>
                    <p>User:{this.context.currentUser}</p>
                </header>

                <SearchBar />
                <ResultList 
                    results={this.context.results}
                />
        
            </div>
        );
    }
}

export default Search;