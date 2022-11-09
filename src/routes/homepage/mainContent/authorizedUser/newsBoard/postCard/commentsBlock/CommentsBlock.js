import React, { useEffect, useState } from "react";
import Comment from "./CommentComponent";

function CommentsBlock ({status, post}) {
  const [commentsArray, setCommentsArray] = useState([]);

  useEffect(() => {
    getComments()
  }, [post._id])

  async function getComments() {
    const request = await fetch(process.env.SERVER_URL + `post/${post._id}/comments`, {
      credentials: "include",
    })

    const response = await request.json();

    setCommentsArray(response);
  }

  async function submit(e, context) {
    e.preventDefault();

    let form = new FormData(e.target);
    e.target[0].value = "";
    e.target[1].value = "";

    form.append('postId', post._id);

    const request = await fetch(process.env.SERVER_URL + "comment", {
      credentials: "include",
      method: "POST",
      body: form
    })

    const response = await request.json();

    if (response) {
      setCommentsArray(response)
    }
  }

  return !status
    ? null
    : <div>
        <form onSubmit={submit}>
          <textarea name="text" />
          <input type="file" name="photo" />
          <button>Send comment</button>
        </form>

        <ul>
          {commentsArray.map((item, id) => <Comment setCommentsArray={setCommentsArray} key={item._id} comment={item} />)}
        </ul>
      </div>
}

export default CommentsBlock;