import React from "react";
import { Routes, Route, useMatch, useParams } from "react-router-dom";
import NotLoggedIn from "../NotLoggedIn";
import PostForm from "./PostForm";
import PostLecture from "./PostLecture";
import Admin from "./Admin";
import { authContext } from "../../App";

export default function AdminRouter() {
  const auth = React.useContext(authContext);
  let admin = auth.role === "admin";

  const AdminRouterContents = () => {
    return (
      <div className="page flex justify-center">
        <div className="lecture-container max-w-4xl  bg-neutral p-5 m-5 rounded-md post-form">
          <Routes>
            <Route path="" element={admin ? <Admin /> : <NotLoggedIn />} />
            <Route
              path="post-questions"
              element={admin ? <PostForm /> : <NotLoggedIn />}
            />
            <Route path="questions/:questionID" element = {admin ? <PostForm editable={true}/> : <NotLoggedIn />} />
            <Route
              path="post-lecture"
              element={admin ? <PostLecture /> : <NotLoggedIn />}
            />
            <Route path="lectures/:lectureID" element = {admin ? <PostLecture /> : <NotLoggedIn />} />
          </Routes>
        </div>
      </div>
    );
  };

  if (auth.role === "admin") {
    return <AdminRouterContents />;
  } else {
    return <NotLoggedIn />;
  }
}
