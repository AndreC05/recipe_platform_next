"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdatePostForm() {
  //------------------------------------------------------------SearchParams
  const searchParams = useSearchParams();
  const post_id = searchParams.get("post_id");

  //-----------------------------------------------Post State
  const [isCategoryValid, setIsCategoryValid] = useState(false); //make sure a category is selected
  const [post, setPost] = useState({
    title: "",
    content: "",
    category_id: "",
  });

  //-----------------------------------------------Category Selection Validation
  useEffect(() => {
    setIsCategoryValid(post.category_id ? true : false);
  }, [post.category_id]);

  //------------------------------------------------Handle Changes In Inputs
  function HandleChanges(event) {
    setPost({
      ...post,
      [event.target.name]:
        event.target.name === "category_id"
          ? Number(event.target.value)
          : event.target.value,
    });
  }

  return (
    <>
      <input hidden id="post_id" name="post_id" value={post_id} readOnly />
      <div className="title">
        <label htmlFor="title">Recipe Name:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={post.title}
          onChange={HandleChanges}
          minLength={5}
          maxLength={50}
          required
        />
      </div>
      <div className="content">
        <label htmlFor="content">Recipe:</label>
        <textarea
          type="text"
          id="content"
          name="content"
          value={post.content}
          onChange={HandleChanges}
          minLength={20}
          maxLength={3000}
          required
        />
      </div>
      <div className="category">
        <label htmlFor="category_id">Category:</label>
        <select
          id="category_id"
          name="category_id"
          onChange={HandleChanges}
          value={post.category_id}
          required
        >
          <option value="">Select a Category</option>
          <option value={1}>Breakfast recipes</option>
          <option value={2}>Lunch recipes</option>
          <option value={3}>Dinner recipes</option>
          <option value={4}>Dessert recipes</option>
          <option value={5}>Salad recipes</option>
          <option value={6}>Snack recipes</option>
        </select>
      </div>
      <div className="warning">
        {!isCategoryValid && <p>You must choose a category</p>}
      </div>
      <div className="submitBtn">
        <button type="submit" disabled={!isCategoryValid}>
          Submit
        </button>
      </div>
    </>
  );
}
