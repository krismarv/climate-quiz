import React from "react";
import { Popover } from '@headlessui/react';
import circle from '../circle.png'

export default function Nav () {
    return (
        <>
        <Popover>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
              <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
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
                        className="inline ml-3 text-xl font-logo text-logo">Klima kvíz</span>
                    </a>
                  </div>
                </div>
                <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                </div>
              </nav>
            </div>
          </Popover>
        </>
    )
}