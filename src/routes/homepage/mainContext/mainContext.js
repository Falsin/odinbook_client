import React, { useState } from "react";
import styled from "styled-components";
import CommonContext from "../../../commonContext";
import StyledAuthForm from "./authForm";
import StyledRegistForm from "./registForm";


function MainContext({className, children}) {
  const [isRegistMode, setRegistMode] = useState(false);

  return (
    <CommonContext.Consumer>
      {(context) => {
        return (
          <div className={className}>
            <div id="about">
              <h2>Odinbook</h2>
              <p>Connect with friends and the world around you on Odinbook.</p>
            </div>
            <StyledAuthForm changeMode={setRegistMode} />
            {isRegistMode ? <StyledRegistForm changeMode={setRegistMode} /> : null}
          </div>
        )
      }
      }
    </CommonContext.Consumer>
  )
}

const StyledMainContext = styled(MainContext)`
  background: #616161;
  color: white;
  display: flex;
  padding: 5vmin;
  position: relative;

  #about {
    width: 50%;
  }
`

export default StyledMainContext;