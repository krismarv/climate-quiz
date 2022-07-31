import React from "react";
import empty_img from "../empty.png"

export default function Empty (props) {
    return (
        <div>
            <div className="m-5 bg-neutral p-5 rounded-md flex flex-col items-center">
                <img src={empty_img}></img>
                <span className="font-bold text-lg">Už nejsou k dispozici žádné nové otázky. Chcete začít znovu?</span>
                <button className="start-over mt-5" onClick={()=>{props.startAgain()}}>Začít znovu</button>
                <div className="illustration-credit ml-auto">Illustration by <a href="https://icons8.com/illustrations/author/hRw2Sz8JTGFp">Giulia Maidecchi</a> from <a href="https://icons8.com/illustrations">Ouch!</a></div>
            </div>
        </div>
    )
}