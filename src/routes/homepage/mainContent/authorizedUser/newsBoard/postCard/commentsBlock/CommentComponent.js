import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { StyledTextareaForComment } from "../../../../../../../commonComponents/Textarea";
import PhotoComponent from "../../../../../../../commonComponents/PhotoComponent";
import CommonContext from "../../../../../../../commonContext";

const Comment = React.memo(({comment, setCommentsArray}) => {
  const [isEditMode, setMode] = useState(false);
  const [commentObject, setCommentObject] = useState(comment);

  useEffect(() => {
    setCommentObject(comment)
  }, [comment.date])

  async function submit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set("commentId", comment._id);

    if (!formData.get("photo")) {
      formData.set("photo", new File([Buffer.from(comment.content.photo.bufferObject.data)], "photo", {
        type: comment.content.photo.contentType
      }))
    }

    const request = await fetch(process.env.SERVER_URL + "comment", {
      credentials: "include",
      method: "PUT",
      body: formData
    })

    const response = await request.json();
    setCommentObject(response)
    setMode(!isEditMode);
  }

  function cancelChange(e) {
    e.preventDefault();

    setMode(!isEditMode);
  }

  async function deleteComment(e) {
    e.preventDefault();
    const request = await fetch(process.env.SERVER_URL + "comment", {
      credentials: "include",
      method: "DELETE",
      body: JSON.stringify({commentId: comment._id}),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const response = await request.json();

    if (response) {
      setCommentsArray(response);
    }
  }

  function changeComment(e) {
    e.preventDefault();
    setMode(!isEditMode)
  }

  async function addOrDeleteCommentInLikes(e, context) {
    e.preventDefault();
    let response;

    if (!commentObject.likes.includes(context.commonInfo.credential._id)) {
      response = await getRequest("PUT");
    } else {
      response = await getRequest("DELETE");
    }

    if (response) {
      setCommentObject(response);
    }
  }

  async function getRequest(method) {
    const request = await fetch(process.env.SERVER_URL + `comment/${comment._id}/like`, {
      credentials: "include",
      method: method,
    });
    return request.json();
  }

  return (
    <CommonContext.Consumer>
      {(context) => {
        return (
          <li>
            <form onSubmit={submit}>
              <label>{commentObject.author.username}</label>
              <label>{commentObject.data}</label>
              {!commentObject.content.text ? null : <StyledTextareaForComment contentBlock={commentObject} mode={isEditMode} />}
              <PhotoComponent photoBlock={commentObject.content.photo} mode={isEditMode} />

              <button onClick={(e) => addOrDeleteCommentInLikes(e, context)}>Likes {commentObject.likes.length}</button>
              {!(context.commonInfo.credential._id === commentObject.author._id) 
                ? null
                : <div>
                  {!isEditMode ? <button onClick={changeComment}>change comment</button> : <button>Save</button>}
                  {!isEditMode ? <button onClick={deleteComment}>delete comment</button> : <button onClick={cancelChange}>Cancel</button>}
                </div>
              }
            </form>
          </li>
        )
      }}
    </CommonContext.Consumer>

  )
}, (prevProps, nextProps) => prevProps.comment.date === nextProps.comment.date)

export default Comment;