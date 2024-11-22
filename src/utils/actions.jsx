"use server";
import { db } from "@/utils/utilities";
import { redirect } from "next/navigation";

export async function FetchAuthors() {
  //-----------------------------------------------Fetch all authors
  const result = await db.query(`SELECT id, name FROM recipe_authors;`);
  const Authors = result.rows;

  return Authors;
}

export async function FindAuthorId(name) {
  const Authors = await FetchAuthors();

  //------------------------------------------------Find current author id
  const id = Authors.find((author) => author.name == name).id;

  return id;
}

export async function FetchPosts() {
  //-----------------------------------------------Fetch all posts
  const result =
    await db.query(`SELECT recipe_posts.id, recipe_authors.name AS author, recipe_posts.title, recipe_posts.content, recipe_categories.name AS category, TO_CHAR(recipe_posts.post_date, 'YYYY-MM-DD') AS date, recipe_posts.likes
FROM recipe_posts
JOIN recipe_categories ON recipe_posts.category_id = recipe_categories.id
JOIN recipe_authors ON recipe_posts.author_id = recipe_authors.id
ORDER BY recipe_posts.id DESC;`);
  const posts = result.rows;

  return posts;
}

//------------------------------------------------------------HandleLikeBtn

export async function handleLikeBtn(post) {
  db.query(`UPDATE recipe_posts SET likes = likes + 1 WHERE id = ${post.id}`);
}

//------------------------------------------------------------HandleCommentBtn
export async function handleCommentBtn(post) {
  redirect(`/posts/${post.id}/addComment`);
}

//------------------------------------------------------------HandleEditBtn
export async function handleEditBtn(post) {
  redirect(`/posts/${post.id}/edit`);
}

//------------------------------------------------------------HandleDeleteBtn
export async function handleDeleteBtn(post, author) {
  console.log("Received post object:", post);
  console.log("Received author_name:", author);
  console.log("Deleting post with author:", post.author);
  if (author === post.author) {
    db.query(`DELETE FROM recipe_posts WHERE id = ${post.id}`);
  }
}
