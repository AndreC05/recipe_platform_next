//page to edit existing post

import UpdatePostForm from "@/components/UpdatePostForm";
import { db } from "@/utils/utilities";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";

export default async function PostsEditPage() {
  async function handleSubmit(formData) {
    "use server";
    const post_id = formData.get("post_id");
    const title = formData.get("title");
    const category_id = formData.get("category_id");
    const content = formData.get("content");

    await db.query(
      `UPDATE recipe_posts SET title = $1, category_id = $2, content = $3 WHERE id = $4;`,
      [title, category_id, content, post_id]
    );

    //revalidate path and send user to /posts
    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <form action={handleSubmit}>
      <Suspense fallback={<p>Loading form...</p>}>
        <UpdatePostForm />
      </Suspense>
    </form>
  );
}
