import React from "react";
import styled from "styled-components";
import uniqid from "uniqid";

function RegistForm({className, children}) {
  let id;

  function setUniqId() {
    id = uniqid();
    return id;
  }

  return (
    <form className={className}>
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
        <input id={id} type="password" />
      </div>

      <div className="field">
        <label htmlFor={setUniqId()}>Confirm password</label>
        <input id={id} type="password" />
      </div>

      <button>Sign in</button>
    </form>
  )
}

const StyledRegistForm = styled(RegistForm)`
  position: absolute;
  background: black;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
/*   display: flex;
  flex-direction: column;

  .field {
    display: flex;

    label {
      min-width: 65px;
      display: inline-block;
    }

    input {
      flex-grow: 1;
    }
  } */
`

export default StyledRegistForm;