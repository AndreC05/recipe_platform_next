//Form for users to login
"use client";

import { useEffect } from "react";
import { useContext } from "react";
import { AuthorContext } from "@/utils/AuthorContext.jsx";

export default function LoginForm({ Authors }) {
  //-----------------------------------------------------------------Use Author Context
  let { author, setAuthor, allAuthors, setAllAuthors } =
    useContext(AuthorContext);

  useEffect(() => {
    setAllAuthors(Authors);
  }, [allAuthors, setAllAuthors, Authors]);

  //----------------------------------------------------------------Handle Input Changes

  function handleChanges(event) {
    setAuthor({
      ...author,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <>
      <label htmlFor="author_name">Username:</label>
      <input
        type="text"
        name="author_name"
        id="author_name"
        onChange={handleChanges}
        minLength={3}
        maxLength={20}
        required
      />
      <button type="submit">Submit!</button>
    </>
  );
}
