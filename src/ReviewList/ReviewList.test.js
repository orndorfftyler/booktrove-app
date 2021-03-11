import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import ReviewList from './ReviewList';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
      <ReviewList 
        reviews={[{reviewId:"e35b8c5b-e087-479b-8f0d-371d6f5ae31f",
        bookId:"0679994351",
        title:"I really liked this book",
        contents:"It made me thirsty",
        helpCount:2,
        user:5},
        {reviewId:"26e8a472-3ad6-421d-906c-2ea6af3bbb3b",
        bookId:"0679994351",
        title:"Squirtle like",
        contents:"good stuff test",
        helpCount:3,
        user:3}]}
        currentBook={{identifier: "0679994351"}}
      />
    </BrowserRouter>,
    div);

  ReactDOM.unmountComponentAtNode(div);
});