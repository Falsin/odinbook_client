import React, { useState } from "react";
import styled from "styled-components";
import StyledAuthForm from "./authForm/authForm";
import StyledRegistForm from "./registForm";


function UnauthorizedUser({className, children}) {
  const [isRegistMode, setRegistMode] = useState(false);

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

const StyledUnauthorizedUser = styled(UnauthorizedUser)`
  background: #616161;
  color: white;
  display: flex;
  padding: 5vmin;
  position: relative;

  #about {
    width: 50%;
  }  
`

export default StyledUnauthorizedUser;