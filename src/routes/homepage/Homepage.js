import React from "react";
import StyledFooter from "../../commonComponents/footer";
import StyledHeader from "../../commonComponents/header";
import MainContent from "./mainContent/mainContent";

export default function Homepage() {
  return (
    <>
      <StyledHeader />
      <MainContent />
      <StyledFooter />
    </>
  )
}