import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CommonContext from "../../../../../../commonContext";
import CommentsBlock from "./commentsBlock/CommentsBlock";
import { StyledTextareaForPost } from "../../../../../../commonComponents/Textarea";
import PhotoComponent from "../../../../../../commonComponents/PhotoComponent";

const Post = React.memo(({post, className, children, settingFunction}) => {
  const [isEditMode, setMode] = useState(false);
  const [isCommentBlockActive, setCommentBlockStatus] = useState(false);
  const [postObject, setPostObject] = useState(post);

  async function deletePost(e) {
    e.preventDefault();

    const request = await fetch(process.env.SERVER_URL + "post", {
      credentials: "include",
      method: "DELETE",
      body: JSON.stringify({_id: postObject._id}),
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
    formData.append("id", postObject._id);

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

  async function addOrDeletePostInLikes(e, context) {
    e.preventDefault();
    let response;

    if (!postObject.likes.includes(context.commonInfo.credential._id)) {
      response = await getRequest("PUT")
    } else {
      response = await getRequest("DELETE")
    }

    if (response) {
      setPostObject({
        ...postObject,
        likes: response
      })
    }
  }

  async function getRequest(method) {
    const request = await fetch(process.env.SERVER_URL + `post/${post._id}/like`, {
      credentials: "include",
      method: method,
    });
    return request.json();
  }

  return (
    <CommonContext.Consumer>
      {(context) => {
        return (
          <li className={className + (isEditMode ? " editMode" : "")} >
            <form onSubmit={submit}>
              <label>{postObject.author.username}</label>
              <label>{postObject.date}</label>
              {!postObject.content.text ? null : <StyledTextareaForPost contentBlock={postObject} mode={isEditMode} />}
              <PhotoComponent photoBlock={postObject.content.photo} mode={isEditMode} />
              <button onClick={(e) => addOrDeletePostInLikes(e, context)}>Likes {postObject.likes.length}</button>
              <div>
                {!(context.commonInfo.credential._id === postObject.author._id) 
                  ? null 
                  : <>
                      {!isEditMode ? <button onClick={changeMode}>Edit post</button> : <button>Save</button>}
                      {!isEditMode ? <button onClick={deletePost}>Delete post</button> : <button onClick={changeMode}>Cancel</button>}
                    </>
                }
                <button type="button" onClick={() => setCommentBlockStatus(!isCommentBlockActive)}>
                  {!isCommentBlockActive ? `Comments ${postObject.comments.length}` : `Close comments`}
                </button>
              </div>
          
            </form>
            <CommentsBlock status={isCommentBlockActive} post={postObject} setPost={setPostObject}  />
          </li>
        )
      }}
    </CommonContext.Consumer>
  )
}, (prevProps, nextProps) => prevProps.date === nextProps.date)

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