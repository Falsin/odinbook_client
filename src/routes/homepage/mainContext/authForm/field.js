import React, { useEffect, useState } from "react";
import styled from "styled-components";
import uniqid from "uniqid";

function Field({name, credentials, setCredentials, className, children}) {
  let id;
  const [isError, setIsErrorStatus] = useState(false);

  useEffect(() => {
    setIsErrorStatus(credentials[name] === "" ? true : false)
  })

  function setUniqId() {
    id = uniqid();
    return id;
  }

  function changeCredentials(e) {
    setCredentials({
      ...credentials,
      [name]: e.target.value
    })
  }

  function Blur(e) {
    setCredentials({
      ...credentials,
      [name]: e.target.value
    })
  }

  return (
    <div className={className}>
      <label htmlFor={setUniqId()}>{name}</label>
        <div className={isError ? "error" : ""}>
            <input id={id} type={name == "password" ? "password" : "text"} name={name} 
            onChange={changeCredentials} onBlur={Blur} value={credentials[name] ? credentials[name] : ""} />
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
      content: "${({name}) => name + " must not be empty"}";
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