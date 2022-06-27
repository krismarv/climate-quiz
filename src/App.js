
import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Main from "./components/Main"  
import Layout from "./components/Layout";
import Quiz from './components/Quiz';

function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="quiz" element={<Quiz />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
