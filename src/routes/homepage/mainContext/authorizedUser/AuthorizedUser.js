import React from "react";
import styled from "styled-components";
import { Buffer } from 'buffer';
import CommonContext from "../../../../commonContext";

function AuthorizedUser({className, children}) {
  return (
    <CommonContext.Consumer>
      {(context) => {
        const photo = context.commonInfo.credential.photo;
        const base64String = Buffer.from(photo.data.data).toString('base64');
        

        console.log(context.commonInfo.credential.photo)
        return (
          <div id="authorizedUser" className={className}>
      <div id="account">
        <ul>
          <li><img src={'data:' + photo.contentType + ";base64," + base64String}></img> and {context.commonInfo.credential.username}</li>
          <li><a href="/friends">Friends</a></li>
          <li><a href="/settings">Settings</a></li>
        </ul>
      </div>

      <div id="news">
        <ul>
          <li>News 1</li>
          <li>News 2</li>
          <li>News 3</li>
        </ul>
      </div>

      <div id="friends">
        <ul>
          <li>
            <h2>Incoming friends requests</h2>
            <ul>
              <li>1 Friend</li>
              <li>2 Friend</li>
              <li>3 Friend</li>
            </ul>
          </li>

          <li>
            <h2>Outcoming friends requests</h2>
            <ul>
              <li>1 Friend</li>
              <li>2 Friend</li>
              <li>3 Friend</li>
            </ul>
          </li>

          <li>
            <h2>Friends</h2>
            <ul>
              <li>1 Friend</li>
              <li>2 Friend</li>
              <li>3 Friend</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
        )
      }}
    </CommonContext.Consumer>
    /* <div id="authorizedUser" className={className}>
      <div id="account">
        <ul>
          <li>Logo and Full name</li>
          <li>Friends</li>
          <li>Settings</li>
        </ul>
      </div>

      <div id="news">
        <ul>
          <li>News 1</li>
          <li>News 2</li>
          <li>News 3</li>
        </ul>
      </div>

      <div id="friends">
        <ul>
          <li>
            <h2>Incoming friends requests</h2>
            <ul>
              <li>1 Friend</li>
              <li>2 Friend</li>
              <li>3 Friend</li>
            </ul>
          </li>

          <li>
            <h2>Outcoming friends requests</h2>
            <ul>
              <li>1 Friend</li>
              <li>2 Friend</li>
              <li>3 Friend</li>
            </ul>
          </li>

          <li>
            <h2>Friends</h2>
            <ul>
              <li>1 Friend</li>
              <li>2 Friend</li>
              <li>3 Friend</li>
            </ul>
          </li>
        </ul>
      </div>
    </div> */
  )
}

const StyledAuthorizedUser = styled(AuthorizedUser)`
  background: #616161;
  color: white;
  display: flex;
  padding: 5vmin;
  position: relative;

  #news {
      width: 50%;
    }
    #account, #friends {
      width: 25%;
    }

    ul {
      list-style-type: none;
    }
`

export default StyledAuthorizedUser;