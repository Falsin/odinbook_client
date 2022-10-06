import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CommonContext from "./commonContext";
import Homepage from "./routes/homepage/Homepage";
import SettingsPage from "./routes/settingsPage/SettingsPage"
import ErrorPage from "./routes/errorPage/ErrorPage";
import FriendsPage from "./routes/friendsPage/FriendsPage";

let storage = window.localStorage;

export default function RouteSwitch () {
  const [commonInfo, setCommonInfo] = useState({
    credential: JSON.parse(storage.getItem("credential")),
  })

  console.log(commonInfo)

  if (window.location.hash === "#_=_"){
    history.replaceState 
        ? history.replaceState(null, null, window.location.href.split("#")[0])
        : window.location.hash = "";
  }

  useEffect(() => {
    setCredential();
  }, [])

  useEffect(() => {
    storage.setItem("credential", JSON.stringify(commonInfo.credential))
  }, [commonInfo])

  async function setCredential() {
    try {
      const request = await fetch(process.env.SERVER_URL, {
        credentials: "include",
      })
      const response = await request.json();
  
      if (commonInfo.credential !== response) { 
        setCommonInfo({
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
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/friends" element={<FriendsPage />} />
        </Routes>
      </BrowserRouter>
    </CommonContext.Provider>
  )
}