//Form to add new posts
import { db } from "@/utils/utilities";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function NewPost() {
  return (
    <form onSubmit={handleSubmit} className="userForm">
      <div className="title">
        <label htmlFor="title">Recipe Name:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formValues.title}
          onChange={handleInputChange}
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
          value={formValues.content}
          onChange={handleInputChange}
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
          value={formValues.category_id}
          onChange={handleInputChange}
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
        {!isValid && <p>You must choose a category</p>}
      </div>
      <div className="submitBtn">
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </div>
    </form>
  );
}
