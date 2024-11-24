import LoginPage from "./login/page";
export const dynamic = "force-dynamic"; // Vercel Fix

export default function Home() {
  return (
    <main>
      <LoginPage />
    </main>
  );
}
