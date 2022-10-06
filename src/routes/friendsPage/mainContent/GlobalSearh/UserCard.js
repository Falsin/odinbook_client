import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Buffer } from 'buffer';
import CommonContext from "../../../../commonContext";

function UserCard ({userObject, className, children}) {
  //const [isFriend, setFriendStatus]

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
      context.setCommonInfo({
        credential: response
      })
    }
  }

  const base64String = Buffer.from(userObject.photo.bufferObject.data).toString('base64');
  return (
    <CommonContext.Consumer>
      {(context) => {
        return (
          <div className={className}>
            <div>
              <img src={'data:' + userObject.photo.contentType + ";base64," + base64String}></img>
              <p>{userObject.first_name} {userObject.last_name}</p>
            </div>

            <button onClick={() => AddFriend(context)}>Добавить в друзья</button>
          </div>
        )
      }}
    </CommonContext.Consumer>
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