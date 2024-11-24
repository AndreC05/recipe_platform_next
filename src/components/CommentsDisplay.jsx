"use client";

import {
  handleDeleteCommentBtn,
  handleEditCommentBtn,
  handleLikeCommentBtn,
} from "@/utils/actions";
import { AuthorContext } from "@/utils/AuthorContext";
import { useContext, useState } from "react";

export default function CommentsDisplay({ commentsData, postObj }) {
  const [comments, setComments] = useState(commentsData);
  let { author } = useContext(AuthorContext);

  //-------------------------------------------------------------Update Like Display
  const handleLike = async (comment) => {
    await handleLikeCommentBtn(comment);
    // Update the likes count
    setComments((prevState) =>
      prevState.map((prev) =>
        prev.id === comment.id ? { ...prev, likes: prev.likes + 1 } : prev
      )
    );
  };

  //-------------------------------------------------------------Update Comments Displayed After Deleting
  const handleDelete = async (comment) => {
    if (author.author_name === comment.author) {
      await handleDeleteCommentBtn(comment, author.author_name);
      setComments((prevState) =>
        prevState.filter((prev) => prev.id !== comment.id)
      );
    }
  };

  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <h3 id="authorDisplayComment">Author: {comment.author}</h3>
          <p id="contentDisplayComment">{comment.content}</p>
          <h4 id="dateDisplayComment">Date: {comment.date}</h4>
          <p id="likesDisplayComment">Likes: {comment.likes}</p>

          <button onClick={() => handleLike(comment)} id="likeBtn">
            Like
          </button>

          {String(comment.author) === String(author.author_name) && (
            <button
              onClick={() => handleEditCommentBtn(comment, postObj)}
              id="editBtn"
            >
              Edit
            </button>
          )}
          {String(comment.author) === String(author.author_name) && (
            <button
              onClick={() => handleDelete(comment, author.author_name)}
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
