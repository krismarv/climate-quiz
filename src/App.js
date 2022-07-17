
import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Main from "./components/Main"  
import Layout from "./components/Layout";
import Quiz from './components/Quiz';
import NotFound from './components/404';
import PostForm from "./components/PostForm"

function App() {
  


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<NotFound />}/>
          <Route index element={<Main />} />
          <Route path="quiz" element={<Quiz />}/>
          <Route path="post-questions" element={<PostForm />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
