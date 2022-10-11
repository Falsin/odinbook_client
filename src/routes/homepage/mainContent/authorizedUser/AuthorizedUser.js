import React from "react";
import styled from "styled-components";
import CommonContext from "../../../../commonContext";

import StyledAccount from "./Account";
import StyledLocalSearch from "../../../friendsPage/mainContent/LocalSearch/LocalSearch";

function AuthorizedUser({className, children}) {
  return (
    <CommonContext.Consumer>
      {(context) => {
        return (
          <div id="authorizedUser" className={className}>
            <StyledAccount credential={context.commonInfo.credential} />

            <div id="news">
              <ul>
                <li>News 1</li>
                <li>News 2</li>
                <li>News 3</li>
              </ul>
            </div>

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

  #news {
      width: 50%;
    }
    #account {
      width: 25%;
    }

    ul {
      list-style-type: none;
    }
`

export default StyledAuthorizedUser;