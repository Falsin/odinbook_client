import React from "react";
import StyledFooter from "../../commonComponents/footer";
import StyledHeader from "../../commonComponents/header";
import StyledMainContext from "./mainContext/mainContext";

export default function Homepage() {
  return (
    <>
      <StyledHeader />
      <StyledMainContext />
      <StyledFooter />
    </>
  )
}