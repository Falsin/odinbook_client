import React, { useState, useEffect } from "react";
import StyledUserCard from "./UserCard";
import styled from "styled-components";
import CommonContext from "../../../../commonContext";

function GlobalSearch({className, children}) {
  const [friendsArray, setFriendsArray] = useState(null);

  useEffect(() => {
    findPeople(process.env.SERVER_URL)
  }, [])

  async function findPeople() {
    const request = await fetch(process.env.SERVER_URL + "people", {
      credentials: "include"
    });
    const response = await request.json();
    setFriendsArray(response)
  }

  return (
    <CommonContext.Consumer>
      {(context) => {
        return (
          <div className={className}>
            {!friendsArray ? "No users found" : friendsArray.map((item, id) => {
              return <StyledUserCard key={id} userObject={item} context={context} />
            })}
          </div>
        )
      }}
    </CommonContext.Consumer>
  )
}

const StyledGlobalSearch= styled(GlobalSearch)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

export default StyledGlobalSearch;