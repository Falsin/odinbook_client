import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Buffer } from 'buffer';
import CommonContext from "../../../../commonContext";

function UserCard ({userObject, context, className, children}) {
  const [friendStatus, setFriendStatus] = useState(null);

  useEffect(() => {
    const currentUser = context.commonInfo.credential;

    if (currentUser.outcoming_friends_requests.includes(userObject._id)) {
      setFriendStatus("outcomingRequests");
    } else if (currentUser.friends.includes(userObject._id)) {
      setFriendStatus("friend");
    } else if (currentUser.incoming_friends_requests.includes(userObject._id)) {
      setFriendStatus("outcomingRequests");
    } 
  }, [])

  async function AddFriend(context) {
    const request = await fetch(process.env.SERVER_URL + "friend", {
      method: "PUT",
      body: JSON.stringify({_id: userObject._id}),
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const response = await request.json();

    if (response) {
      await context.setCommonInfo({
        credential: response
      })
      setFriendStatus("outcomingRequests")
    }
  }

  const base64String = Buffer.from(userObject.photo.bufferObject.data).toString('base64');
  return (
    <div className={className}>
      <div>
        <img src={'data:' + userObject.photo.contentType + ";base64," + base64String}></img>
        <p>{userObject.first_name} {userObject.last_name}</p>
      </div>

      {(() => {
        if (!friendStatus) {
          return <button onClick={AddFriend}>Add friend</button>
        } else if (friendStatus === "outcomingRequests") {
          return <button>Friend request sent</button>
        } else if (friendStatus === "friend") {
          return <button>Delete friend</button>
        }
      })()}
    </div>
  )
}

const StyledUserCard = styled(UserCard)`
  padding: 2vmin;
  min-width: 200px;

  div {
    display: flex;
    align-items: center;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    p {
      display: inline-block;
    }
  }

  button {
    display: block;
  }
`

export default StyledUserCard;