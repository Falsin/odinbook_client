import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Buffer } from 'buffer';
import StyledTextarea from "./Textarea";

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

    if (post.content.photo) {
      formData.append("photo", JSON.stringify(post.content.photo));
    }

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

  const base64String = post.content.photo ? Buffer.from(post.content.photo.bufferObject.data).toString('base64') : null;

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

function PhotoComponent({post, mode, setPostPhoto}) {
  const [photo, setPhoto] = useState(post.content.photo);

  function deletePhoto(e) {
    e.preventDefault()
    post.content.photo = null;
    console.log(post.content.photo)
    setPhoto(post.content.photo);
  }

  const base64String = post.content.photo ? Buffer.from(post.content.photo.bufferObject.data).toString('base64') : null;
  
  return (
    <>
      {(() => {
        if (mode) {
          if (!photo) {
            return <input name="photo" type="file" />
          } else {
            return (
              <div>
                {mode ? <button onClick={deletePhoto}>Delete photo</button> : null}
                <img src={'data:' + post.content.photo.contentType + ";base64," + base64String}/>
              </div>
            )
          }
        } else {
          if (photo) {
            return (
              <div>
                <img src={'data:' + photo.contentType + ";base64," + base64String}/>
              </div>
            )
          } else {
            return null;
          }
        }
      })()}
    </>
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