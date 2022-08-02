import React from "react";
import "../../css/login.css";
import x from "../../x-gray.png";
import Emoji from "../Emoji";
import Preloader from "../Preloader";

export default function Login(props) {
  console.log(typeof props.setToken);
  const [loginForm, setLoginForm] = React.useState({
    userName: "",
    password: "",
  });
  const [error, setError] = React.useState("");
  const [preLoader, setpreLoader] = React.useState(false);
  


  function login(e) {
    e.preventDefault();
    setpreLoader(true);
    setError(null);
    fetch(process.env.REACT_APP_CUSTOM_BACKEND_URL + "/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm),
    })
      .then((res) => {
        setpreLoader(false);
        return res.json();
      })
      .then((data) => {
        if (data.token) props.setToken(data.token);
        else if (data.error) throw new Error(data.error);
        data?.token
          ? props.setLoginVisible(false)
          : props.setLoginVisible(true);
      })
      .catch((err) => setError(err.message));
  }

  function handleChange(e) {
    setLoginForm((old) => {
      return {
        ...old,
        [e.target.name]: e.target.value,
      };
    });
  }
  return (
    props.loginVisible && (
      <div className="flex justify-center items-center bg-black z-50 absolute top-0 left-0 w-full h-full bg-opacity-40 overflow-hidden">
        <div className="z-50">
          <div className="login-form-container bg-neutral p-5 mt-10 flex flex-col items-center justify-center rounded-xl shadow-lg w-60 max-w-2xl">
            <img
              src={x}
              className="w-4 ml-auto mb-5 cursor-pointer"
              onClick={() => {
                props.setLoginVisible(false);
                setError(null);
              }}
            ></img>
            <form className="flex flex-col items-center">
              <div className="input-container">
                <input
                  name="userName"
                  type="text"
                  value={loginForm.userName}
                  onChange={handleChange}
                ></input>
                <label HTMLfor="userName">Přihlašovací jméno</label>
              </div>
              <div className="input-container">
                <input
                  name="password"
                  type="password"
                  value={loginForm.password}
                  onChange={handleChange}
                ></input>
                <label htmlFor="password">Heslo</label>
              </div>

              {error ? (
                <div className="login-error text-xs text-rose-600 font-medium mb-5">
                  <Emoji label="exclamation" symbol="❗" className="h-5" />
                  {error}
                </div>
              ) : (
                ""
              )}
              {preLoader ? <Preloader /> : ""}
              <button
                type="submit"
                className="bg-logo"
                onClick={(e) => {
                  login(e);
                }}
              >
                Přihlásit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
}
