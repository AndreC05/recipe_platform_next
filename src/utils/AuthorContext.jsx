"use client";

import { createContext, useState, useEffect } from "react";

export const AuthorContext = createContext();

export function AuthorProvider({ children }) {
  const [author, setAuthor] = useState({ author_name: "", author_id: "" });
  const [allAuthors, setAllAuthors] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // Get stored author data from localStorage if available
    const isLogin = JSON.parse(localStorage.getItem("isLogin"));
    if (isLogin == "true") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    const savedAuthor = JSON.parse(localStorage.getItem("author"));
    if (savedAuthor) {
      setAuthor(savedAuthor);
    }
    if (savedAuthor) {
      const savedAuthorName = savedAuthor.author_name;

      if (savedAuthorName) {
        setIsLogin(true);
      }
    }
  }, []);

  useEffect(() => {
    // Store author data to localStorage whenever it changes
    localStorage.setItem("author", JSON.stringify(author));
    localStorage.setItem("isLogin", JSON.stringify(isLogin));
  }, [author, isLogin]);

  return (
    <AuthorContext.Provider
      value={{
        author,
        setAuthor,
        allAuthors,
        setAllAuthors,
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </AuthorContext.Provider>
  );
}
