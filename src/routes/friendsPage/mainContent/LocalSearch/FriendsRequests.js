import React, { useEffect, useState } from "react";
import CommonContext from "../../../../commonContext";
import StyledUserCard from "../GlobalSearh/UserCard";

function FriendsRequests ({request}) {
  const [arrayRequests, setArrayRequests] = useState([]);
  
  return (
    <CommonContext.Consumer>
      {(context) => {

        if (context.commonInfo.credential[request.nameArray].length !== arrayRequests.length) {
          getFriendRequests(request.nameArray, setArrayRequests)
        }

        return (
          <div>
            <h2>{request.headline}</h2>
            {!arrayRequests.length ? null : arrayRequests.map((item, id) => {
              return <StyledUserCard key={id} userObject={item} context={context} />
            })}
          </div>
        )
      }}
    </CommonContext.Consumer>
  )
}

async function getFriendRequests (nameArray, setArrayRequests) {
  const request = await fetch(process.env.SERVER_URL + nameArray, {
    credentials: "include"
  })

  const response = await request.json();

  if (response.length) {
    setArrayRequests(response);
  }
}

export default FriendsRequests;