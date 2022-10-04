import React, { useState } from "react";
import CommonContext from "../../../commonContext";
import StyledUnauthorizedUser from "./unauthorizedUser/UnauthorizedUser";
import StyledAuthorizedUser from "./authorizedUser/AuthorizedUser";

function MainContent({className, children}) {
  return (
    <CommonContext.Consumer>
      {(context) => {
        return !context.commonInfo.credential 
            ? <StyledUnauthorizedUser /> 
            : <StyledAuthorizedUser />
      }}
    </CommonContext.Consumer>
  )
}

export default MainContent;