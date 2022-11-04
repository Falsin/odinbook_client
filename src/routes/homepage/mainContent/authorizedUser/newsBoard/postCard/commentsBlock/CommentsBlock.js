import React, { useEffect, useState } from "react";
import CommonContext from "../../../../../../../commonContext";
import Comment from "./CommentComponent";


function CommentsBlock ({status, post}) {
  const [commentsArray, setCommentsArray] = useState([]);

  useEffect(() => {
    bindGetComments()
  }, [post._id])

  /* useEffect(() => {
    (async () => {
      const request = await fetch(process.env.SERVER_URL + `comments/${post._id}`, {
        credentials: "include",
      })

      const response = await request.json();

      setCommentsArray(response);
    })()
  }, [post._id]) */

  async function getComments() {
    const request = await fetch(process.env.SERVER_URL + `comments/${this._id}`, {
      credentials: "include",
    })

    const response = await request.json();

    setCommentsArray(response);
  }

  const bindGetComments = getComments.bind(post)

  //console.log(commentsArray)

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
      setCommentsArray([response, ...commentsArray])
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
          {/* {commentsArray.map((item, id) => <Comment getComments={bindGetComments} key={id} comment={item} />)} */}
          {commentsArray.map((item, id) => <Comment getComments={bindGetComments} key={item._id} comment={item} />)}
        </ul>
      </div>
}

export default CommentsBlock;