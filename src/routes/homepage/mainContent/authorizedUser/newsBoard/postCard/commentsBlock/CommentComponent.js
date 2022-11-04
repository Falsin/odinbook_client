import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";

const Comment = React.memo(({comment, getComments}) => {
  const [commentPhoto, setPhoto] = useState(comment.content.photo);
  const [value, setValue] = useState(comment.content.text);
  const [isEditMode, setMode] = useState(false);
  console.log(comment._id)

  useEffect(() => {
    setPhoto(comment.content.photo);
    setValue(value);
  }, [comment.date])

  async function submit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("commentId", comment._id);

    const request = await fetch(process.env.SERVER_URL + "comment", {
      credentials: "include",
      method: "PUT",
      body: formData
    })

    const response = await request.json();

    if (response) {
      getComments();
      setMode(!isEditMode)
    }
  }

  function cancelChange() {
    setMode(!isEditMode);
    setPhoto(comment.content.photo);
    setValue(comment.content.text);
  }

  const base64String = commentPhoto ? Buffer.from(commentPhoto.bufferObject.data).toString('base64') : null;

  return (
    <li>
      <form onSubmit={submit}>
        <label>{comment.author.username}</label>
        <label>{comment.data}</label>
        <textarea name="text" value={value} onChange={(e) => setValue(e.target.value)} readOnly={!isEditMode ? true : false} />

        <CommentPhoto comment={comment} mode={isEditMode} />

        {!isEditMode 
          ? <button type="button" onClick={() => setMode(!isEditMode)}>change comment</button> 
          : <>
              <button>Save</button>
              <button type="button" onClick={cancelChange} >Cancel</button>
            </>
        }
      </form>
    </li>
  )
}, (prevProps, nextProps) => prevProps.comment.date === nextProps.comment.date)

/* function Comment ({comment, getComments}) {
  const [commentPhoto, setPhoto] = useState(comment.content.photo);
  const [value, setValue] = useState(comment.content.text);
  const [isEditMode, setMode] = useState(false);
  console.log(comment._id)

  useEffect(() => {
    setPhoto(comment.content.photo);
    setValue(value);
  }, [comment.date])

  async function submit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("commentId", comment._id);

    const request = await fetch(process.env.SERVER_URL + "comment", {
      credentials: "include",
      method: "PUT",
      body: formData
    })

    const response = await request.json();

    if (response) {
      getComments();
      setMode(!isEditMode)
    }
  }

  function cancelChange() {
    setMode(!isEditMode);
    setPhoto(comment.content.photo);
    setValue(comment.content.text);
  }

  const base64String = commentPhoto ? Buffer.from(commentPhoto.bufferObject.data).toString('base64') : null;

  return (
    <li>
      <form onSubmit={submit}>
        <label>{comment.author.username}</label>
        <label>{comment.data}</label>
        <textarea name="text" value={value} onChange={(e) => setValue(e.target.value)} readOnly={!isEditMode ? true : false} />

        <CommentPhoto comment={comment} mode={isEditMode} />

        {!isEditMode 
          ? <button type="button" onClick={() => setMode(!isEditMode)}>change comment</button> 
          : <>
              <button>Save</button>
              <button type="button" onClick={cancelChange} >Cancel</button>
            </>
        }
      </form>
    </li>
  )
} */

function CommentPhoto({comment, mode}) {
  const [commentPhoto, setPhoto] = useState(comment.content.photo);
  const base64String = commentPhoto ? Buffer.from(commentPhoto.bufferObject.data).toString('base64') : null;

  useEffect(() => {
    setPhoto(comment.content.photo)
  }, [comment.date])

  //console.log(comment)

  return (
    (() => {
      if (mode) {
        return !commentPhoto 
          ? <input type="file" name="photo" />
          : <div>
              <button>Delete photo</button>
              <img src={'data:' + commentPhoto.contentType + ';base64,' + base64String} />
            </div>
      } else {
        return !commentPhoto 
          ? null 
          : <div>
              <img src={'data:' + commentPhoto.contentType + ';base64,' + base64String} />
            </div>
      }
    })()
  )
}

export default Comment;