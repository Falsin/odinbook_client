import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

function Textarea({contentBlock, mode, className, children}) {
  const [value, setValue] = useState(contentBlock.content.text);
  const textarea = useRef(null)

  useEffect(() => {
    window.addEventListener('resize', () => settingHeight());

    settingHeight()
  }, [])

  useEffect(() => {
    setValue(contentBlock.content.text);
  }, [mode])

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
      className={className + " " + contentBlock._id} 
      value={value} 
      onChange={(e) => changeValue(e)}
      readOnly={mode ? false : true} 
      ref={textarea} 
    />
  )
}

export const StyledTextareaForPost = styled(Textarea)`
    background: none;
    color: white;
    border: none;
    outline: none;
    display: inline-block;
    overflow: hidden;
    box-sizing: border-box;
`

export const StyledTextareaForComment = styled(Textarea)`
    background: none;
    color: white;
    border: none;
    outline: none;
    display: inline-block;
    overflow: hidden;
    box-sizing: border-box;
`