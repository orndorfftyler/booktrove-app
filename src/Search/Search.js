import React from 'react';
import SearchBar from '../Searchbar/Searchbar';
import ResultList from '../ResultList/ResultList';
import BookContext from '../BookContext';
import Navbar from '../Navbar/Navbar';
import './Search.css';


class Search extends React.Component {
    static contextType = BookContext;

    render() {
        return (
            <div className="search-page">
                <Navbar 
                    historyProp={this.props.history}
                />

                <header>
                    <h1>"quote about books" - famous author</h1>
                    {/*<p>User:{this.context.currentUser}</p>*/}
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