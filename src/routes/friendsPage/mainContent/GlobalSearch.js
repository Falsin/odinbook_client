import React, { useState, useEffect } from "react";

function GlobalSearch() {
  const [friendsArray, setFriendsArray] = useState([]);

  useEffect(() => {
    findPeople(process.env.SERVER_URL)
    console.log(process.env.SERVER_URL)
  }, [])

  async function findPeople() {
    const request = await fetch(process.env.SERVER_URL + "people");

  }

  return (
    <div>This is a global search</div>
  )
}

export default GlobalSearch;