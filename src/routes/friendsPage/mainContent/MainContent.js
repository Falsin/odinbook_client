import React, { useState } from "react";
import styled from "styled-components";
import CommonContext from "../../../commonContext";
import LocalSearch from "./LocalSearch";
import GlobalSearch from "./GlobalSearch";

function MainContent({className, children}) {
  const [isGlobalSearch, setSearchType] = useState(false);

  return (
    <CommonContext.Consumer>
      {(context) => {
        return (
          <div className={className}>
            <div className="searchField">
              <input placeholder="search friend" /> 
              <button onClick={() => setSearchType(!isGlobalSearch)}>{isGlobalSearch ? "Global search" : "Local search"}</button>
            </div>
          
            {isGlobalSearch ? <GlobalSearch /> : <LocalSearch context={context} />}
          </div>
        )
      }}
    </CommonContext.Consumer>
  )
}

const StyledMainContent = styled(MainContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default StyledMainContent;