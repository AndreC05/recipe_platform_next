"use client";
import { AuthorContext } from "@/utils/AuthorContext";
import Link from "next/link";
import { useContext } from "react";

export default function Nav() {
  let { isLogin } = useContext(AuthorContext);

  return (
    <>
      <Link href={"/about"}>About</Link> | <Link href={"/login"}>Login</Link> |
      {isLogin && <Link href={"/posts"}>Posts</Link>}
    </>
  );
}
