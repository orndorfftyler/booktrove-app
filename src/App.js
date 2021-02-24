import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Book from './Book/Book';
import Landing from './Landing/Landing';
import Search from './Search/Search';
import Signup from './Signup/Signup';
import BookContext from './BookContext';
import { v4 as uuid } from 'uuid';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results : [],
      reviews: [],
      users:[
        {
          user: 'admin',
          pw:'admin'
        }
      ],
      currentUser: '',
      term: 'coding',
      print: "all",
      free: "remove",
      searchURL_TM: 'https://www.googleapis.com/books/v1/volumes',
      apiKey: 'AIzaSyB8fDuAtzPrAe0raudJ4-7rfgZZFlkOYMU'
    }
  }


  updateTerm = (value) => {
    //console.log('updateTerm');

    this.setState({term: value});
  }

  paramFormat(params) {
    const queryItems = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
    return queryItems.join('&');
  }

  addReview = (e, bookId, title, desc) => {
    e.preventDefault();
    let oldReviews = this.state.reviews;
    let newId = uuid();

    let newOne = {
      reviewId: newId,
      bookId: bookId,
      title: title,
      contents: desc,
      helpCount: 0,
      user: this.state.currentUser
    }

    oldReviews.push(newOne);
    this.setState({reviews: oldReviews});
  }

  editReview = (e, reviewId, title, desc) => {
    e.preventDefault();
    let temp = this.state.reviews.filter(obj => (obj.reviewId == reviewId) 
      ? obj.title = title
      : obj.title = obj.title);
    
    temp = temp.filter(obj => (obj.reviewId == reviewId) 
      ? obj.contents = desc
      : obj.title = obj.title);
    
      this.setState({reviews: temp});
      console.log(this.state.reviews);
  }

  editReviewHelper = (obj, title, desc) => {
    obj.title = title;
    obj.contents = desc;
  }

  signUp = (e, user, pw) => {
    e.preventDefault();
    //adding username and pw to db
    let temp = this.state.users;

    let newOne = {
      user: user,
      pw: pw,
    }

    temp.push(newOne);
    this.setState({users: temp});
    console.log('added new user');
  }

  updateCurrentUser = (user) => {
    this.setState({currentUser: user});
  }
  
  helpCountIncrease = (e, reviewId) => {
    e.preventDefault();
    let temp = this.state.reviews.filter(obj => (obj.reviewId == reviewId) 
      ? obj.helpCount = obj.helpCount + 1
      : obj.helpCount = obj.helpCount);
    this.setState({reviews: temp});
  }

  searchHandler = e => {
    e.preventDefault();
    console.log('searchHandler');
    let termsArr = this.state.term.split(' ');
    termsArr = termsArr.join(',');
    let params = {};

    if (this.state.free !== 'remove') {
      params = {
        q: termsArr,
        printType: this.state.print,
        filter: this.state.free,
        key: this.state.apiKey
  
      };
  
    } else {
      params = {
        q: termsArr,
        printType: this.state.print,
        key: this.state.apiKey
  
      };
    }



    let prettyParams = this.paramFormat(params);
    const url = `${this.state.searchURL_TM}?${prettyParams}`;
    console.log(url);

    fetch(url)
    .then(response => {
        if (response.ok) {
            
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    })
    .then(responseJson => this.updateResults(responseJson))
    .catch(error => {console.log(error.message)});


    //update state - format as an array of objects
  }

  updateResults = (responseJson) => {
    //let outArr = [];
    let out = responseJson.items.slice(0,10);
    let out2 = out.map(item => (
      {title:item.volumeInfo.title,
        author: item.volumeInfo.authors,
        description: item.volumeInfo.description,
        src:item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail : 'https://images.dog.ceo/breeds/mix/Masala.jpg',
        details:item.volumeInfo.publisher,
        detailsDisplayed: 'no',
        identifier:item.volumeInfo.industryIdentifiers[0]['identifier']
      }
    ))
    this.setState({results: out2})
    //console.log(this.state.results)
  }



  render() {
    const contextValue = {
      results: this.state.results,
      reviews: this.state.reviews,
      users: this.state.users,
      currentUser: this.state.currentUser,
      updateTerm: this.updateTerm,
      searchHandler: this.searchHandler,
      addReview: this.addReview,
      helpCountIncrease: this.helpCountIncrease,
      signUp: this.signUp,
      updateCurrentUser: this.updateCurrentUser,
      editReview: this.editReview
    };

  return (
    <div className='App'>
      <BookContext.Provider value={contextValue}>
      <header>
          {/*<Nav />*/}
          
      </header>

      <main>
        <Route 
          exact path='/'
          component={Landing}
        />

        <Route 
          path='/signup'
          component={Signup}
        />

        <Route 
          path='/search'
          component={Search}
        />

        <Route 
          path='/book/:bookId'
          component={Book}
        />

      </main>

      </BookContext.Provider>
    </div>
  );
  }
}

export default App;