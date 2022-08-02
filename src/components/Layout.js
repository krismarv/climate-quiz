import React, { useEffect } from "react";
import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";
import Login from "./admin/Login";
import useToken from "../app/useToken";
import { Preloader } from "./Preloader";

export default function Layout(props) {
  const [loginVisible, setLoginVisible] = React.useState(false);

  return (
    <>
      <Nav setLoginVisible={setLoginVisible} setToken={props.setToken} token={props.token} loginVisible={loginVisible}/>
      <Outlet />
      <Login
        token={props.token}
        setToken={props.setToken}
        loginVisible={loginVisible}
        setLoginVisible={setLoginVisible}
      />
      <footer className="footer flex justify-between text-xs p-5 mt-5 bg-slate-100 items-center">
        <p>&copy; Kristýna Marvalová, 2022</p>
      </footer>
    </>
  );
}
