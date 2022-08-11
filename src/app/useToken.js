import React, { useState } from "react";
import jwt_decode from "jwt-decode";

export default function useToken() {
  // initializer
  function getToken() {
    const tokenString = localStorage.getItem("token");
    return tokenString;
  }

  const [token, setToken] = useState(getToken());

  // setToken
  function saveToken (fetchedToken) {
    try {
        localStorage.setItem("token", fetchedToken)
        setToken(fetchedToken)
    } catch {
      console.log("couldnt save token")
    }  
  }

  const [role, setRole] = React.useState()

  // get user role
  React.useEffect(()=>{
    if (token) {
      setRole(jwt_decode(token).role)
    } else {
      setRole("")
    }
  },[token])

  return {
    setToken: saveToken,
    token: token, 
    role
  }
}
