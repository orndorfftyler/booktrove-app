import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Review from './Review';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
      <Review />
    </BrowserRouter>,
    div);

  ReactDOM.unmountComponentAtNode(div);
});