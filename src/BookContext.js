import React from 'react'

const BookContext = React.createContext({
  results: [],
  reviews: [],
  users: [],
  showHideNewReviewInput: '',
  currentUser: '',
  currentUsername: '',
  updateTerm: () => {},
  searchHandler: () => {},
  addReview: () => {},
  signUp: () => {},
  updateCurrentUser: () => {},
  //editReview: () => {},
  getReviews:() => {},
  patchReview: () => {},
  deleteReview: () => {},


})

export default BookContext;