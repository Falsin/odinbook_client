import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CommonContext from "../../../../commonContext";
import StyledField from "./field";
import uniqid from "uniqid";

/* function AuthForm({className, children, changeMode}) {
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

  console.log(credentials)

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
            <a href={context.commonInfo.serverLink + "login/facebook"}>Log in with Facebook</a>
          </form>
        )
      }}
    </CommonContext.Consumer>
  )
} */

/* function AuthForm({className, children, changeMode}) {
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
        setCredentials({}) 
        console.log('изменяю состояние родителя')
        // в будущем это изменение состояния можно убрать, 
        //так как при нажатии на форму будет происходить какое-то действие
        //например, переход на новую страницу
        return context.setCommonInfo({
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

  return (
    <CommonContext.Consumer>
      {context => {
        return (
          <form className={className} onSubmit={e => submit(e, context)}>
            {inputElementList.map((item, id) => {
              return <StyledField key={uniqid()}
                name={item} 
                credentials={credentials} 
                setCredentials={setCredentials}  
                />
            })}

            <button>Log in</button>
            <button type="button" onClick={() => changeMode(true)}>Create new account</button>
            <button type="button">Test drive an existing account</button>
            <a href={context.commonInfo.serverLink + "login/facebook"}>Log in with Facebook</a>
          </form>
        )
      }}
    </CommonContext.Consumer>
  )
} */

function AuthForm({className, children, changeMode}) {
  /* const [credentials, setCredentials] = useState({});
  const [inputElementList] = useState(["username", "password"]); */
  const [credentials, setCredentials] = useState({
    username: null,
    password: null
  });

  async function submit(e, context) {
    e.preventDefault();

    //const invalidKeys = inputElementList.filter(item => !credentials[item]);
    const invalidKeys = Object.values(credentials).filter(item => !item);
    let changedState;

    if (!invalidKeys.length) {
      const response = await request(context);

      if (Array.isArray(response)) {
        const changedReponse = response.map(item => item.param);
        changedState = changeState(changedReponse);
      } else {
        setCredentials({
          username: null,
          password: null
        }) 
        return context.setCommonInfo({
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
        [currVal]: ""
      }
    }, credentials)
  }

  /* function changeState(arrayElements) {
    return arrayElements.reduce((prevVal, currVal) => {
      return {
        ...prevVal,
        [currVal]: null
      }
    }, {...credentials})
  } */

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
            {Object.keys(credentials).map((item, id) => {
              return <StyledField key={id}
                name={item} 
                credentials={credentials} 
                setCredentials={setCredentials}  
                />
            })}
            {/* {inputElementList.map((item, id) => {
              return <StyledField key={uniqid()}
                name={item} 
                credentials={credentials} 
                setCredentials={setCredentials}  
                />
            })} */}

            <button>Log in</button>
            <button type="button" onClick={() => changeMode(true)}>Create new account</button>
            <button type="button">Test drive an existing account</button>
            <a href={context.commonInfo.serverLink + "login/facebook"}>Log in with Facebook</a>
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