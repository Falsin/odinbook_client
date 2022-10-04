import React, { useState } from "react";
import StyledFooter from "../../commonComponents/footer";
import StyledHeader from "../../commonComponents/header";
import MainContent from "./mainContent/MainContent";

function FriendsPage () {
  /* const [isGlobalSearch, setSearchType] = useState[false];

  return (
    <CommonContext.Consumer>
      {(context) => {
        return (

        )
      }}
    </CommonContext.Consumer>
  ) */
  return (
    <>
      <StyledHeader />
      <MainContent />
      <StyledFooter />
    </>
  )
}

export default FriendsPage;