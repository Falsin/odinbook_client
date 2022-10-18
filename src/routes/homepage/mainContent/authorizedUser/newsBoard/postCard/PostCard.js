import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Buffer } from 'buffer';
import Textarea from "./Textarea";

function Post({post, className, children}) {
  const [isEditMode, setMode] = useState(false);

  console.log(post.content)
  const base64String = post.content.photo ? Buffer.from(post.content.photo.bufferObject.data).toString('base64') : null;

  return (
    <li className={className + (isEditMode ? "editMode" : " ")} >
      <form>
        <label>{post.author.username}</label>
        <label>{post.date}</label>
        {!post.content.text ? null : <Textarea post={post} />}
        {!post.content.photo ? null : <img src={'data:' + post.content.photo.contentType + ";base64," + base64String}></img>}
        <button>Edit post</button>
        <button>Delete post</button>
      </form>
    </li>
  )
}

const StyledPost = styled(Post)`
  margin-top: 2vmin;

  textarea {
    background: none;
    color: white;
    border: none;
    outline: none;
    display: inline-block;
    overflow: hidden;
    box-sizing: border-box;
  }
`

export default StyledPost;