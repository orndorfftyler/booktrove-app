import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Book from './Book/Book';
import Landing from './Landing/Landing';
import Search from './Search/Search';
import Signup from './Signup/Signup';
import BookContext from './BookContext';
import { v4 as uuid } from 'uuid';
import TokenService from './services/token-service';
//import API_BASE_URL from './config';
import PrivateRoute from './Utils/PrivateRoute';
import PublicOnlyRoute from './Utils/PublicOnlyRoute';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results : [],
      reviews: [],
      /*users:[
        {
          user: 'admin',
          pw:'admin'
        },
        {
          user: 'Squirtle',
          pw:'sss'
        }

      ],*/
      currentUser: '',
      currentUsername: '',
      term: '',
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


  populateReviews = (reviews) => {
    this.setState({
      reviews: reviews 
    })
  }

  getReviews = (bookId) => {
    fetch(`${API_BASE_URL}/reviewsperbook/${bookId}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error(res.status)
      })
      .then(resJson =>
        
        this.populateReviews(resJson)
        
        )
      .catch(error => console.log({ error }))
    
  }


  addReview = (e, bookId, title, desc) => {    
    e.preventDefault();

    let newId = uuid();
    let cUser = this.state.currentUsername;

    let newOne = {
      reviewId: newId,
      bookId: bookId,
      title: title,
      contents: desc,
      helpCount: 0,
      user: cUser
    }


    fetch(`${API_BASE_URL}/reviewsperbook/${bookId}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify(newOne)
    })
        .then(res => {
            if (res.ok) {
            return res.json()
            }
            throw new Error(res.status)
        })
        .then(data => {
          this.getReviews(bookId);
          console.log('hey')
            //this.props.history.push('/');

        })
        .catch(error => {
            console.error(error)
        })
        
  }

  patchReview = (e, review) => {    
    e.preventDefault();


    fetch(`${API_BASE_URL}/reviews/${review.reviewId}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify(review)
    })
        .then(data => {
          this.getReviews(review.bookId)
            //this.props.history.push('/');
        }
        )
        .catch(error => {
            console.error(error)
        })
        
  }

  deleteReview = (e, reviewId, bookId) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(res.status)
            }
        })
        .then(data => {
          this.getReviews(bookId);
            
        })
        .catch(error => {
          console.error(error)
        })
  }
 updateCurrentUser = (username) => {
  fetch(`${API_BASE_URL}/users/${username}`, {
    headers: {
      'authorization': `bearer ${TokenService.getAuthToken()}`,
    },
  })
  .then(res => {
    
    if (res.ok) {
      return res.json()
    }
    throw new Error(res.status)
    
  })
  .then(resJson => {
    console.log(`username response: ${resJson.id}`);
    this.setState({currentUser: resJson.id, currentUsername: username})
    
  })
  .catch(error => console.log({ error, updateCurrentUser:'yes' }))
  
}

  searchHandler = e => {
    e.preventDefault();
    console.log('searchHandler');
    let termsArr = this.state.term.split(' ');
    termsArr = termsArr.join(',');
    let /*params = {};

    if (this.state.free !== 'remove') {
      params = {
        q: termsArr,
        printType: this.state.print,
        filter: this.state.free,
        key: this.state.apiKey
  
      };
  
    } else {*/
      params = {
        q: termsArr,
        printType: 'all',
        key: this.state.apiKey
  
      };
    //}

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
      //users: this.state.users,
      currentUser: this.state.currentUser,
      currentUsername: this.state.currentUsername,
      updateTerm: this.updateTerm,
      searchHandler: this.searchHandler,
      addReview: this.addReview,
      //signUp: this.signUp,
      updateCurrentUser: this.updateCurrentUser,
      //editReview: this.editReview,
      getReviews: this.getReviews,
      patchReview: this.patchReview,
      deleteReview: this.deleteReview
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

        <PublicOnlyRoute 
          path='/signup'
          component={Signup}
        />

        <PrivateRoute 
          path='/search'
          component={Search}
        />

        <PrivateRoute 
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