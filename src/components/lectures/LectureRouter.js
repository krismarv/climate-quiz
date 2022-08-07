import React from "react";
import { Routes, Route } from "react-router-dom";
import LectureSingle from "./LectureSingle"
import LectureList from "./LectureList"

export default function LectureRouter() {

  React.useEffect(()=>{
    fetch(process.env.REACT_APP_SERVER_URL+'/api/lectures')
  },[])
  return (
    <div className="page flex  flex-col items-center justify-center w-full pl-5 pr-5">
      <div className="lecture-container w-full max-w-4xl m-2 p-4 bg-neutral rounded-md">
        <Routes>
          <Route path="" element={<LectureList/>}/>
          <Route path=":no" element={<LectureSingle/>}/>
        </Routes>
      </div>
      
    </div>
  );
}
