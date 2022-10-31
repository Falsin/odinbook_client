import React from "react";

function CommentsBlock ({status, post}) {
  //console.log(post.comments)
  function submit(e) {
    e.preventDefault();

    
  }

  return !status
    ? null
    : <div>
      <form onSubmit={submit}>
        <textarea />
        <button>Send comment</button>
      </form>
    </div>
}

export default CommentsBlock;