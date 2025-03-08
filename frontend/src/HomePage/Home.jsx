import React from 'react';
import { Route, Routes } from "react-router";
import HomePage from '../pages/HomePage';


const Home = () => {
  return (
    <div >
    <Routes >
      <Route path='/' element={<HomePage/>}>
      </Route>
    </Routes>
  </div>
  )
}

export default Home
