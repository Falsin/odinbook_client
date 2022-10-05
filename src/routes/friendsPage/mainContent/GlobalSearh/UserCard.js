import React from "react";

function UserCard ({userObject}) {
  return (
    <div>{userObject.first_name}</div>
  )
}

export default UserCard;