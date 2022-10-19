import React, { useEffect, useState } from "react";
import uniqid from "uniqid";

function Textarea({post}) {
  const [height, setHeight] = useState(null);
  const [classTextarea] = useState(uniqid());

  useEffect(() => {
    window.addEventListener('resize', () => setHeight(null));
  }, [])

  useEffect(() => {
    const textarea = document.querySelector(`.${classTextarea}`);

    if (!height) {
      setHeight(textarea.scrollHeight + "px");
    }
  })

  return (
    <textarea value={post.content.text} readOnly className={classTextarea} style={{height: height}} />
  )
}

export default Textarea;