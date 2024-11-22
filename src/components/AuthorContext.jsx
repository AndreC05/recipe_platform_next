"use client";

import { createContext, useState } from "react";

export const AuthorContext = createContext();

export function AuthorProvider({ children }) {
  const [author, setAuthor] = useState({
    author_name: "",
    author_id: "",
  });

  const [allAuthors, setAllAuthors] = useState([]);

  return (
    <AuthorContext.Provider
      value={{ author, setAuthor, allAuthors, setAllAuthors }}
    >
      {children}
    </AuthorContext.Provider>
  );
}
