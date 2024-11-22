//page with all the posts

import PostsDisplay from "@/components/PostsDisplay";
import { FetchPosts, FindAuthorId } from "@/utils/actions";

export default async function PostsPage(searchParams) {
  //----------------------------------------------------Fetch Posts and find id of current author
  //TODO might neeed to move this to client to fix  it
  const posts = await FetchPosts();
  const author_name = (await searchParams).author;
  let id = null;
  if (author_name) {
    id = await FindAuthorId(author_name);
  }

  return (
    <>
      <h2>Welcome to the Posts Page!!</h2>
      <PostsDisplay posts={posts} id={id} />
    </>
  );
}
