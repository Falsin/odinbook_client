import React from "react";

function Post({post}) {
  return (
    <li>
      {post.content.text}
    </li>
  )
}

export default Post;