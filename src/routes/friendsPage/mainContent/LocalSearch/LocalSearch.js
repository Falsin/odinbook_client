import React from "react";
import styled from "styled-components";
import StyledFriendsRequests from "./FriendsRequests";

function LocalSearch({context, className, children}) {
  const requestTypes = {
    friendRequests: {
      headline: "Friends",
      nameArray: "friends"
    },
    incomingRequests: {
      headline: "Incoming friends request",
      nameArray: "incoming_friends_requests"
    },
    outcomingRequests: {
      headline: "Outcoming friends request",
      nameArray: "outcoming_friends_requests"
    }
  }

  return (
    <ul className={className}>
      {Object.entries(requestTypes).map(([key, value], id) => {
        return !context.commonInfo.credential[value.nameArray].length 
            ? null 
            : <StyledFriendsRequests key={id} request={value} />
      })}
    </ul>
  )
}

const StyledLocalSearch = styled(LocalSearch)`
  list-style: none;
`

export default StyledLocalSearch;