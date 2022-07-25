import React from "react";
import styled from "styled-components";
import Form from "./form";

function MainContext({className, children}) {
  return (
    <div className={className}>
      <div id="about">
        <h2>Odinbook</h2>
        <p>Connect with friends and the world around you on Odinbook.</p>
      </div>
      <Form />
    </div>
  )
}

const StyledMainContext = styled(MainContext)`
  background: #616161;
  color: white;
  display: flex;

  & > * {
    width: 50%;
  }
`

export default StyledMainContext;