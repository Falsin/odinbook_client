import React, { useState } from "react";
import styled from "styled-components";
import CommonContext from "../../../../commonContext";
import StyledUserCard from "../GlobalSearh/UserCard";

function FriendsRequests ({request, className, children}) {
  const [arrayRequests, setArrayRequests] = useState([]);
  
  return (
    <CommonContext.Consumer>
      {(context) => {

        if (context.commonInfo.credential[request.nameArray].length !== arrayRequests.length) {
          getFriendRequests(request.nameArray, setArrayRequests)
        }

        return (
          <li className={className}>
            <ul>
              <h2>{request.headline}</h2>
              {!arrayRequests.length ? null : arrayRequests.map((item, id) => {
                return <StyledUserCard key={id} userObject={item} context={context} />
              })}
            </ul>
          </li>
        )
      }}
    </CommonContext.Consumer>
  )
}

const StyledFriendsRequests = styled(FriendsRequests)`
  ul {
    list-style: none;
  }
`

async function getFriendRequests (nameArray, setArrayRequests) {
  const request = await fetch(process.env.SERVER_URL + nameArray, {
    credentials: "include"
  })

  const response = await request.json();

  console.log(response)
  if (response.length) {
    setArrayRequests(response);
  }
}

export default StyledFriendsRequests;