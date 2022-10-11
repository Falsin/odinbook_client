import React from "react";
import styled from "styled-components";

function NewsBoard({className, children}) {
  return (
    <div className={className}>
      <ul>
        <li>News 1</li>
        <li>News 2</li>
        <li>News 3</li>
      </ul>
    </div>
  )
}

const StyledNewsBoard = styled(NewsBoard)`
  width: 50%;
`

export default StyledNewsBoard;