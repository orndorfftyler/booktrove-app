import React from 'react'

const BookContext = React.createContext({
  results: [],
  reviews: [],
  showHideNewReviewInput: '',
  currentUser: '',
  currentUsername: '',
  helpfulPerBook: [],
  updateTerm: () => {},
  searchHandler: () => {},
  addReview: () => {},
  updateCurrentUser: () => {},
  getReviews:() => {},
  patchReview: () => {},
  deleteReview: () => {},
  //getHelpfulPerBook: () => {},
  //postHelpful: () => {},
  //acquireHelpfulId: () => {},
  //deleteHelpful: () => {}


})

export default BookContext;