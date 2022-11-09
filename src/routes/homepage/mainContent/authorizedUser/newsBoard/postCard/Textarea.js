import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

function Textarea({post, mode, className, children}) {
  const [value, setValue] = useState(post.content.text);
  const textarea = useRef(null)

  useEffect(() => {
    window.addEventListener('resize', () => settingHeight());

    settingHeight()
  }, [])

  function settingHeight() {
    textarea.current.style.height = "auto";

    const scrollHeight = textarea.current.scrollHeight + "px";
    textarea.current.style.height = scrollHeight;
  }

  function changeValue(e) {
    setValue(e.target.value);
    settingHeight()
  }
  
  return (
    <textarea 
      name="text" 
      className={className + " " + post._id} 
      value={value} 
      onChange={(e) => changeValue(e)}
      readOnly={mode ? false : true} 
      ref={textarea} 
    />
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