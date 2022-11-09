import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";

const Comment = React.memo(({comment, setCommentsArray}) => {
  const [value, setValue] = useState(comment.content.text);
  const [isEditMode, setMode] = useState(false);

  /* useEffect(() => {
    setValue(value);
  }, [comment.date]) */

  useEffect(() => {
    setValue(value);
  })

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
    setCommentsArray(response);
    setMode(!isEditMode);
  }

  function cancelChange(e) {
    e.preventDefault();

    setMode(!isEditMode);
    setValue(comment.content.text);
  }

  async function deleteComment(e) {
    e.preventDefault();

    const request = await fetch(process.env.SERVER_URL + "comment", {
      credentials: "include",
      method: "DELETE",
      body: JSON.stringify({commentId: comment._id})
    })
  }

  function changeComment(e) {
    e.preventDefault();
    setMode(!isEditMode)
  }

  return (
    <li>
      <form onSubmit={submit}>
        <label>{comment.author.username}</label>
        <label>{comment.data}</label>
        <textarea name="text" value={value} onChange={(e) => setValue(e.target.value)} readOnly={!isEditMode ? true : false} />

        <CommentPhoto photo={comment.content.photo} mode={isEditMode} />

        {!isEditMode ? <button onClick={changeComment}>change comment</button> : <button>Save</button>}
        {!isEditMode ? <button onClick={deleteComment}>delete comment</button> : <button onClick={cancelChange}>Cancel</button>}

      </form>
    </li>
  )
}, (prevProps, nextProps) => prevProps.comment.date === nextProps.comment.date)

function CommentPhoto({photo, mode}) {
  const [photoComponent, setPhoto] = useState(photo);

  const base64String = photoComponent ? Buffer.from(photoComponent.bufferObject.data).toString('base64') : null;

  useEffect(() => {
    setPhoto(photo)
  }, [mode])
  
  return (
    (() => {
      if (mode) {
        return !photoComponent 
          ? <input type="file" name="photo" />
          : <div>
              <button onClick={() => setPhoto(null)}>Delete photo</button>
              <img src={'data:' + photoComponent.contentType + ';base64,' + base64String} />
            </div>
      } else {
        return !photoComponent 
          ? null 
          : <div>
              <img src={'data:' + photoComponent.contentType + ';base64,' + base64String} />
            </div>
      }
    })()
  )
}

export default Comment;