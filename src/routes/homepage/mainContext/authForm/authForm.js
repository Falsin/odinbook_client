import React, { useState } from "react";
import styled from "styled-components";
import uniqid from "uniqid";
import CommonContext from "../../../../commonContext";
import StyledField from "./field";

function AuthForm({className, children, changeMode}) {
  const [credentials, setCredentials] = useState({});
  const [inputElementList] = useState(["username", "password"]);

  async function submit(e, context) {
    e.preventDefault();

    const invalidKeys = inputElementList.filter(item => !credentials[item]);
    let changedState;

    if (!invalidKeys.length) {
      const response = await request(context);

      if (Array.isArray(response)) {
        const changedReponse = response.map(item => item.param);
        changedState = changeState(changedReponse);
      } else {
        context.setCommonInfo({
          ...context.commonInfo,
          credential: response
        })
      }
    } else {
      changedState = changeState(invalidKeys);
    }

    setCredentials(changedState);
  }

  function changeState(arrayElements) {
    return arrayElements.reduce((prevVal, currVal) => {
      return {
        ...prevVal,
        [currVal]: null
      }
    }, {...credentials})
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

  async function loginWithFacebook(context) {
    /* const request =  await fetch(context.commonInfo.serverLink + "login/facebook", {
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://falsin.github.io'
      },
    })

    const response = await request.json(); */
    window.open(context.commonInfo.serverLink + "login/facebook", "_self");
  }

  return (
    <CommonContext.Consumer>
      {context => {
        return (
          <form className={className} onSubmit={e => submit(e, context)}>
            {inputElementList.map((item, id) => {
              return <StyledField key={id}
                name={item} 
                credentials={credentials} 
                setCredentials={setCredentials}  
                />
            })}

            <button>Log in</button>
            <button type="button" onClick={() => changeMode(true)}>Create new account</button>
            <button type="button">Test drive an existing account</button>
            {/* <a href={context.commonInfo.serverLink + "login/facebook"}>Log in with Facebook</a> */}
            <button onClick={() => loginWithFacebook(context)}>Log in with Facebook</button>
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