import React from "react";
import FriendsRequests from "./FriendsRequests";

function LocalSearch({context}) {
  const RequestTypes = {
/*     friendRequests: {
      headline: "Friends",
      nameArray: "friends"
    },*/
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
      {Object.entries(RequestTypes).map(([key, value], id) => {
        return <FriendsRequests key={id} headline={value.headline} nameArray={value.nameArray} />
      })}
    </div>
  )
}

export default LocalSearch;