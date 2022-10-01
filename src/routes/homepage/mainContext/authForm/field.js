import React, { useEffect, useState } from "react";
import styled from "styled-components";
import uniqid from "uniqid";

/* function Field({name, credentials, setCredentials, className, children}) {
  let id;
  const [isError, setIsErrorStatus] = useState(false);

  useEffect(() => {
    setIsErrorStatus((!credentials || credentials[name] === null) ? true : false)
  })

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

  function Blur(e) {
    if (e.target.value === "") {
      setCredentials({
        ...credentials,
        [e.target.name]: null
      })
    }
  }

  return (
    <div className={className}>
      <label htmlFor={setUniqId()}>{name}</label>
        <div className={isError ? "error" : ""}>
          <input id={id} type={name == "password" ? "password" : "text"} name={name} 
            onChange={changeCredentials} onBlur={Blur} />
        </div>
    </div>
  )
} */

function Field({name, credentials, setCredentials, className, children}) {
  let id;
  const [isError, setIsErrorStatus] = useState(false);

  const [testState, setTestState] = useState(credentials[name])

  useEffect(() => {
    setTestState(credentials[name])
    setIsErrorStatus(testState === "" ? true : false)
  })

  useEffect(() => {
    console.log("компонент смонтировался")
  }, [])

  function setUniqId() {
    id = uniqid();
    return id;
  }

  console.log(testState)

  function changeCredentials(e) {
    setCredentials({
      ...credentials,
      [name]: e.target.value
    })
    setTestState(e.target.value)
  }

  function Blur(e) {
    setTestState(e.target.value)
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
            onChange={changeCredentials} onBlur={Blur} value={testState ? testState : ""} />
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