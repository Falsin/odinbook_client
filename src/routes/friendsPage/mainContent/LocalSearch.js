import React from "react";

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

      <div id="outcoming_friends_requests">
        {context.commonInfo.credential.outcoming_friends_requests.map(item => {
          return <div>A person</div>
        })}
      </div>
    </div>
  )
}

export default LocalSearch;