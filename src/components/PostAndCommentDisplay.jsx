"use client";

import { handleAddCommentBtn, handleLikeBtn } from "@/utils/actions";
import { useState } from "react";
import CommentsDisplay from "./CommentsDisplay";

export default function PostAndCommentsDisplay({ postData, commentsData }) {
  const [postObj, setPostObj] = useState(postData);

  //-------------------------------------------------------------Handle Like Btn and  Update Like Display
  const handleLike = async (post) => {
    await handleLikeBtn(post);
    // Update the likes count
    setPostObj((prevState) => ({
      ...prevState,
      likes: prevState.likes + 1,
    }));
  };

  return (
    <>
      <h2 id="authorDisplay">Author: {postObj.author}</h2>
      <h3 id="recipeDisplay">Recipe: {postObj.title}</h3>
      <h4 id="categoryDisplay">Category: {postObj.category}</h4>
      <p id="contentDisplay">{postObj.content}</p>
      <h4 id="dateDisplay">Date: {postObj.post_date}</h4>
      <p id="likesDisplay">Likes: {postObj.likes}</p>

      <button onClick={() => handleLike(postObj)} id="likeBtn">
        Like
      </button>
      <button onClick={() => handleAddCommentBtn(postObj)} id="AddCommentBtn">
        Add Comment
      </button>

      <h3>Comments:</h3>
      <CommentsDisplay commentsData={commentsData} postObj={postObj} />
    </>
  );
}
