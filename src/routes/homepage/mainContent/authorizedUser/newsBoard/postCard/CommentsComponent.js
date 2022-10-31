import React from "react";

function CommentsBlock ({status, post}) {
  //console.log(post.comments)
  async function submit(e) {
    e.preventDefault();

    let form = new FormData(e.target);
    form.append('postId', post._id);

    const request = await fetch(process.env.SERVER_URL + Comment, {
      credentials: "include",
      method: "POST",
      body: form
    })

  }

  return !status
    ? null
    : <div>
      <form onSubmit={submit}>
        <textarea name="comment" />
        <button>Send comment</button>
      </form>
    </div>
}

export default CommentsBlock;