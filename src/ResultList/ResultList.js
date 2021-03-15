import React from 'react';
import Result from '../Result/Result';


class ResultList extends React.Component {

    render() {
        let results = '';

        if (this.props.results) {
            results = this.props.results.map((book) => {

            return (
                <Result 
                    key={book.identifier}
                    title={book.title}
                    src={book.src}
                    author={book.author}
                    description={book.description}
                    details={book.details}
                    id={book.identifier}
                    linkify={true}
                />
                )
            })
        }

        if (!results) {
            results = <p>No results</p>
        }

    return (
        <>
        {results}
        </>
    )
    }
}

export default ResultList;