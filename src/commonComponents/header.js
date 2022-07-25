import React from "react";
import styled from "styled-components";

function Header({className, children}) {
  return (
    <header className={className}>
      <h1>Odinbook</h1>
    </header>
  )
}

const StyledHeader = styled(Header)`
  background: rgb(56, 56, 56);
  color: white;
  padding: 2vmin;
`

export default StyledHeader;