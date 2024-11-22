"use client";

import Link from "next/link";
import { redirect } from "next/navigation";

export default function PostsBtns() {
  function handleNewPost() {
    redirect(`/posts/new`);
  }

  return (
    <div className="PostBtns">
      <button className="NewPostBtn" onClick={handleNewPost}>
        Add a new post
      </button>
      <div className="PostFilters">
        <h4>Order Posts By:</h4>
        <Link href={"/posts?sort=asc"}>Sort Ascending</Link> |{" "}
        <Link href={"/posts?sort=desc"}>Sort Descending</Link>
      </div>
    </div>
  );
}
