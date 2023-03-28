import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import BookShelvesPage from "../bookShelvesPage/BookShelvesPage"
import BooksPage from "../booksPage/BooksPage";
import BookChallengePage from "../bookChallengePage/BookChallengePage";

import './app.scss';

const App = () => {
  
    return (
        <Router>
        <div className="app">
          <AppHeader /> 
          
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route path="/" element={<BooksPage/>} />
                <Route path="/bookshelf" element={<BookShelvesPage />} /> 
                <Route path="/challenges" element={<BookChallengePage />} />        
              </Routes>
            </Suspense>
        </div>
      </Router>
    )
}

export default App;