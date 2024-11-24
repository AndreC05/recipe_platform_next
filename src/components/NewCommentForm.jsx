"use client";
import { useSearchParams } from "next/navigation";
import { useContext } from "react";
import { AuthorContext } from "@/utils/AuthorContext.jsx";

export default function NewCommentForm() {
  //-----------------------------------------------------------------Use Author Context
  let { author } = useContext(AuthorContext);

  //------------------------------------------------------------SearchParams
  const searchParams = useSearchParams();
  const id = searchParams.get("post_id");

  return (
    <>
      <input
        hidden
        id="author_id"
        name="author_id"
        value={author.author_id}
        readOnly
      />
      <input hidden id="post_id" name="post_id" value={id} readOnly />
      <div className="content">
        <label htmlFor="content">Comment:</label>
        <textarea
          type="text"
          id="content"
          name="content"
          minLength={5}
          maxLength={255}
          required
        />
      </div>
      <div className="submitBtn">
        <button type="submit">Submit</button>
      </div>
    </>
  );
}
