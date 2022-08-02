import React from "react";
import Emoji from "./Emoji";
// import { MenuIcon, XIcon } from 'heroicons/react/outline'
import waves from "../waves.PNG";
import landscape from "../landscape.PNG";
import "../css/hero.css";
import { authContext } from "../App";export default function Example() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">
                  Jak dobře znáte budoucnost našeho světa?
                </span>
                <span className="block text-indigo-600 xl:inline"></span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"></p>
              <Emoji symbol="🎲" label="game-die" />
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <button className="">
                  <a href="/quiz" className="">
                    Jít na kvíz
                  </a>
                </button>
                <button className="pale">
                  <a href="#" className="">
                    Výběr otázek
                  </a>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="waves lg:h-96 h-56 relative sm:left-56 xl:top-16 xl:left-28"
          src={waves}
        ></img>
        <img
          className="landscape lg:h-80 h-56 relative -top-40 left-36 sm:-top-44 sm:left-96 xl:-top-40 xl:left-96"
          src={landscape}
        ></img>
      </div>
    </div>
  );
}
