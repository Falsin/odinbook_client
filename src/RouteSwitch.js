import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import CommonContext from "./commonContext";
import Homepage from "./routes/homepage/Homepage";

export default function RouteSwitch () {
  const [commonInfo, setCommonInfo] = useState({
    serverLink: "http://localhost:3000/",
  })
  
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