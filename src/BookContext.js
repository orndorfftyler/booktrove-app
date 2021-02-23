import React from 'react'

const BookContext = React.createContext({
  noteSelected: '',
  results: [],
  reviews: [],
  showHideNewReviewInput: '',
  updateTerm: () => {},
  searchHandler: () => {},
  addReview: () => {},
  helpCountIncrease: () => {}
})

export default BookContext;