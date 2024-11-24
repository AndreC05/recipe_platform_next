"use client";
import { useSearchParams } from "next/navigation";

export default function UpdateCommentForm() {
  //------------------------------------------------------------SearchParams
  const searchParams = useSearchParams();
  const post_id = searchParams.get("post_id");
  const comment_id = searchParams.get("comment_id");

  return (
    <>
      <input
        hidden
        id="comment_id"
        name="comment_id"
        value={comment_id}
        readOnly
      />
      <input hidden id="post_id" name="post_id" value={post_id} readOnly />
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
