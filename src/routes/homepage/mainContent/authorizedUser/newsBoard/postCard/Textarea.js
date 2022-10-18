import React, { useEffect, useState } from "react";
import uniqid from "uniqid";

function Textarea({post}) {
  const [height, setHeight] = useState(null);
  const classTextarea = uniqid();

  useEffect(() => {
    const textarea = document.querySelector(`.${classTextarea}`);
    setHeight(textarea.scrollHeight + "px")
  })

  return (
    <textarea value={post.content.text} readOnly className={classTextarea} style={{height: height ? height : null}} onClick={(e) => click(e)}></textarea>
  )
}

export default Textarea;