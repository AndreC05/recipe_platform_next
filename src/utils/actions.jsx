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

//-------------------------------------------------------Fetch all Comments for a specific post
export async function FetchComments(post_id) {
  const result =
    await db.query(`SELECT recipe_comments.id, recipe_authors.name AS author, recipe_comments.content, TO_CHAR(recipe_comments.comment_date, 'YYYY-MM-DD') AS date, recipe_comments.likes, recipe_comments.post_id
FROM recipe_comments
JOIN recipe_authors ON recipe_comments.author_id = recipe_authors.id
WHERE recipe_comments.post_id = ${post_id}
ORDER BY recipe_comments.id DESC;`);
  const comments = result.rows;

  return comments;
}

//--------------------------------------------------Update Post

export async function UpdatePost(post) {
  db.query(``);
}

//------------------------------------------------------------HandleLikeBtn

export async function handleLikeBtn(post) {
  db.query(`UPDATE recipe_posts SET likes = likes + 1 WHERE id = ${post.id}`);
}

//------------------------------------------------------------HandleCommentBtn
export async function handleCommentBtn(post) {
  redirect(`/posts/${post.id}`);
}

//------------------------------------------------------------HandleEditBtn
export async function handleEditBtn(post) {
  redirect(`/posts/edit?post_id=${post.id}`);
}

//------------------------------------------------------------HandleDeleteBtn
export async function handleDeleteBtn(post, author) {
  if (author === post.author) {
    db.query(`DELETE FROM recipe_comments WHERE post_id = ${post.id}`);
    db.query(`DELETE FROM recipe_posts WHERE id = ${post.id}`);
  }
}

//-----------------------------------------------------------Handle Comments Likes
export async function handleLikeCommentBtn(comment) {
  db.query(
    `UPDATE recipe_comments SET likes = likes + 1 WHERE id = ${comment.id}`
  );
}

//------------------------------------------------------------Handle comment edit
export async function handleEditCommentBtn(comment, post) {
  redirect(
    `/posts/${post.id}/edit?comment_id=${comment.id}&post_id=${post.id}`
  );
}

//------------------------------------------------------------Handle Comment delete
export async function handleDeleteCommentBtn(comment, author) {
  if (author === comment.author) {
    db.query(`DELETE FROM recipe_comments WHERE id = ${comment.id}`);
  }
}

//------------------------------------------------------------HandleAddCommentBtn
export async function handleAddCommentBtn(post) {
  redirect(`/posts/${post.id}/addComment?post_id=${post.id}`);
}
