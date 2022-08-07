import React from "react";
import { Routes, Route, useMatch } from "react-router-dom";
import NotLoggedIn from "../NotLoggedIn";
import PostForm from "./PostForm";
import PostLecture from "./PostLecture";
import Admin from "./Admin";
import { authContext } from "../../App";

export default function AdminRouter() {
  const token = React.useContext(authContext);
  return (
    <>
      <div className="page flex justify-center">
        <div className="lecture-container max-w-4xl  bg-neutral p-5 m-5 rounded-md post-form">
          <Routes>
            <Route path="" element={token ? <Admin /> : <NotLoggedIn />} />
            <Route
              path="post-questions"
              element={token ? <PostForm /> : <NotLoggedIn />}
            />
            <Route
              path="post-lecture"
              element={token ? <PostLecture /> : <NotLoggedIn />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}
