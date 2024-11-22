"use server";
import { db } from "@/utils/utilities";

export async function FetchAuthors() {
  //-----------------------------------------------Fetch all authors
  const result = await db.query(`SELECT id, name FROM recipe_authors;`);
  const Authors = result.rows;

  return Authors;
}
