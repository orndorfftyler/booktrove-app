import React from 'react'

const BookContext = React.createContext({
  results: [],
  reviews: [],
  users: [],
  showHideNewReviewInput: '',
  currentUser: '',
  updateTerm: () => {},
  searchHandler: () => {},
  addReview: () => {},
  helpCountIncrease: () => {},
  signUp: () => {},
  updateCurrentUser: () => {},
  editReview: () => {}
})

export default BookContext;