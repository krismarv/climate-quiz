import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import {useParams} from "react-router-dom"

export default function LectureSingle() {
    let {no} = useParams()
    return (
        <> 
        single lecture
        {no}
        <div className="arrow-container flex w-full justify-between text-2xl max-w-4xl"><ChevronLeftIcon className="h-10 w-10 text-logo"/><ChevronRightIcon className="h-10 w-10 text-logo"/></div>
        </>
        )
    
}