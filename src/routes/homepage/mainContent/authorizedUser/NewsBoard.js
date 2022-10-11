import React from "react";
import styled from "styled-components";

function NewsBoard({className, children, context}) {
  async function submit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const request = await fetch(process.env.SERVER_URL + 'post', {
      credentials: "include",
      method: "POST",
      body: formData
    })

    const response = await request.json();

    if (response) {
      console.log(response);
    }
  }

  return (
    <div className={className}>
      <form onSubmit={(e) => submit(e)}>
        <input name="text" placeholder={"What's on your mind, " + context.commonInfo.credential.first_name + "?"} />
        <input name="photo" type="file" />
        <button>Send</button>
      </form>

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
  padding: 0 2vmin;

  input:first-of-type {
    padding: 1vmin 1.5vmin 1vmin 1.5vmin;
    width: 100%;
  }
`

export default StyledNewsBoard;