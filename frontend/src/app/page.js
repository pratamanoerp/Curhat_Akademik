import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
      ```
      {/* Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 blur-[150px]" />
      {/* Navbar */}
      <nav className="relative border-b border-slate-800 backdrop-blur-xl z-10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🧠</span>

            <div>
              <h1 className="font-bold text-2xl">Curhat Akademik</h1>

              <p className="text-slate-400 text-sm">AI Academic Assistant</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href="/login"
              className="
            px-5
            py-2
            rounded-xl
            border
            border-slate-700
            hover:bg-slate-800
            transition
          "
            >
              Login
            </Link>

            <Link
              href="/register"
              className="
            px-5
            py-2
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
            transition
          "
            >
              Register
            </Link>
          </div>
        </div>
      </nav>
      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-6 py-28">
        <div className="text-center">
          <div className="text-8xl mb-8">🧠</div>

          <h1 className="text-6xl md:text-8xl font-black mb-8">
            Curhat Akademik
          </h1>

          <p className="text-slate-400 text-xl md:text-2xl max-w-4xl mx-auto">
            Tempat aman untuk bercerita tentang tugas, skripsi, ujian, burnout
            kuliah, dan manajemen waktu bersama AI yang siap mendengarkan kapan
            saja.
          </p>

          {/* Statistik */}
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mt-20">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <h3 className="text-3xl font-bold">24/7</h3>
              <p className="text-slate-400 mt-2">Siap Mendengar</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <h3 className="text-3xl font-bold">AI</h3>
              <p className="text-slate-400 mt-2">Academic Assistant</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <h3 className="text-3xl font-bold">100%</h3>
              <p className="text-slate-400 mt-2">Fokus Akademik</p>
            </div>
          </div>
        </div>
      </section>
      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-5xl font-bold text-center mb-14">
          Apa yang Bisa Dibantu?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <div className="text-6xl mb-4">📚</div>

            <h3 className="text-2xl font-bold mb-3">Tugas & Skripsi</h3>

            <p className="text-slate-400">
              Curhat tentang tugas yang menumpuk, revisi skripsi, atau deadline
              yang membuat stres.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <div className="text-6xl mb-4">⏰</div>

            <h3 className="text-2xl font-bold mb-3">Manajemen Waktu</h3>

            <p className="text-slate-400">
              Bantu mengatur jadwal belajar, prioritas tugas, dan produktivitas
              harian.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <div className="text-6xl mb-4">🤖</div>

            <h3 className="text-2xl font-bold mb-3">AI Pendamping</h3>

            <p className="text-slate-400">
              Teman diskusi akademik yang siap mendengarkan kapan pun kamu
              butuhkan.
            </p>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-[40px] p-12 text-center">
          <h2 className="text-5xl font-bold mb-5">Siap Curhat Hari Ini?</h2>

          <p className="text-xl mb-8">
            Buat akun gratis dan mulai berbicara dengan AI.
          </p>

          <Link
            href="/register"
            className="
          inline-block
          bg-white
          text-black
          px-8
          py-4
          rounded-2xl
          font-bold
        "
          >
            Daftar Sekarang
          </Link>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-500">
        © 2026 Curhat Akademik • Dibuat untuk membantu mahasiswa Indonesia 🇮🇩
      </footer>
    </main>
  );
}
