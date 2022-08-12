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

    setCredential(commonInfo, setCommonInfo);
  }, [])

  useEffect(() => {
    if (commonInfo.credential._id !== JSON.parse(storage.getItem("credential"))._id) {
      storage.setItem("credential", JSON.stringify(commonInfo.credential))
    }
  }, [commonInfo])
  
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

async function setCredential(commonInfo, setCommonInfo) {
  let request = await fetch(commonInfo.serverLink, {
    credentials: "include",
  })
  request = await request.json();

  if (JSON.parse(storage.getItem("credential"))._id !== request._id) {
    setCommonInfo({
      ...commonInfo,
      credential: request
    })
  } 
}