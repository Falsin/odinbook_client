import React, { useEffect, useState } from "react";
import CommonContext from "../../../../commonContext";
import StyledUserCard from "../GlobalSearh/UserCard";

function FriendsRequests ({nameArray, headline}) {
  const [arrayRequests, setArrayRequests] = useState(null);

  useEffect(() => {
    getFriendRequests(nameArray, setArrayRequests)
  }, [])
  
  return (
    <CommonContext.Consumer>
      {(context) => {
        console.log(arrayRequests)
        /* return (() => {
          return !arrayRequests ? null : arrayRequests.map((item, id) => {
            return (
              <div>
                <h2>{headline}</h2>
                <StyledUserCard key={id} userObject={item} context={context} />
              </div>
            )
          })

        })() */
        return (
          <div>
            <h2>{headline}</h2>
            {!arrayRequests ? null : arrayRequests.map((item, id) => {
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

  console.log(response)

  if (response.length) {
    setArrayRequests(response);
  }
}

export default FriendsRequests;