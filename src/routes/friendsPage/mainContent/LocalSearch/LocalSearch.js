import React, { useEffect, useState } from "react";
import FriendsRequests from "./FriendsRequests";

function LocalSearch({context}) {
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
    <div id="localSearch">
      <ul>
        {Object.entries(requestTypes).map(([key, value], id) => {
          return !context.commonInfo.credential[value.nameArray].length 
              ? null 
              : <FriendsRequests key={id} request={value} />
        })}
      </ul>
    </div>
  )
}

export default LocalSearch;