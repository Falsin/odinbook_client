import React from "react";
import styled from "styled-components";
import CommonContext from "../commonContext";

function Header({className, children}) {
  async function logOut(context) {
    const request = await fetch(process.env.SERVER_URL + 'logout', {
      method: "POST",
      credentials: "include",
      body: {}
    })
    const response = await request.json();

    context.setCommonInfo({
      credential: response
    })
  }

  return (
    <CommonContext.Consumer>
      {(context) => {
        return (
          <header className={className}>
            <h1>Odinbook</h1>
            {!context.commonInfo.credential 
            ? null
            : <div>
                <h1>{context.commonInfo.credential.username}</h1>
                <button onClick={() => logOut(context)}>Log out</button>
              </div>
            }
          </header>
        )
      }}
    </CommonContext.Consumer>
  )
}

const StyledHeader = styled(Header)`
  background: rgb(56, 56, 56);
  color: white;
  padding: 2vmin 5vmin 2vmin 5vmin;
  display: flex;
  justify-content: space-between;

  & div {
    display: flex;

    h1 {
      margin-right: 2vmin;
    }
  }
`

export default StyledHeader;