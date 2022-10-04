import React, { useState } from "react";
import styled from "styled-components";
import uniqid from "uniqid";
import CommonContext from "../../../../commonContext";

function RegistForm({className, children, changeMode}) {
  let id;

  const [credential, setCredential] = useState({})

  function setUniqId() {
    id = uniqid();
    return id;
  }

  const [confirmPasswordIsValid, setStatusConfirmPassword] = useState(true);

  async function submit(e, context) {
    e.preventDefault();

    const formData = new FormData(e.target);

    let response = await fetch(process.env.SERVER_URL, {
      credentials: "include",
      method: "POST",
      body: formData
    })
    response = await response.json();

    if (typeof response === "object") {
      changeMode(false);
      context.setCommonInfo({
        credential: response
      })
    }
  }

  function changeCredential(e) {
    setCredential({
      ...credential,
      [e.target.name]: e.target.value
    })
  }

  return (
    <CommonContext.Consumer>
      {(context) => {
        return (
          <form className={className} onSubmit={(e) => submit(e, context)}>
            <div className="field">
              <label htmlFor={setUniqId()}>First name</label>
              <input name="first_name" id={id} type="text" onChange={(e) => changeCredential(e)} />
            </div>

            <div className="field">
              <label htmlFor={setUniqId()}>Last name</label>
              <input name="last_name" id={id} type="text" onChange={(e) => changeCredential(e)} />
            </div>

            <div className="field">
              <label htmlFor={setUniqId()}>Username</label>
              <input name="username" id={id} type="text" onChange={(e) => changeCredential(e)} />
            </div>

            <div className="field">
              <label htmlFor={setUniqId()}>Password</label>
              <input name="password" id={id} type="password" onChange={(e) => changeCredential(e)} />
            </div>

            <div className={confirmPasswordIsValid ? "field" : "field error"}>
              <label htmlFor={setUniqId()}>Confirm password</label>
              <input name="confirm_password" id={id} type="password" onChange={(e) => changeCredential(e)}  />
            </div>

            <div className="field">
              <label htmlFor={setUniqId()}>Birth date</label>
              <input name="birth_date" id={id} type="date" onChange={(e) => changeCredential(e)} />
            </div>

            <div className="field">
              <label htmlFor={setUniqId()}>Photo</label>
              <input name="photo" id={id} type="file" onChange={(e) => changeCredential(e)} />
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