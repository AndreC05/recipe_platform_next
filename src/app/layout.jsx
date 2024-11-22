import { AuthorProvider } from "@/utils/AuthorContext";

export const metadata = {
  title: "Generic Recipe platform II",
  description: "Recipe platform made with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthorProvider>
        <body>{children}</body>
      </AuthorProvider>
    </html>
  );
}
