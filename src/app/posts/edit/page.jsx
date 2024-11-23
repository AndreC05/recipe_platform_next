//form to edit existing post

export default async function PostsEditPage() {
  return (
    <form action={handleSubmit}>
      <UpdatePostForm />
    </form>
  );
}
