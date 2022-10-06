import React, { useEffect, useState } from "react";
import { Buffer } from 'buffer';

function LocalSearch({context}) {
  return (
    <div id="localSearch">
      <div id="friends">
        {context.commonInfo.credential.friends.map(item => {
          return <div>A person</div>
        })}
      </div>

      <div id="incoming_friends_requests">
        {context.commonInfo.credential.incoming_friends_requests.map(item => {
          return <div>A person</div>
        })}
      </div>

      {/* <div id="outcoming_friends_requests">
        {context.commonInfo.credential.outcoming_friends_requests.map(item => {
          fetch(process.env.SERVER_URL + "outcoming_friends_requests", {
            credentials: "include"
          })
          return <div>{item.first_name} {item.last_name}</div>
        })}
      </div> */}

      <OutcomingFriendsRequests />
    </div>
  )
}

function OutcomingFriendsRequests () {
  const [arrayRequests, setArrayRequests] = useState(null);

  useEffect(() => {
    getOutcomingFriendsRequests()
  }, [])

  async function getOutcomingFriendsRequests () {
    const request = await fetch(process.env.SERVER_URL + "outcoming_friends_requests", {
      credentials: "include"
    })

    const response = await request.json();

    console.log(response)

    if (response.length) {
      setArrayRequests(response);
    }
  }
  
  return (
    <div>
      <h2>Outcoming friends request</h2>
      {!arrayRequests ? null : arrayRequests.map((item, id) => {
        const base64String = Buffer.from(item.photo.bufferObject.data).toString('base64');
        return (
          <div key={id}>
            <div>
              <img src={'data:' + item.photo.contentType + ";base64," + base64String}></img>
              <p>{item.first_name} {item.last_name}</p>
            </div>

            <button onClick={() => AddFriend(context)}>Добавить в друзья</button>
          </div>
        )
      })}
    </div>
  )
}

export default LocalSearch;