import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StyledTextarea from "./Textarea";
import PhotoComponent from "./PhotoComponent";

const Post = ({post, className, children, settingFunction}) => {
  const [isEditMode, setMode] = useState(false);

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

  async function changeMode(e) {
    e.preventDefault();

    setMode(!isEditMode);
  }

  async function submit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("id", post._id);

    const request = await fetch(process.env.SERVER_URL + "post", {
      credentials: "include",
      method: "PUT",
      body: formData,
    })

    const response = await request.json();

    if (response) {
      settingFunction(response);
      setMode(!isEditMode);
    }
  }

  return (
    <li className={className + (isEditMode ? " editMode" : "")} >
      <form onSubmit={submit}>
        <label>{post.author.username}</label>
        <label>{post.date}</label>
        {!post.content.text ? null : <StyledTextarea post={post} mode={isEditMode} />}
        <PhotoComponent post={post} mode={isEditMode} />
        {!isEditMode ? <button onClick={changeMode}>Edit post</button> : <button>Save</button>}
        {!isEditMode ? <button onClick={deletePost}>Delete post</button> : <button onClick={changeMode}>Cancel</button>}
      </form>
    </li>
  )
}

const StyledPost = styled(Post)`
  margin-top: 2vmin;

  img {
    max-height: 200px;
    max-width: 200px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
`

export default StyledPost;