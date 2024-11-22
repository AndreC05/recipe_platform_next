//Page for users to login
"use server";
import { db } from "@/utils/utilities";
import LoginForm from "@/components/LoginForm";
import { FetchAuthors } from "@/utils/actions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function LoginPage() {
  //-----------------------------------------------Fetch all authors
  const Authors = await FetchAuthors();

  //--------------------------------------------------Post author name to database
  async function handleSubmit(formData) {
    "use server";
    const author_name = formData.get("author_name");
    const exists = Authors.some((author) => author.name == author_name);

    if (!exists) {
      await db.query(`INSERT INTO recipe_authors (name) VALUES ($1)`, [
        author_name,
      ]);
    }

    //revalidate path and send user to /posts
    revalidatePath("/posts");
    redirect(`/posts?author=${author_name}`);
  }

  return (
    <form action={handleSubmit}>
      <LoginForm Authors={Authors} />
    </form>
  );
}
