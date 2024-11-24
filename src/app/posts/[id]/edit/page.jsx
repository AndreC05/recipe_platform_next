//Page to edit existing comments on the post

import { db } from "@/utils/utilities";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import UpdateCommentForm from "@/components/UpdateCommentForm";

export default async function PostsEditPage() {
  async function handleSubmit(formData) {
    "use server";
    const post_id = formData.get("post_id");
    const comment_id = formData.get("comment_id");
    const content = formData.get("content");

    await db.query(`UPDATE recipe_comments SET content = $1 WHERE id = $2;`, [
      content,
      comment_id,
    ]);

    //revalidate path and send user to /posts
    revalidatePath(`/posts/${post_id}`);
    redirect(`/posts/${post_id}`);
  }

  return (
    <form action={handleSubmit}>
      <UpdateCommentForm />
    </form>
  );
}
