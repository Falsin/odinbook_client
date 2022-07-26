import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Buffer } from 'buffer';

function UserCard ({userObject, context, className, children}) {
  const [friendStatus, setFriendStatus] = useState(null);

  useEffect(() => {
    changeFriendStatus()
  }, [userObject._id])

  function changeFriendStatus() {
    const currentUser = context.commonInfo.credential;
    
    if (currentUser.outcoming_friends_requests.includes(userObject._id)) {
      setFriendStatus("outcomingRequests");
    } else if (currentUser.friends.includes(userObject._id)) {
      setFriendStatus("friend");
    } else if (currentUser.incoming_friends_requests.includes(userObject._id)) {
      setFriendStatus("incomingRequests");
    } 
  }

  async function addFriend() {
    await sendRequest("friend", "PUT");
    setFriendStatus("outcomingRequests")
  }

  async function acceptRequest() {
    await sendRequest("incoming_friends_requests", "PUT");
    setFriendStatus("friend")
  }

  async function deleteFriend() {
    await sendRequest("friend", "DELETE");
    setFriendStatus("incomingRequests")
  }

  async function cancelRequest() {
    await sendRequest("outcoming_friends_requests", "DELETE");
    setFriendStatus(null)
  }

  async function sendRequest(routeName, method) {
    const request = await fetch(process.env.SERVER_URL + routeName, {
      method: method,
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
    }
  }

  const base64String = Buffer.from(userObject.photo.bufferObject.data).toString('base64');
  return (
    <li className={className}>
      <div>
        <img src={'data:' + userObject.photo.contentType + ";base64," + base64String}></img>
        <p>{userObject.first_name} {userObject.last_name}</p>
      </div>

      {(() => {
        if (!friendStatus) {
          return <button onClick={addFriend}>Add friend</button>
        } else if (friendStatus === "outcomingRequests") {
          return <div>
            <p>Friend request sent</p>
            <button onClick={cancelRequest}>Cancel request</button>
          </div>
        } else if (friendStatus === "friend") {
          return <button onClick={deleteFriend}>Delete friend</button>
        } else if (friendStatus === "incomingRequests") {
          return <button onClick={acceptRequest}>Accept request</button>
        }
      })()}
    </li>
  )
}

const StyledUserCard = styled(UserCard)`
  padding: 2vmin;
  min-width: 200px;

  div:first-of-type {
    display: flex;
    align-items: center;
    margin-bottom: 2vmin;

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
    padding: 1vmin 1.5vmin 1vmin 1.5vmin;
    margin-top: 2vmin;
    display: block;
  }
`

export default StyledUserCard;