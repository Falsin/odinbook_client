import React from "react";
import styled from "styled-components";
import uniqid from "uniqid";

function AuthForm({className, children, changeMode}) {
  let id;

  function setUniqId() {
    id = uniqid();
    return id;
  }

  return (
    <form className={className}>
      <div className="field">
        <label htmlFor={setUniqId()}>Login</label>
        <input id={id} type="text" />
      </div>

      <div className="field">
        <label htmlFor={setUniqId()}>Password</label>
        <input id={id} type="password" />
      </div>

      <button>Log in</button>
      <button type="button" onClick={() => changeMode(true)}>Create new account</button>
      <button type="button">Test drive an existing account</button>
      <button>Log in with Facebook</button>
    </form>
  )
}

const StyledAuthForm = styled(AuthForm)`
  display: flex;
  flex-direction: column;
  width: 50%;

  .field {
    display: flex;

    label {
      min-width: 65px;
      display: inline-block;
    }

    input {
      flex-grow: 1;
    }
  }
`

export default StyledAuthForm;