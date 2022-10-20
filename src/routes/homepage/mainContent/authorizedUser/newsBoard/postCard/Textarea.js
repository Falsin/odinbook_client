import React, { useEffect, useState } from "react";
import uniqid from "uniqid";

function Textarea({post}) {
  const [height, setHeight] = useState(null);
  const [classTextarea] = useState(uniqid());

/*   useEffect(() => {
    setHeight(null);

    //window.addEventListener('resize', () => setHeight(null));
    //window.onresize = () => setHeight(null);
  }, [post._id])

  
  useEffect(() => {
    const textarea = document.querySelector(`.${classTextarea}`);
  
    console.log(post.content.text);
    console.log(height);
    console.log(textarea.scrollHeight)

  
    if (!height) {
      setHeight(textarea.scrollHeight + "px");
    }
  }) */
  
  useEffect(() => {
    window.addEventListener('resize', () => setHeight(null));
    //console.log('смонтировался')
  }, [])

  useEffect(() => {
    setHeight(null);
  }, [post._id])
  
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