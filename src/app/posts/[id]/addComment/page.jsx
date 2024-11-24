//form to add a comment to a specific post

import { db } from "@/utils/utilities";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import NewCommentForm from "@/components/NewCommentForm";
import { Suspense } from "react";

export default async function NewComment() {
  //----------------------------------------------Submit Data
  async function handleSubmit(formData) {
    "use server";
    const post_id = formData.get("post_id");
    const author_id = formData.get("author_id");
    const content = formData.get("content");

    await db.query(
      `INSERT INTO recipe_comments (author_id, content, post_id) VALUES ($1, $2, $3)`,
      [author_id, content, post_id]
    );

    //revalidate path and send user to /posts/[current Post_id]
    revalidatePath(`/posts/${post_id}`);
    redirect(`/posts/${post_id}`);
  }

  return (
    <form action={handleSubmit} className="userForm">
      <Suspense fallback={<p>Loading form...</p>}>
        <NewCommentForm />
      </Suspense>
    </form>
  );
}
