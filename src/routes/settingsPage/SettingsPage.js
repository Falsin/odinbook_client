import React from "react";
import StyledFooter from "../../commonComponents/footer";
import StyledHeader from "../../commonComponents/header";
import MainContent from "./MainContent";

function SettingsPage(params) {
  return (
    <>
      <StyledHeader />
      <MainContent />
      <StyledFooter />
    </>
  )
}

export default SettingsPage;