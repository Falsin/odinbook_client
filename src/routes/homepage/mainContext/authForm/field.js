import React, { useState } from "react";
import styled from "styled-components";
import uniqid from "uniqid";


function Field({name, inputElementsStatus, credentials, setCredentials, className, children}) {
  let id;

  function setUniqId() {
    id = uniqid();
    return id;
  }

  function changeCredentials(e) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value.trim()
    })
  }

  return (
    <div className={className}>
      <label htmlFor={setUniqId()}>{name}</label>
        <div className={name + (inputElementsStatus[name] ? "" : " error")}>
          <input id={id} type={name == "password" ? "password" : "text"} name={name} 
            onChange={changeCredentials} />
        </div>
    </div>
  )
}

const StyledField = styled(Field)`
  display: flex;
  margin-top: 3vmin;
  align-items: center;

  label {
    min-width: 65px;
    margin-right: 2vmin;
    display: inline-block;
  }

  div {
    flex-grow: 1;
    position: relative;

    &.error::before {
      content: "${props => props.name + " must not be empty"}";
      position: absolute;
      transform-origin: center bottom;
      transform: translateY(-100%);
      top: 0;
    }

    input {
      width: 100%;
      padding: 0.8vmin;
    }
  }
`

export default StyledField;