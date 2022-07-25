import React from "react";
import styled from "styled-components";

function Footer({className, children}) {
  return (
    <footer className={className}>
      <a href="https://github.com/Falsin">made by Falsin</a>
    </footer>
  )
}

const StyledFooter = styled(Footer)`
  background: rgb(56, 56, 56);
  padding: 2vmin;
  text-align: center;

  a {
    color: white;
    text-decoration: none;
  }
`

export default StyledFooter;