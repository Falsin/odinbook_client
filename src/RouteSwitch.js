import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import CommonContext from "./commonContext";
import Homepage from "./routes/homepage/Homepage";

let storage = window.localStorage;

export default function RouteSwitch () {
  const [commonInfo, setCommonInfo] = useState({
    serverLink: "http://localhost:3000/",
    credential: JSON.parse(storage.getItem("credential")),
  })

  useEffect(() => {
    setCredential();
  }, [])

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
    <HashRouter>
        <Routes>
            <Route path="/" element={<Homepage />} />
        </Routes>
      </HashRouter>
    </CommonContext.Provider>
  )
}