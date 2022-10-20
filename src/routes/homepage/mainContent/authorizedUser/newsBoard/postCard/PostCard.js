import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Buffer } from 'buffer';
import Textarea from "./Textarea";

const Post = React.memo(({post, className, children, settingFunction}) => {
  const [isEditMode, setMode] = useState(false);

  useEffect(() => {
    console.log('смонтировался')
  }, [])

  console.log(post)

  async function deletePost(e) {
    e.preventDefault();

    const request = await fetch(process.env.SERVER_URL + "post", {
      credentials: "include",
      method: "DELETE",
      body: JSON.stringify({_id: post._id}),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const response = await request.json();

    if (response) {
      settingFunction(response);
    }
  }

  const base64String = post.content.photo ? Buffer.from(post.content.photo.bufferObject.data).toString('base64') : null;

  return (
    <li className={className + (isEditMode ? "editMode" : " ")} >
      <form>
        <label>{post.author.username}</label>
        <label>{post.date}</label>
        {!post.content.text ? null : <Textarea post={post} />}
        {!post.content.photo ? null : <img src={'data:' + post.content.photo.contentType + ";base64," + base64String}></img>}
        <button>Edit post</button>
        <button onClick={deletePost}>Delete post</button>
      </form>
    </li>
  )
}, (prevProps, nextProps) => {
  return prevProps.post._id === nextProps.post._id;
})

/* function Post({post, className, children, settingFunction}) {
  const [isEditMode, setMode] = useState(false);

  useEffect(() => {
    console.log('смонтировался')
  }, [])

  console.log('update')

  async function deletePost(e) {
    e.preventDefault();

    const request = await fetch(process.env.SERVER_URL + "post", {
      credentials: "include",
      method: "DELETE",
      body: JSON.stringify({_id: post._id}),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const response = await request.json();

    if (response) {
      settingFunction(response);
    }
  }

  const base64String = post.content.photo ? Buffer.from(post.content.photo.bufferObject.data).toString('base64') : null;

  return (
    <li className={className + (isEditMode ? "editMode" : " ")} >
      <form>
        <label>{post.author.username}</label>
        <label>{post.date}</label>
        {!post.content.text ? null : <Textarea post={post} />}
        {!post.content.photo ? null : <img src={'data:' + post.content.photo.contentType + ";base64," + base64String}></img>}
        <button>Edit post</button>
        <button onClick={deletePost}>Delete post</button>
      </form>
    </li>
  )
} */

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