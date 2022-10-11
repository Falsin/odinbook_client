import React from "react";
import styled from "styled-components";
import CommonContext from "../../../../commonContext";

import StyledAccount from "./Account";
import StyledLocalSearch from "../../../friendsPage/mainContent/LocalSearch/LocalSearch";
import StyledNewsBoard from "./NewsBoard";

function AuthorizedUser({className, children}) {
  return (
    <CommonContext.Consumer>
      {(context) => {
        return (
          <div id="authorizedUser" className={className}>
            <StyledAccount credential={context.commonInfo.credential} />

            <StyledNewsBoard context={context} />

            <div id="friends">
              <StyledLocalSearch context={context} />
            </div>
          </div>
        )
      }}
    </CommonContext.Consumer>
  )
}

const StyledAuthorizedUser = styled(AuthorizedUser)`
  background: #616161;
  color: white;
  display: flex;
  padding: 5vmin;
  position: relative;

  ul {
    list-style-type: none;
  }
`

export default StyledAuthorizedUser;