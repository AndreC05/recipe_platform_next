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
import { FetchPosts, FindAuthorId } from "@/utils/actions";

export default function PostsDisplay() {
  const [postsArray, setPostsArray] = useState([]); // Local state for posts

  //------------------------------------------------------------SearchParams
  const searchParams = useSearchParams();

  //-----------------------------------------------------------Update author Context with new author id and Sort Posts
  let { author, setAuthor, setIsLogin } = useContext(AuthorContext);

  useEffect(() => {
    async function fetchData() {
      const result = await FetchPosts();
      setPostsArray(result);
      //Update author and isLogin Context

      let authorName = searchParams.get("author");

      if (authorName) {
        const id = await FindAuthorId(authorName);
        setAuthor((prevState) => ({ ...prevState, author_id: id }));
      } else {
        const authorData = JSON.parse(localStorage.getItem("author"));

        authorName = authorData.author_name;

        const id = await FindAuthorId(authorName);
        setAuthor((prevState) => ({ ...prevState, author_id: id }));
      }

      //Update isLogin
      const isLogin = searchParams.get("isLogin");

      if (isLogin == "true") {
        setIsLogin(true);
      }

      //Sort posts

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
    }
    fetchData();
  }, [setAuthor, setIsLogin, searchParams]);

  //-------------------------------------------------------------Update Like Display
  const handleLike = async (post) => {
    await handleLikeBtn(post);
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
          {String(post.author) === String(author.author_name) && (
            <button onClick={() => handleEditBtn(post)} id="editBtn">
              Edit
            </button>
          )}
          {String(post.author) === String(author.author_name) && (
            <button
              onClick={() => handleDelete(post, author.author_name)}
              id="deleteBtn"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </>
  );
}
