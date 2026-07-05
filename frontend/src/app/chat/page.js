"use client";

import { useEffect, useRef, useState } from "react";

export default function ChatPage() {
  // =========================
  // STATE
  // =========================
  const [user, setUser] = useState(null);
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  const [chat, setChat] = useState([
    {
      sender: "bot",
      text: "Halo 👋 Aku siap mendengarkan curhatanmu hari ini.",
    },
  ]);

  // =========================
  // CEK LOGIN
  // =========================
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));

    if (!data) {
      window.location.href = "/login";
      return;
    }

    setUser(data);
    loadChat(data.id);
  }, []);

  // =========================
  // AUTO SCROLL
  // =========================
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat]);

  // =========================
  // LOAD CHAT HISTORY
  // =========================
  const loadChat = async (userId) => {
    try {
      const response = await fetch(
        `https://curhat-akademik-backend.vercel.app/get-chat/${userId}`,
      );

      const data = await response.json();

      let history = [
        {
          sender: "bot",
          text: "Halo 👋 Aku siap mendengarkan curhatanmu hari ini.",
        },
      ];

      data.forEach((item) => {
        history.push({
          sender: "user",
          text: item.pesan_user,
        });

        if (item.respon_gpt) {
          history.push({
            sender: "bot",
            text: item.respon_gpt,
          });
        }
      });

      setChat(history);
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // KIRIM PESAN
  // =========================
  const kirimPesan = async () => {
    if (!pesan.trim()) return;

    const pesanUser = pesan;

    setPesan("");

    // Tampilkan pesan user langsung
    setChat((prev) => [
      ...prev,
      {
        sender: "user",
        text: pesanUser,
      },
    ]);

    setLoading(true);

    try {
      // =========================
      // MINTA JAWABAN GPT
      // =========================
      const response = await fetch(
        "https://curhat-akademik-backend.vercel.app/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            pesan: pesanUser,
          }),
        },
      );

      const data = await response.json();

      console.log("Response GPT:", data);

      if (!response.ok) {
        throw new Error(data.error || "Gagal mendapatkan jawaban AI");
      }

      // Backend mengembalikan:
      // { respon_gpt: "..." }
      const jawabanGPT = data.respon_gpt;

      console.log("Jawaban GPT:", jawabanGPT);

      // Tampilkan jawaban AI
      setChat((prev) => [
        ...prev,
        {
          sender: "bot",
          text: jawabanGPT,
        },
      ]);

      // =========================
      // SIMPAN KE DATABASE
      // =========================
      const payload = {
        user_id: user.id,
        pesan_user: pesanUser,
        respon_gpt: jawabanGPT,
      };

      console.log("Payload:", payload);

      const saveResponse = await fetch(
        "https://curhat-akademik-backend.vercel.app/save-chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const saveData = await saveResponse.json();

      console.log("Save Chat:", saveData);
    } catch (error) {
      console.error(error);

      setChat((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Maaf, terjadi kesalahan saat menghubungi AI.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <main className="h-screen bg-slate-950 text-white flex flex-col">
      {/* HEADER */}

      <header className="border-b border-slate-800 bg-slate-900">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold">🧠 Curhat Akademik</h1>

            <p className="text-slate-400 text-sm">Halo, {user?.nama}</p>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* CHAT */}

      <section className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {chat.map((item, index) => (
            <div
              key={index}
              className={`flex ${
                item.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex gap-3 items-end">
                {item.sender === "bot" && (
                  <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-lg">
                    🤖
                  </div>
                )}

                <div
                  className={`
                  max-w-xl
                  px-6
                  py-4
                  rounded-3xl
                  shadow-lg
                  whitespace-pre-wrap
                  ${item.sender === "user" ? "bg-blue-600" : "bg-slate-800"}
                `}
                >
                  {item.text}
                </div>

                {item.sender === "user" && (
                  <div className="w-11 h-11 rounded-full bg-slate-700 flex items-center justify-center">
                    👤
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex">
              <div className="flex gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  🤖
                </div>

                <div className="bg-slate-800 rounded-3xl px-6 py-4">
                  AI sedang mengetik...
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef}></div>
        </div>
      </section>

      {/* INPUT CHAT */}

      <footer className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-5xl mx-auto p-5">
          <div className="flex gap-3">
            <input
              type="text"
              value={pesan}
              placeholder="Ceritakan apa yang sedang kamu rasakan..."
              onChange={(e) => setPesan(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  kirimPesan();
                }
              }}
              className="
              flex-1
              bg-slate-800
              border
              border-slate-700
              rounded-full
              px-6
              py-4
              outline-none
              focus:border-blue-500
              transition
            "
            />

            <button
              onClick={kirimPesan}
              disabled={loading}
              className="
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              hover:from-blue-700
              hover:to-purple-700
              disabled:bg-slate-700
              px-7
              rounded-full
              font-bold
              transition
            "
            >
              {loading ? "..." : "➤"}
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
