import React from "react";
import styled from "styled-components";
import CommonContext from "../../../../commonContext";

import StyledAccount from "./Account";

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
              <ul>
                <li>
                  <h2>Incoming friends requests</h2>
                  <ul>
                    <li>1 Friend</li>
                    <li>2 Friend</li>
                    <li>3 Friend</li>
                  </ul>
                </li>

                <li>
                  <h2>Outcoming friends requests</h2>
                  <ul>
                    <li>1 Friend</li>
                    <li>2 Friend</li>
                    <li>3 Friend</li>
                  </ul>
                </li>

                <li>
                  <h2>Friends</h2>
                  <ul>
                    <li>1 Friend</li>
                    <li>2 Friend</li>
                    <li>3 Friend</li>
                  </ul>
                </li>
              </ul>
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