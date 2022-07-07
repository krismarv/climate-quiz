import React from "react";
import notFound from "../404.png"

export default function Empty () {
    return (
        <div>
            <div className="m-5 bg-neutral p-5 rounded-md flex flex-col items-center">
                <img src={notFound} className="max-w-lg"></img>
                <span className="font-bold text-lg mt-10">Tato stránka bohužel neexistuje.</span>
                <button className="start-over mt-5"><a href="/">Zpět na hlavní stranu</a></button>
                <div className="illustration-credit ml-auto">Illustration by <a href="https://icons8.com/illustrations/author/hRw2Sz8JTGFp">Giulia Maidecchi</a> from <a href="https://icons8.com/illustrations">Ouch!</a></div>
            </div>
        </div>
    )
}