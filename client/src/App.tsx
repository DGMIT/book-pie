import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import Header from './components/common/Header';
import BookPage from './pages/BookPage';
import ReportPage from './pages/ReportPage';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header/>
        <Routes>
          <Route path='/*' element={<BookPage/>}/>
          <Route path='/report/:bookId' element={<ReportPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
