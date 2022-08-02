import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "./components/Main";
import Layout from "./components/Layout";
import Quiz from "./components/Quiz";
import NotFound from "./components/404";
import PostForm from "./components/admin/PostForm";
import useToken from "./app/useToken";
import NotLoggedIn from "./components/NotLoggedIn";

const authContext = React.createContext(null);

function App() {
  const { token, setToken } = useToken();
  console.log(token)
  return (
    <>
      <BrowserRouter>
        <authContext.Provider value={token}>
          <Routes>
            <Route
              path="/"
              element={<Layout token={token} setToken={setToken} />}
            >
              <Route path="*" element={<NotFound />} />
              <Route index element={<Main />} />
              <Route path="quiz" element={<Quiz />} />
              <Route
                path="post-questions"
                element={token ? <PostForm /> : <NotLoggedIn />}
              />
            </Route>
          </Routes>
        </authContext.Provider>
      </BrowserRouter>
    </>
  );
}

export {
  App, 
  authContext
};
