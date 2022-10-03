import React from "react";
import styled from "styled-components";
import { Buffer } from 'buffer';

function Account({className, children, credential}) {
  const base64String = Buffer.from(credential.photo.bufferObject.data).toString('base64');

  return (
    <div className={className}>
      <ul>
        <li><img src={'data:' + credential.photo.contentType + ";base64," + base64String}></img> <span>{credential.username}</span></li>
        <li><a href="/friends">Friends</a></li>
        <li><a href="/settings">Settings</a></li>
      </ul>
    </div>
  )
}

const StyledAccount = styled(Account)`
  width: 25%;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  span {
    display: block;
  }
`

export default StyledAccount;