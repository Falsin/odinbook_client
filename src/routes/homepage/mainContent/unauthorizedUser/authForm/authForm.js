import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CommonContext from "../../../../../commonContext";
import StyledField from "./field";

function AuthForm({className, children, changeMode}) {
  const defaultState = {
    username: null,
    password: null
  }

  const [credentials, setCredentials] = useState({...defaultState});

  async function submit(e, context) {
    e.preventDefault();

    const invalidKeys = Object.values(credentials).filter(item => !item);
    let changedState;

    if (!invalidKeys.length) {
      const response = await request();

      if (Array.isArray(response)) {
        const changedReponse = response.map(item => item.param);
        changedState = changeState(changedReponse);
      } else {
        setCredentials({...defaultState}) 
        return context.setCommonInfo({
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
        [currVal]: ""
      }
    }, credentials)
  }

  async function request() {
    const request =  await fetch(process.env.SERVER_URL + "login", {
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
            {Object.keys(credentials).map((item, id) => {
              return <StyledField key={id}
                name={item} 
                credentials={credentials} 
                setCredentials={setCredentials}  
                />
            })}

            <button>Log in</button>
            <button type="button" onClick={() => changeMode(true)}>Create new account</button>
            <button type="button">Test drive an existing account</button>
            <a href={process.env.SERVER_URL + "login/facebook"}>Log in with Facebook</a>
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