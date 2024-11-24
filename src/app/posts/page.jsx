//page with all the posts

import PostsDisplay from "@/components/PostsDisplay";
import { Suspense } from "react";

export default async function PostsPage() {
  return (
    <>
      <h2>Welcome to the Posts Page!!</h2>
      <Suspense fallback={<p>Loading form...</p>}>
        <PostsDisplay />
      </Suspense>
    </>
  );
}
