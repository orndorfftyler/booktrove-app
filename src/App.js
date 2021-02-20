import React, { Component } from 'react';
import Book from './Book/Book';
import Landing from './Landing/Landing';
import Search from './Search/Search';
import Signup from './Signup/Signup';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: [],
      folderSelected: '',
      noteSelected: ''
    }
  }

  render() {

  return (
    <div className='App'>
      <NoteContext.Provider value={contextValue}>
      <header>
          <Nav />
          
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

      </NoteContext.Provider>
    </div>
  );
  }
}

export default App;