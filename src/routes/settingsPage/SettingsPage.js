import React from "react";
import StyledFooter from "../../commonComponents/footer";
import StyledHeader from "../../commonComponents/header";
import MainContext from "./MainContext";

function SettingsPage(params) {
  return (
    <>
      <StyledHeader />
      <MainContext />
      <StyledFooter />
    </>
  )
}

export default SettingsPage;