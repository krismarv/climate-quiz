import React from "react";
import Lemur from "../lemur.png"

export default function Error () {
    return (
        <div>
            <div className="m-5 p-5 rounded-md flex flex-col items-center">
                <img src={Lemur} className="md:max-w-lg max-w-xs"></img>
                <span className="font-bold text-lg mt-10">Něco se pokazilo.</span>
                <button className="start-over mt-5"><a href="">Vrátit se zpět</a></button>
                <div className="illustration-credit ml-auto">Illustration by <a href="https://icons8.com/illustrations/author/hRw2Sz8JTGFp">Giulia Maidecchi</a> from <a href="https://icons8.com/illustrations">Ouch!</a></div>
            </div>
        </div>
    )
}