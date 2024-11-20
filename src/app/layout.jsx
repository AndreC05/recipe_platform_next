export const metadata = {
  title: "Generic Recipe platform II",
  description: "Recipe platform made with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
