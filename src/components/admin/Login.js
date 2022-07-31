import React from "react";
import "../../css/login.css";
import x from "../../x-gray.png";
import Emoji from "../Emoji";

export default function Login(props) {
  function handleChange(e) {
    props.setLoginForm((old) => {
      return {
        ...old,
        [e.target.name]: e.target.value,
      };
    });
  }
  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="login-form-container bg-neutral p-5 mt-10 flex flex-col items-center justify-center rounded-xl shadow-lg w-60 max-w-2xl">
        <img
          src={x}
          className="w-4 ml-auto mb-5 cursor-pointer"
          onClick={() => {
            props.setLoginVisible(false);
          }}
        ></img>
        <form>
          <div className="input-container">
            <input
              name="userName"
              type="text"
              value={props.loginForm.userName}
              onChange={handleChange}
            ></input>
            <label HTMLfor="userName">Přihlašovací jméno</label>
          </div>
          <div className="input-container">
            <input
              name="password"
              type="password"
              value={props.loginForm.password}
              onChange={handleChange}
            ></input>
            <label HTMLfor="password">Heslo</label>
          </div>

          {props.error ? (
            <div className="login-error text-xs text-rose-600 font-medium mb-5">
              <Emoji label="exclamation" symbol="❗" className="h-5" />
              {props.error}
            </div>
          ) : (
            ""
          )}
          <button
            type="submit"
            className="bg-logo"
            onClick={(e) => {
              props.login(e);
            }}
          >
            Přihlásit
          </button>
        </form>
      </div>
    </div>
  );
}
