import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";

function GlobalSearch() {
  const [friendsArray, setFriendsArray] = useState(null);

  useEffect(() => {
    findPeople(process.env.SERVER_URL)
    console.log(process.env.SERVER_URL)
  }, [])

  async function findPeople() {
    const request = await fetch(process.env.SERVER_URL + "people", {
      method: "GET",
      credentials: "include"
    });
    const response = await request.json();
    setFriendsArray(response)
  }

  return (
    <div>
      {!friendsArray ? "No users found" : friendsArray.map((item, id) => {
        return <UserCard key={id} userObject={item} />
      })}
    </div>
  )
}

export default GlobalSearch;