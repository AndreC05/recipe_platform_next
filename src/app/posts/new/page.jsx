//Form to add new posts
import NewPostForm from "@/components/NewPostForm";
import { db } from "@/utils/utilities";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";

export default async function NewPost() {
  //----------------------------------------------Submit Data
  async function handleSubmit(formData) {
    "use server";
    const author_id = formData.get("author_id");
    const title = formData.get("title");
    const category_id = formData.get("category_id");
    const content = formData.get("content");

    await db.query(
      `INSERT INTO recipe_posts (author_id, title, category_id, content) VALUES ($1, $2, $3, $4)`,
      [author_id, title, category_id, content]
    );

    //revalidate path and send user to /posts
    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <form action={handleSubmit} className="userForm">
      <Suspense fallback={<p>Loading form...</p>}>
        <NewPostForm />
      </Suspense>
    </form>
  );
}
