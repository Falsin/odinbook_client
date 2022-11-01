import React from "react";

function Comment ({comment}) {
  return <li>{comment.content.text}</li>
}

export default Comment;