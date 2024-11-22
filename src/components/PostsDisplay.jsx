"use client";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthorContext } from "@/utils/AuthorContext.jsx";
import PostsBtns from "./PostsBtns";
import { useSearchParams } from "next/navigation";
import {
  handleCommentBtn,
  handleDeleteBtn,
  handleEditBtn,
  handleLikeBtn,
} from "@/utils/actions";

export default function PostsDisplay({ posts, id }) {
  const [postsArray, setPostsArray] = useState(posts); // Local state for posts

  //------------------------------------------------------------SearchParams
  const searchParams = useSearchParams();

  //-----------------------------------------------------------Update author Context with new author id
  //TODO Fix This (no longer setting author_id to local storage)
  let { author, setAuthor } = useContext(AuthorContext);

  useEffect(() => {
    if (id) {
      setAuthor((prevState) => ({ ...prevState, author_id: id }));
    }
  }, [id, setAuthor]);

  //------------------------------------------------------------Sort Posts

  useEffect(() => {
    const sort = searchParams.get("sort");
    setPostsArray((prevState) => {
      const sortedPosts = [...prevState];
      if (sort === "asc") {
        sortedPosts.sort((a, b) => a.id - b.id);
      } else if (sort === "desc") {
        sortedPosts.sort((a, b) => b.id - a.id);
      }
      return sortedPosts;
    });
  }, [searchParams]);

  //-------------------------------------------------------------Update Like Display
  const handleLike = async (post) => {
    await handleLikeBtn(post); // Server action
    // Update the likes count
    setPostsArray((prevState) =>
      prevState.map((prev) =>
        prev.id === post.id ? { ...prev, likes: prev.likes + 1 } : prev
      )
    );
  };

  //-------------------------------------------------------------Update Posts Displayed After Deleting
  const handleDelete = async (post) => {
    if (author.author_name === post.author) {
      await handleDeleteBtn(post, author.author_name);
      setPostsArray((prevState) =>
        prevState.filter((prev) => prev.id !== post.id)
      );
    }
  };

  return (
    <>
      <PostsBtns />
      {postsArray.map((post) => (
        <div key={post.id} className="post">
          <h2 id="authorDisplay">Author: {post.author}</h2>
          <h3 id="recipeDisplay">Recipe: {post.title}</h3>
          <h4 id="categoryDisplay">Category: {post.category}</h4>
          <p id="contentDisplay">{post.content}</p>
          <h4 id="dateDisplay">Date: {post.post_date}</h4>
          <p id="likesDisplay">Likes: {post.likes}</p>
          <button onClick={() => handleLike(post)} id="likeBtn">
            Like
          </button>
          <button onClick={() => handleCommentBtn(post)} id="commentBtn">
            Comment
          </button>
          <button onClick={() => handleEditBtn(post)} id="editBtn">
            Edit
          </button>
          <button
            onClick={() => handleDelete(post, author.author_name)}
            id="deleteBtn"
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
}
