import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Book from './Book';
import BookContext from '../BookContext';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const contextValue = {
    results: [{"title":"Dracula","author":["Stephanie Spinner","Bram Stoker"],
    "description":"Having discovered the double identity of the wealthy Transylvanian nobleman",
    "src":"http://books.google.com/books/content?id=8bJQPgAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
    "details":"Random House Books for Young Readers",
    "detailsDisplayed":"no","identifier":"0679994351"},
    {"title":"Dracula","author":["Bram Stoker"],"description":"Dracula is an 1897 Gothic horror novel by Irish author Bram Stoker.",
    "src":"http://books.google.com/books/content?id=MM47zgEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
    "detailsDisplayed":"no","identifier":"9798702237770"},{"title":"A Dracula Handbook","author":["Elizabeth Miller"],
    "description":"A DRACULA HANDBOOK A Dracula Handbook provides succinct and accurate information",
    "src":"http://books.google.com/books/content?id=uyp0g5Jz318C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api","details":"Xlibris Corporation","detailsDisplayed":"no","identifier":"9781413480948"},{"title":"In Search of Dracula","author":["Raymond T. McNally","Radu Florescu"],"description":"Traces the history and folklore of vampires","src":"http://books.google.com/books/content?id=P22TnNTonYwC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    "details":"Houghton Mifflin Harcourt","detailsDisplayed":"no","identifier":"0395657830"}],
    reviews: [{reviewId:"e35b8c5b-e087-479b-8f0d-371d6f5ae31f",
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
      user:3}],
    currentUser: 3,
  };

  ReactDOM.render(
    <BrowserRouter>
      <BookContext.Provider value={contextValue}>
        <Book 
          match={{params: {
            bookId: "0679994351"
          }}}
        />
      </BookContext.Provider>
    </BrowserRouter>,
    div);

  ReactDOM.unmountComponentAtNode(div);
});