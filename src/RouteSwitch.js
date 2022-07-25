import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Homepage from "./routes/homepage/Homepage";

export default function RouteSwitch () {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </HashRouter>
  )
}