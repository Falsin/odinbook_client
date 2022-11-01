import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";

function Comment ({comment, bindGetComments}) {
  const [commentPhoto, setPhoto] = useState(comment.content.photo);
  const [value, setValue] = useState(comment.content.text);
  const [isEditMode, setMode] = useState(false)

  useEffect(() => {
    setPhoto(comment.content.photo);
    setValue(value)
  }, [comment._id])

  function change(e) {
    setValue(e.target.value)

    //bindGetComments();
  }

  function submit() {
    e.preventDefault();

    bindGetComments();
  }

  const base64String = commentPhoto ? Buffer.from(commentPhoto.bufferObject.data).toString('base64') : null;

  return (
    <li>
      <form>
        <label>{comment.author.username}</label>
        <label>{comment.data}</label>
        <textarea value={value} onChange={change} readOnly={!isEditMode ? true : false} />

        {!commentPhoto 
          ? null 
          : <img src={'data:' + commentPhoto.contentType + ';base64,' + base64String} />
        }

        {!isEditMode 
          ? <button type="button" onClick={() => setMode(!isEditMode)}>change comment</button> 
          : <>
            <button>Save</button>
            <button type="button" onClick={() => setMode(!isEditMode)} >Cancel</button>
            </>
        }
      </form>
    </li>
  )
}

export default Comment;