import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CommonContext from "./commonContext";
import Homepage from "./routes/homepage/Homepage";

let storage = window.localStorage;

export default function RouteSwitch () {
  const [commonInfo, setCommonInfo] = useState({
    serverLink: "https://mighty-reef-21129.herokuapp.com/",
    credential: JSON.parse(storage.getItem("credential")),
  })

  useEffect(() => {
    setCredential();
  }, [])

  console.log(commonInfo)

  useEffect(() => {
    storage.setItem("credential", JSON.stringify(commonInfo.credential))
  }, [commonInfo])

  async function setCredential() {
    try {
      const request = await fetch(commonInfo.serverLink, {
        credentials: "include",
      })
      const response = await request.json();
  
      if (commonInfo.credential !== response) { 
        setCommonInfo({
          ...commonInfo,
          credential: response
        })
      }
  
    } catch {
      return null;
    }
  }
  
  return (
    <CommonContext.Provider value={{commonInfo: commonInfo, setCommonInfo: setCommonInfo}}>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </CommonContext.Provider>
  )
}