import React, { useState } from "react";
import styled from "styled-components";
import uniqid from "uniqid";
import CommonContext from "../../../commonContext";


function RegistForm({className, children}) {
  let id;

  function setUniqId() {
    id = uniqid();
    return id;
  }

  const [password, setPassword] = useState(null);
  const [confirmPasswordIsValid, setStatusConfirmPassword] = useState(true);

  function checkPassword(e) {
    if (!(password === e.target.value)) {
      setStatusConfirmPassword(false)
    }
  }

  async function submit(e, context) {
    e.preventDefault();
    console.log(context)

    let response = await fetch(context.commonInfo.serverLink, {
      credentials: "include",
    })
    response = await response.json();

    console.log(response)
  }

  return (
    <CommonContext.Consumer>
      {(context) => {
        return (
          <form className={className} onSubmit={(e) => submit(e, context)}>
            <div className="field">
              <label htmlFor={setUniqId()}>First name</label>
              <input id={id} type="text" />
            </div>

            <div className="field">
              <label htmlFor={setUniqId()}>Last name</label>
              <input id={id} type="text" />
            </div>

            <div className="field">
              <label htmlFor={setUniqId()}>Login</label>
              <input id={id} type="text" />
            </div>

            <div className="field">
              <label htmlFor={setUniqId()}>Password</label>
              <input id={id} onChange={(e) => setPassword(e.target.value)} type="password" />
            </div>

            <div className={confirmPasswordIsValid ? "field" : "field error"}>
              <label htmlFor={setUniqId()}>Confirm password</label>
              <input id={id} type="password" onBlur={checkPassword} />
            </div>

            <button>Sign up</button>
          </form>
        )
      }}
    </CommonContext.Consumer>
  )
}

const StyledRegistForm = styled(RegistForm)`
  position: absolute;
  background: rgba(100%, 100%, 100%, 1);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0 4vmin 4vmin 4vmin;
  color: black;

  .field {
    display: flex;
    margin-top: 2vmin;
    position: relative;
    
    label {
      min-width: 130px;
    }

    &.error::before {
      content: 'The Confirm Password confirmation does not match';
      color: red;
      position: absolute;
      font-size: 0.9em;
    }
  }

  button {
    margin-top: 2vmin;
  }
`

export default StyledRegistForm;