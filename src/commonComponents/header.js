import React from "react";
import styled from "styled-components";
import CommonContext from "../commonContext";

function Header({className, children}) {
  return (
    <CommonContext.Consumer>
      {(context) => {
        return (
          <header className={className}>
            <h1>Odinbook</h1>
            <h1>{context.commonInfo.credential.username}</h1>
          </header>
        )
      }

      }
    </CommonContext.Consumer>
  )
}

const StyledHeader = styled(Header)`
  background: rgb(56, 56, 56);
  color: white;
  padding: 2vmin;
`

export default StyledHeader;