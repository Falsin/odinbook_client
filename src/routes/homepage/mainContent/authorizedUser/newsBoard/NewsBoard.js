import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "./PostCard";

function NewsBoard({className, children, context}) {
  const [newsArray, setNewsArray] = useState([]);

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

  useEffect(() => {
    console.log("смонтировался")
    setNews()
  }, [])

  async function setNews() {
    const request = await fetch(process.env.SERVER_URL + 'posts', {
      credentials: "include",
    })

    const response = await request.json();

    if (response.length) {
      console.log(response)
      setNewsArray(response);
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
        {newsArray.map((item, id) => <Post key={id} post={item} />)}
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