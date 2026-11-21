const API_KEY = "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";
const MODEL_NAME = "openai/gpt-oss-120b";

const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

function tambahPesan(teks, pengirim) {
  const bubble = document.createElement("div");
  bubble.className = `chat-msg ${pengirim === "user" ? "user-msg" : "bot-msg"}`;
  bubble.textContent = teks;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return bubble;
}

async function tanyaAI(pertanyaan) {
  if (!API_KEY || API_KEY === "gsk_MASUKKAN_API_KEY_GROQ_KAMU") {
    return "API key belum diisi. Silakan masukkan API key Groq kamu di dalam file script.js.";
  }

  const url = "https://api.groq.com/openai/v1/chat/completions";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL_NAME,
      messages: [
        {
          role: "system",
          content: `Kamu adalah Asisten AI RPL yang membantu siswa dalam proyek web responsif (HTML, CSS Grid, Flexbox, Glassmorphism, Media Query, dan JavaScript) maupun pertanyaan umum seputar sekolah.

Informasi resmi sekolah (gunakan ini jika ditanya tentang sekolah):
- Nama sekolah: SMKN 9 Medan (SMK Negeri 9 Medan)
- Alamat: Jl. Patriot No. 20A, Lalang, Kec. Medan Sunggal, Kota Medan, Sumatera Utara
- Akreditasi: A
- Tanggal SK Pendirian: 7 Maret 1997
- Kontak & Website: Telepon (061) 8454350 | Email smkn09medan@gmail.com | Website https://smkn9medan.sch.id/
- Jumlah & Daftar Jurusan (6 jurusan):
  1. Rekayasa Perangkat Lunak (RPL / PPLG) — pemrograman, pengembangan website/aplikasi, basis data, pengujian perangkat lunak, dan gim
  2. Teknik Komputer dan Jaringan (TKJ / TJKT) — perakitan komputer, jaringan kabel/nirkabel, konfigurasi perangkat jaringan, dan layanan jaringan
  3. Desain Komunikasi Visual (DKV) — prinsip desain, tipografi, ilustrasi, fotografi, identitas visual, dan desain media digital
  4. Produksi dan Siaran Program Televisi (PSPT / Broadcasting dan Perfilman) — produksi konten audiovisual, pengambilan gambar, tata suara, penyuntingan video, dan siaran
  5. Animasi — produksi karya visual bergerak 2D dan 3D mulai dari ide, storyboard, hingga animasi
  6. Pekerjaan Sosial (Peksos) — komunikasi, pelayanan sosial, pendampingan individu/kelompok, kepedulian masyarakat, dan praktik layanan sosial
- Jumlah Guru: Tercatat 98 guru berdasarkan data Statistik Sekolah Kemendikdasmen (untuk jumlah guru aktif semester berjalan dapat dikonfirmasi ke sekolah).
- Ruang Kelas & Pembagian per Jurusan: Tercatat total 62 ruang kelas secara keseluruhan berdasarkan data Statistik Sekolah Kemendikdasmen. Untuk rincian pasti jumlah ruang kelas per masing-masing jurusan (RPL, TKJ, DKV, PSPT, Animasi, Peksos), jelaskan bahwa datanya belum tercantum di data ini dan sarankan konfirmasi ke bagian sarana prasarana atau pihak sekolah.
- Fasilitas Sekolah (Lab, Aula, Kantin, Perpustakaan): SMKN 9 Medan memiliki fasilitas laboratorium/ruang praktikum (termasuk lab komputer), perpustakaan, kantin, serta aula/ruang pertemuan. Untuk jumlah unit pasti tiap ruangan (berapa lab, aula, kantin, dan perpustakaan), katakan terus terang bahwa jumlah rincinya belum tercantum di data ini dan sarankan cek ke pihak sekolah.
- Kegiatan & Sertifikasi: Memiliki kegiatan ekstrakurikuler (seperti Pramuka dan Rohis), program PKL (Praktik Kerja Lapangan), serta LSP Pihak Kesatu berlisensi BNSP.

Aturan menjawab:
- Jawab dengan bahasa Indonesia yang jelas, ramah, rapi, dan informatif.
- Jika ditanya seputar SMKN 9 Medan (profil, alamat, 6 jurusan, jumlah guru, ruang kelas, lab, aula, kantin, perpustakaan, kontak, PKL, LSP, PPDB), gunakan informasi resmi di atas. Jika ada detail spesifik yang belum tercantum di data ini, katakan terus terang bahwa datanya belum dimasukkan daripada mengarang.`
        },
        {
          role: "user",
          content: pertanyaan
        }
      ]
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Gagal mengambil balasan dari API.");
  }

  return data.choices?.[0]?.message?.content || "Maaf, tidak ada jawaban yang diterima.";
}

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const pertanyaan = chatInput.value.trim();
  if (!pertanyaan) return;

  tambahPesan(pertanyaan, "user");
  chatInput.value = "";

  const loadingBubble = tambahPesan("Sedang memproses jawaban...", "bot");

  try {
    const jawaban = await tanyaAI(pertanyaan);
    loadingBubble.textContent = jawaban;
  } catch (err) {
    loadingBubble.textContent = `Terjadi kendala: ${err.message}`;
  }
});

// TOGGLE MENU HAMBURGER (TAMPILAN HP)
const hamburgerBtn = document.querySelector(".hamburger-btn");
const navLinks = document.querySelector(".nav-links");

if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}