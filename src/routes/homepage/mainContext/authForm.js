import React, { useState } from "react";
import styled from "styled-components";
import uniqid from "uniqid";
import CommonContext from "../../../commonContext";

function AuthForm({className, children, changeMode}) {
  const [credentials, setCredentials] = useState({});
  const [inputElementsStatus, setInputElementsStatus] = useState({
    username: true,
    password: true
  });

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

  async function submit(e, context) {
    e.preventDefault();

    const arrayKeys = Object.keys(inputElementsStatus);

    if (arrayKeys.every(item => credentials[item])) {
      const response = await request(context);
  
      if (Array.isArray(response)) {
        console.log(response)
      } else {
        context.setCommonInfo({
          ...context.commonInfo,
          credential: response
        })
      }
    } else {
      const objecStatus = arrayKeys.reduce((prevVal, currVal) => {
        return {
          ...prevVal, 
          [currVal]: credentials[currVal] ? true : false
        }
      }, {})

      setInputElementsStatus(objecStatus)
    }
  }

  async function request(context) {
    const request =  await fetch(context.commonInfo.serverLink + "login", {
      credentials: "include",
      body: JSON.stringify(credentials),
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
    })

    return request.json();
  }

  return (
    <CommonContext.Consumer>
      {context => {
        return (
          <form className={className} onSubmit={e => submit(e, context)}>
            <div className="field">
              <label htmlFor={setUniqId()}>Username</label>
              <div className={inputElementsStatus.username ? "" : "error"}>
                <input id={id} type="text" name="username"
                  onChange={changeCredentials}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor={setUniqId()}>Password</label>
              <div className={inputElementsStatus.username ? "" : "error"}>
                <input id={id} type="password" name="password" 
                onChange={changeCredentials} />
              </div>
            </div>

            <button>Log in</button>
            <button type="button" onClick={() => changeMode(true)}>Create new account</button>
            <button type="button">Test drive an existing account</button>
            <button>Log in with Facebook</button>
          </form>
        )
      }}
    </CommonContext.Consumer>
  )
}

const StyledAuthForm = styled(AuthForm)`
  display: flex;
  flex-direction: column;
  width: 50%;
  max-width: 400px;

  .field {
    display: flex;
    margin-top: 2vmin;

    label {
      min-width: 65px;
      display: inline-block;
    }

    div {
      flex-grow: 1;

      &.error::before {
          content: "Username must not be empty";
          background: yellow;
        }

      input {
      width: 100%;

      &.error {
        position: relative;
      }
    }
    }
  }

  button {
    margin-top: 2vmin;

    &:first-of-type {
      margin-top: 3vmin;
    }
  }
`

export default StyledAuthForm;