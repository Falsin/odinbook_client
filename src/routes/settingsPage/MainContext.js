import React from "react";
import CommonContext from "../../commonContext";

function MainContext() {
  return (
    <CommonContext.Consumer>
      {(context) => {
        console.log(context)
        return (
          <div>
            <div id="account">
              <img></img>
              <div>Name</div>
              <button>Delete account</button>
            </div>
          </div>
        )
      }}
    </CommonContext.Consumer>
  )
}

export default MainContext;