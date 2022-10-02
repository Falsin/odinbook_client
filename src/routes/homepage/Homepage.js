import React from "react";
import StyledFooter from "../../commonComponents/footer";
import StyledHeader from "../../commonComponents/header";
import MainContext from "./mainContext/mainContext";

export default function Homepage() {
  return (
    <>
      <StyledHeader />
      <MainContext />
      <StyledFooter />
    </>
  )
}