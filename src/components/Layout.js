import React, { useEffect } from "react";
import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";
import Login from "./admin/Login";
import useToken from "../app/useToken";

export default function Layout() {
  const [loginVisible, setLoginVisible] = React.useState(false);
  const { token, setToken } = useToken();
  const [loginForm, setLoginForm] = React.useState({
    userName: "",
    password: "",
  });
  const [error, setError] = React.useState("");

  function login(e) {
    e.preventDefault();
    fetch(process.env.REACT_APP_CUSTOM_BACKEND_URL + "/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) setToken(data.token);
        else if (data.error) throw new Error (data.error)
        data?.token ? setLoginVisible(false) : setLoginVisible(true)
      })
      .catch((err) => setError(err.message));
  }
  return (
    <>
      <Nav />
      <Outlet />
      {loginVisible ? (
        <Login
          setLoginVisible={setLoginVisible}
          login={(e) => login(e)}
          setLoginForm={setLoginForm}
          loginForm={loginForm}
          error={error}
        />
      ) : (
        ""
      )}
      <footer className="footer flex justify-between text-xs p-5 mt-5 bg-slate-100 items-center">
        <p>&copy; Kristýna Marvalová, 2022</p>
        {!token ? (
          <a
            className="cursor-pointer"
            onClick={() => {
              setLoginVisible(true);
            }}
          >
            Admin login
          </a>
        ) : (
          <a
            className="cursor-pointer"
            onClick={() => {
              setToken("");
            }}
          >
            Odhlásit se
          </a>
        )}
      </footer>
    </>
  );
}
