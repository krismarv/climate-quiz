import { useState } from "react";

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

  return {
    setToken: saveToken,
    token: token
  }
}
