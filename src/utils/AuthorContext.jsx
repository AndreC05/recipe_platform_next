"use client";

import { createContext, useState, useEffect } from "react";

export const AuthorContext = createContext();

export function AuthorProvider({ children }) {
  const [author, setAuthor] = useState({ author_name: "", author_id: "" });
  const [allAuthors, setAllAuthors] = useState([]);

  useEffect(() => {
    // Get stored author data from localStorage if available
    const savedAuthor = localStorage.getItem("author");
    if (savedAuthor) {
      setAuthor(JSON.parse(savedAuthor));
    }
  }, []);

  useEffect(() => {
    // Store author data to localStorage whenever it changes
    localStorage.setItem("author", JSON.stringify(author));
  }, [author]);

  return (
    <AuthorContext.Provider
      value={{ author, setAuthor, allAuthors, setAllAuthors }}
    >
      {children}
    </AuthorContext.Provider>
  );
}
