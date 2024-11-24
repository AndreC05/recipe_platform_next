//page with a single post and its comments

import PostAndCommentsDisplay from "@/components/PostAndCommentDisplay";
import { FetchPosts } from "@/utils/actions";

export default async function PostAndCommentsPage({ params }) {
  const id = (await params).id;

  //Fetch all posts
  const posts = await FetchPosts();
  //Get current post to display
  const postData = posts.find((p) => p.id == Number(id));

  return (
    <>
      <PostAndCommentsDisplay postData={postData} />
    </>
  );
}
