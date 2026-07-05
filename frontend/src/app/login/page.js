"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://curhat-akademik-backend.vercel.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      console.log("Data Login:", data);

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));

        window.location.href = "/chat";
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("Terjadi kesalahan");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-800">
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Curhat Akademik
        </h1>

        <p className="text-center text-slate-400 mb-6">Masuk ke akun kamu</p>

        <input
          type="email"
          placeholder="Email"
          className="w-full bg-slate-800 text-white border border-slate-700 p-3 mb-3 rounded-xl outline-none focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full bg-slate-800 text-white border border-slate-700 p-3 rounded-xl pr-12 outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-xl font-semibold"
        >
          Login
        </button>

        {message && <p className="mt-3 text-center text-red-400">{message}</p>}

        <p className="mt-5 text-center text-slate-400">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="text-blue-400 font-semibold hover:text-blue-300"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
