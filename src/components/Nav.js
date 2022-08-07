import React from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import circle from "../circle.png";
import { authContext } from "../App";

export default function Nav(props) {
  const contToken = React.useContext(authContext);
  const [openNav, setOpenNav] = React.useState(false);
  const [navElements, setNavElements] = React.useState()

  React.useEffect(() => {
    let body = document.querySelector("body");
    if (props.loginVisible) body.classList.add("no-scroll");
    else body.classList.remove("no-scroll");
  }, [props.loginVisible]);

  // nav elements
  React.useEffect(() => {
    let navs;
    if (contToken) {
      navs = [{ name: "Admin", link: "/admin" }];
    } else {
      navs = []
    }
    setNavElements(navs?.map((el)=>{
      return (
        <a href={el.link}>{el.name}</a>
      )
    }))
  }, [contToken]);

  // conditional login link
  function LoginLink() {
    if (!props.token) {
      return (
        <a
          className="cursor-pointer border-logo border-b-4 uppercase font-bold ml-5"
          onClick={() => {
            props.setLoginVisible(true);
          }}
        >
          login
        </a>
      );
    } else {
      return (
        <a
          className="cursor-pointer border-logo border-b-4 uppercase font-bold ml-5"
          onClick={() => {
            props.setToken("");
            localStorage.removeItem("token");
          }}
        >
          Odhlásit se
        </a>
      );
    }
  }

  return (
    <>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav
          className="relative flex items-center justify-between sm:h-10"
          aria-label="Global"
        >
          <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <a href="/" className="flex items-center no-bottom">
                <span className="sr-only">logo</span>
                <img
                  alt="logo"
                  className="h-8 w-auto sm:h-10 inline"
                  src={circle}
                />
                <span
                  id="logo"
                  className="inline ml-3 text-xl font-logo text-logo"
                >
                  Klima kvíz
                </span>
              </a>
            </div>
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <button className="rounded-md p-2 inline-flex items-center justify-center text-gray-800 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-logo">
              <span className="sr-only">Open main menu</span>
              {!openNav ? (
                <MenuIcon
                  className="h-6 w-6"
                  aria-hidden="true"
                  onClick={() => setOpenNav(true)}
                />
              ) : (
                <XIcon className="h-6 w-6" onClick={() => setOpenNav(false)} />
              )}
            </button>
            {openNav && (
              <div className="mobile-menu bg-white w-full absolute top-10 left-0 shadow-sm p-5 z-50 flex justify-end font-semibold text-md">
                {navElements}
                <LoginLink />
              </div>
            )}
          </div>
          <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8 font-semibold text-md">
            {navElements}
            <LoginLink />
          </div>
        </nav>
      </div>
    </>
  );
}
