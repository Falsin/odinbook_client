import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CommonContext from "../../../../../../commonContext";
import CommentsBlock from "./commentsBlock/CommentsBlock";
import { StyledTextareaForPost } from "../../../../../../commonComponents/Textarea";
import PhotoComponent from "../../../../../../commonComponents/PhotoComponent";

const Post = React.memo(({post, className, children, settingFunction}) => {
  const [isEditMode, setMode] = useState(false);
  const [isCommentBlockActive, setCommentBlockStatus] = useState(false);
  const [numberComments, setNumberComments] = useState(post.comments.length);

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
    <CommonContext.Consumer>
      {(context) => {
        return (
          <li className={className + (isEditMode ? " editMode" : "")} >
            <form onSubmit={submit}>
              <label>{post.author.username}</label>
              <label>{post.date}</label>
              {!post.content.text ? null : <StyledTextareaForPost contentBlock={post} mode={isEditMode} />}
              <PhotoComponent photoBlock={post.content.photo} mode={isEditMode} />
              
              {/* <CommentPhoto photo={post.content.photo} mode={isEditMode} /> */}
              {!(context.commonInfo.credential._id === post.author._id) 
                ? null 
                : <>
                    {!isEditMode ? <button onClick={changeMode}>Edit post</button> : <button>Save</button>}
                    {!isEditMode ? <button onClick={deletePost}>Delete post</button> : <button onClick={changeMode}>Cancel</button>}
                  </>
                }
                <button type="button" onClick={() => setCommentBlockStatus(!isCommentBlockActive)}>
                  {!isCommentBlockActive ? `Comments ${numberComments}` : `Close comments`}
                  </button>
            </form>
            <CommentsBlock status={isCommentBlockActive} post={post} setNumberComments={setNumberComments}  />
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