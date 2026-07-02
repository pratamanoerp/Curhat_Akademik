"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Register berhasil!");
        window.location.href = "/login";
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Terjadi kesalahan");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🧠</div>

          <h1 className="text-3xl font-bold text-white">Curhat Akademik</h1>

          <p className="text-slate-400 mt-2">
            Buat akun dan mulai curhat bersama AI
          </p>
        </div>

        <input
          type="text"
          placeholder="Nama Lengkap"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full bg-slate-800 text-white border border-slate-700 p-3 rounded-xl mb-4 outline-none focus:border-blue-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-slate-800 text-white border border-slate-700 p-3 rounded-xl mb-4 outline-none focus:border-blue-500"
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-800 text-white border border-slate-700 p-3 rounded-xl pr-12 outline-none focus:border-blue-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {message && <p className="text-red-400 text-center mb-4">{message}</p>}

        <button
          onClick={handleRegister}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-xl font-semibold transition"
        >
          Buat Akun 🚀
        </button>

        <p className="text-center text-slate-400 mt-5">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-blue-400 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
