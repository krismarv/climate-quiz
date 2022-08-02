import React from "react";
import lemur from "../lemur.png"

export default function NotLoggedIn () {
    return (
        <div>
            <div className="m-5 bg-neutral p-5 rounded-md flex flex-col items-center">
                <img src={lemur} className="max-w-lg"></img>
                <span className="font-bold text-lg mt-10">Pro vstup na tuto stránku nemáte oprávnění.</span>
                <span className="font-medium text-xl mt-4">Prosím, přihlaste se!</span>
                <button className="start-over mt-5"><a href="/">Zpět na hlavní stranu</a></button>
                <div className="illustration-credit ml-auto">Illustration by <a href="https://icons8.com/illustrations/author/hRw2Sz8JTGFp">Giulia Maidecchi</a> from <a href="https://icons8.com/illustrations">Ouch!</a></div>
            </div>
        </div>
    )
}