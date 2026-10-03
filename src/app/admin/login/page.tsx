import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/admin-auth";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await getAdmin()) redirect("/admin");

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-12 h-12 rounded-2xl bg-[#E07A5F]/15 ring-1 ring-[#E07A5F]/30 flex items-center justify-center text-xl">
            🔐
          </div>
          <h1 className="text-xl font-semibold">Chatbot Admin</h1>
          <p className="text-sm text-zinc-400 mt-1">Sign in to view conversations and leads</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
