import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Textarea({post, mode, className, children}) {
  const [height, setHeight] = useState(null);
  const [value, setValue] = useState(post.content.text);
  
  useEffect(() => {
    window.addEventListener('resize', () => setHeight(null));
  }, [])

  useEffect(() => {
    setHeight(null);
  }, [post._id])
  
  useEffect(() => {
    const textarea = document.getElementsByClassName(`${className}`);
  
    if (!height) {
      setHeight(textarea.scrollHeight + "px");
    }

    if (value !== post.content.text && !mode) {
      setValue(post.content.text)
    }
  })

  function changeValue(e) {
    setValue(e.target.value);
    
  }

  return (
    <textarea name="text" className={className} value={value} onChange={(e) => changeValue(e)} readOnly={mode ? false : true} style={{height: height}} />
  )
}

const StyledTextarea = styled(Textarea)`
    background: none;
    color: white;
    border: none;
    outline: none;
    display: inline-block;
    overflow: hidden;
    box-sizing: border-box;
`

export default StyledTextarea;