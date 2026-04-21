"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useEffect } from "react";

import { Suspense } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("signup") === "success") {
      setSuccess("Account created successfully! Please log in.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error === "CredentialsSignin" ? "Invalid email or password" : res.error);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-800">
      <div className="flex flex-col items-center mb-8">
        <div className="p-3 bg-sky-100 dark:bg-sky-900/30 rounded-full mb-4">
          <ShieldCheck className="w-8 h-8 text-sky-700 dark:text-sky-400" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome Back</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Sign in to your BusyLoss account</p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg mb-6 text-center">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 text-green-600 dark:text-green-400 text-sm p-3 rounded-lg mb-6 text-center">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
            placeholder="admin@busyloss.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
            placeholder="••••••••"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-sky-700 hover:bg-sky-800 text-white font-semibold rounded-lg transition-colors flex items-center justify-center disabled:opacity-50"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-slate-500">
        Don't have an account? <Link href="/signup" className="text-sky-700 hover:underline font-medium">Create one</Link>
        <div className="mt-2 text-[12px]">
          Not contributing yet? <Link href="/contribute" className="text-sky-700 hover:underline">Submit a tool</Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <Suspense fallback={<div className="text-slate-500">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
