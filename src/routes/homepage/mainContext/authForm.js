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
      [e.target.name]: e.target.value
    })
  }

  async function submit(e, context) {
    e.preventDefault();

    const arrayKeys = Object.keys(inputElementsStatus);

    if (arrayKeys.every(item => credentials[item])) {
      const request =  await fetch(context.commonInfo.serverLink + "login", {
        credentials: "include",
        body: JSON.stringify(credentials),
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
      })

      const response = await request.json();
  
      if (Array.isArray(response)) {
        response.forEach(item => console.log(item.msg))
      } else {
        console.log(response)
        context.setCommonInfo({
          ...context.commonInfo,
          credential: response
        })
      }
    } else {
      const objecStatus = arrayKeys.reduce((prevVal, currVal) => {

        if (credentials[currVal]) {
          return {
            ...prevVal,
            [currVal]: true,
          }
        } else {
          return {
            ...prevVal,
            [currVal]: false,
          }
        }
      }, {})

      console.log(objecStatus)

      setInputElementsStatus(objecStatus)
    }
  }

  return (
    <CommonContext.Consumer>
      {context => {
        return (
          <form className={className} onSubmit={e => submit(e, context)}>
            <div className="field">
              <label htmlFor={setUniqId()}>Username</label>
              <input id={id} type="text" name="username"
                onChange={changeCredentials} className={inputElementsStatus.username ? "" : "error"}
              />
            </div>

            <div className="field">
              <label htmlFor={setUniqId()}>Password</label>
              <input id={id} type="password" name="password" 
              onChange={changeCredentials} className={inputElementsStatus.password ? "" : "error"} />
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

    input {
      flex-grow: 1;

      &.error {
        background: red;
      }
    }
  }

  button {
    margin-top: 2vmin;

    &:first-of-type {
      margin-top: 3vmin;
    }
  }

/*   button:first-child {
      margin-top: 3vmin;
    } */
`

export default StyledAuthForm;