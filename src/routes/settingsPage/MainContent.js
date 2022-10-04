import React from "react";
import { useNavigate } from "react-router-dom";
import CommonContext from "../../commonContext";

function MainContent() {
  const navigate = useNavigate();

  async function deleteAccount(context) {
    const request = await fetch(process.env.SERVER_URL + "account", {
      body: JSON.stringify(context.commonInfo.credential),
      method: "DELETE",
      credentials: "include"
    })
    const response = await request.json();

    if (response) {
      await context.setCommonInfo({
        credential: null
      })
      navigate("/")
    }
  }

  return (
    <CommonContext.Consumer>
      {(context) => {
        return (
          <div>
            <div id="account">
              <img></img>
              <div>Name</div>
              <button onClick={() => deleteAccount(context)}>Delete account</button>
            </div>
          </div>
        )
      }}
    </CommonContext.Consumer>
  )
}

export default MainContent;