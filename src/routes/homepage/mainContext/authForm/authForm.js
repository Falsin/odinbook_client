import React, { useState } from "react";
import styled from "styled-components";
import uniqid from "uniqid";
import CommonContext from "../../../../commonContext";
import StyledField from "./field";

function AuthForm({className, children, changeMode}) {
  const [credentials, setCredentials] = useState({});
  const [inputElementsStatus, setInputElementsStatus] = useState({
    username: true,
    password: true
  });

  let id;

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
            {Object.keys(inputElementsStatus).map(item => {
              return <StyledField key={uniqid()}
              name={item} 
              credentials={credentials} 
              setCredentials={setCredentials}  
              inputElementsStatus={inputElementsStatus}
              size={300}
              />
            })}

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

  button {
    margin-top: 2vmin;
    padding: 0.8vmin;

    &:first-of-type {
      margin-top: 3vmin;
    }
  }
`

export default StyledAuthForm;