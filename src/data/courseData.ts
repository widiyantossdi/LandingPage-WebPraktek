import { Article, SyllabusItem, Assignment, QuizQuestion } from '../types/course';

export const COURSE_INFO = {
  name: 'Pemrograman Web',
  code: 'SI-3204',
  sks: 3,
  semester: 'Ganjil 2026/2027',
  prodi: 'Sistem Informasi',
  fakultas: 'Fakultas Teknologi Informasi (FTI)',
  kampus: 'Universitas Nahdlatul Ulama Al Ghazali (UNUGHA) Cilacap',
  alamat: 'Jl. Kemerdekaan Barat No.17, Kesugihan, Kabupaten Cilacap, Jawa Tengah 53274',
  dosen: 'Widiyanto, S.Kom., M.Kom.',
  dosenEmail: 'widiyanto@unugha.id',
  ruangKuliah: 'Lab Komputer 2 Gedung FTI UNUGHA',
  jadwal: 'Selasa, 08.00 - 10.30 WIB',
  deskripsi: 'Mata kuliah ini membekali mahasiswa Sistem Informasi UNUGHA dengan kompetensi fundamental perancangan dan pembangunan aplikasi web modern, mulai dari HTML5 semantik, CSS3 responsif, JavaScript ES6+, arsitektur DOM, Git version control, hingga deployment produksi ke Cloudflare Pages.'
};

export const ARTICLES_DATA: Article[] = [
  {
    id: 'art-01',
    slug: 'pengenalan-web-modern-setup-tools',
    title: 'Pengenalan Arsitektur Web & Setup Lingkungan Pengembangan SI',
    meetingNumber: 1,
    category: 'Dasar Web',
    readingTime: '6 menit',
    publishedDate: '10 Sep 2026',
    author: 'Widiyanto, M.Kom.',
    excerpt: 'Memahami cara kerja request-response client-server HTTP/HTTPS, browser rendering engine, dan panduan instalasi VS Code, Node.js, serta Git untuk mahasiswa SI UNUGHA.',
    keyTakeaways: [
      'Alur kerja Client-Server, DNS, dan siklus Request-Response HTTP/HTTPS',
      'Perbedaan Web Statis vs Web Dinamis dalam lanskap Sistem Informasi',
      'Setup VS Code dengan extensions wajib: Live Server, Tailwind CSS IntelliSense, Prettier'
    ],
    sections: [
      {
        heading: 'Bagaimana Web Sebenarnya Bekerja?',
        body: 'Setiap kali mahasiswa mengetik URL seperti https://unugha.ac.id di browser smartphone atau laptop, browser bertindak sebagai Client yang mengirimkan HTTP GET Request ke Web Server melalui DNS lookup. Server memproses permintaan tersebut lalu mengembalikan response berupa payload HTML, stylesheet CSS, gambar, dan skrip JavaScript.',
        bulletPoints: [
          'Client (Browser): Menampilkan UI, menginterpretasikan HTML/CSS, dan mengeksekusi JavaScript pada rendering engine.',
          'Server (Host): Menyimpan asset web, menjalankan backend logic/database, dan merespons request pengguna.',
          'Edge Hosting (Cloudflare Pages): Mendistribusikan file web statis ke 300+ data center global sehingga diakses dalam hitungan milidetik.'
        ]
      },
      {
        heading: 'Standar Perangkat Mahasiswa Sistem Informasi UNUGHA',
        body: 'Untuk mengikuti perkuliahan praktikum Pemrograman Web di Lab FTI maupun belajar mandiri di kos/rumah, siapkan perkakas esensial berikut:',
        codeSnippet: {
          language: 'bash',
          code: `# Periksa versi Node.js dan NPM di terminal
node -v
npm -v

# Periksa Git yang terinstal
git --version`,
          explanation: 'Gunakan Node.js versi LTS (v20+ atau v22+) dan Git minimal versi 2.40.'
        },
        tips: 'Bagi mahasiswa yang menggunakan laptop spek terbatas, gunakan browser berbasis Chromium (Brave/Chrome) dengan tab yang tidak berlebihan saat menjalankan Live Server.'
      }
    ],
    exercisePrompt: 'Install VS Code, pasang ekstensi Live Server dan Prettier, lalu buat file index.html pertama Anda.',
    exerciseInitialCode: {
      html: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Halo UNUGHA Cilacap</title>
</head>
<body>
  <h1>Selamat Datang di Web Programming SI</h1>
  <p>Nama: Mahasiswa SI UNUGHA</p>
  <p>Kampus: UNUGHA Kesugihan Cilacap</p>
</body>
</html>`,
      css: `body {
  font-family: sans-serif;
  padding: 24px;
  background-color: #f8fafc;
  color: #0f172a;
}
h1 {
  color: #059669;
}`,
      js: `console.log("Web Programming SI UNUGHA siap dijalankan!");`
    }
  },
  {
    id: 'art-02',
    slug: 'html5-semantik-aksesibilitas-seo',
    title: 'HTML5 Semantik: Struktur Dokumen Web Standar W3C & SEO',
    meetingNumber: 2,
    category: 'Dasar Web',
    readingTime: '7 menit',
    publishedDate: '17 Sep 2026',
    author: 'Widiyanto, M.Kom.',
    excerpt: 'Hindari div-soup! Kuasai elemen semantik <header>, <nav>, <main>, <article>, <section>, dan <footer> demi aksesibilitas pembaca layar dan ranking mesin pencari.',
    keyTakeaways: [
      'Alasan pentingnya tag semantik dibanding sekadar <div> bertingkat',
      'Struktur dokumen web modern yang ramah mesin pencari Google dan screen reader',
      'Elemen form HTML5 dan validasi bawaan input email, number, pattern'
    ],
    sections: [
      {
        heading: 'Mengenal Elemen Semantik HTML5',
        body: 'Elemen semantik secara eksplisit mendeskripsikan maknanya kepada browser maupun developer. Memakai <div> untuk semua blok disebut kebiasaan buruk "div-soup" yang membuat crawler search engine dan pembaca tuna netra (screen reader) kesulitan mengidentifikasi konten utama.',
        codeSnippet: {
          language: 'html',
          code: `<!-- ❌ CARA LAMA (Div Soup) -->
<div id="header">
  <div class="menu">...</div>
</div>
<div id="content">...</div>

<!-- ✅ CARA BENAR & SEMANTIK -->
<header>
  <nav aria-label="Navigasi Utama">...</nav>
</header>
<main>
  <article>
    <h1>Judul Artikel Sistem Informasi</h1>
    <section>Konten Bab 1</section>
  </article>
</main>
<footer>
  <p>&copy; 2026 SI UNUGHA Cilacap</p>
</footer>`,
          explanation: 'Gunakan <main> hanya satu kali dalam satu halaman untuk menandai konten unik halaman tersebut.'
        }
      },
      {
        heading: 'Penerapan Form HTML5 untuk Data Mahasiswa',
        body: 'Dalam sistem informasi kampus, formulir adalah pintu masuk pengumpulan data (KRS, pendaftaran beasiswa, input nilai). Gunakan atribut tipe input yang sesuai agar keyboard smartphone menampilkan keyboard angka atau email secara otomatis.',
        tips: 'Selalu gunakan atribut type="email", type="tel", dan inputmode="numeric" saat membuat formulir yang ditargetkan untuk pengguna smartphone.'
      }
    ],
    exercisePrompt: 'Rancang halaman biodata mahasiswa sistem informasi menggunakan minimal 5 tag semantik berbeda.',
    exerciseInitialCode: {
      html: `<main>
  <article class="kartu-mhs">
    <header>
      <h2>Ahmad Fajar Santoso</h2>
      <p>NIM: 24201089 | SI-A 2024</p>
    </header>
    <section>
      <h3>Fokus Minat:</h3>
      <p>Frontend Development & Data Analyst</p>
    </section>
    <footer>
      <small>Universitas Nahdlatul Ulama Al Ghazali Cilacap</small>
    </footer>
  </article>
</main>`,
      css: `.kartu-mhs {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}
h2 { color: #047857; margin-bottom: 4px; }
h3 { font-size: 14px; color: #475569; }`,
      js: `// Coba tambahkan interaksi klik tombol di sini!`
    }
  },
  {
    id: 'art-03',
    slug: 'css3-modern-flexbox-grid-responsive',
    title: 'CSS3 Modern: Layout Responsif dengan Flexbox, CSS Grid & Media Query',
    meetingNumber: 3,
    category: 'CSS & UI',
    readingTime: '9 menit',
    publishedDate: '24 Sep 2026',
    author: 'Widiyanto, M.Kom.',
    excerpt: 'Bedah tuntas perbedaan Display Flex vs Grid, konsep 1 dimensi vs 2 dimensi, serta teknik mobile-first responsive design yang nyaman diakses pada layar HP mahasiswa.',
    keyTakeaways: [
      'Kapan memilih Flexbox (1 dimensi: navbar, deretan tombol) vs Grid (2 dimensi: kartu materi, dashboard)',
      'Konsep Mobile-First breakpoint (@media (min-width: 640px))',
      'CSS custom properties (variabel CSS) untuk tema warna kampus'
    ],
    sections: [
      {
        heading: 'Flexbox vs Grid: Kapan Menggunakannya?',
        body: 'Banyak pemula bingung kapan harus memakai Flexbox dan kapan memakai CSS Grid. Panduan mudahnya: Flexbox dirancang untuk perataan elemen pada satu sumbu (baris ATAU kolom, misalnya navbar dan badge tags). Sedangkan CSS Grid dirancang untuk penataan ruang dua sumbu sekaligus (baris DAN kolom, misalnya katalog kartu artikel atau dashboard metrik).'
      },
      {
        heading: 'Pola Mobile-First Media Query',
        body: 'Dalam prinsip Mobile-First, kode CSS dasar dituliskan untuk ukuran smartphone terlebih dahulu (layar sempit), kemudian diperlebar menggunakan media query min-width bertahap untuk tablet dan monitor PC desktop.',
        codeSnippet: {
          language: 'css',
          code: `/* 1. Base CSS untuk Mobile (Default) */
.container-grid {
  display: grid;
  grid-template-columns: 1fr; /* 1 kolom penuh di smartphone */
  gap: 16px;
}

/* 2. Tablet (min-width 640px) */
@media (min-width: 640px) {
  .container-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 kolom */
  }
}

/* 3. Laptop/Desktop (min-width: 1024px) */
@media (min-width: 1024px) {
  .container-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 kolom */
  }
}`,
          explanation: 'Pola ini menghemat konsumsi kuota data seluler karena browser smartphone tidak perlu meng-override aturan desktop.'
        }
      }
    ]
  },
  {
    id: 'art-04',
    slug: 'membangun-ui-tailwind-css',
    title: 'Membangun Antarmuka Cepat & Konsisten dengan Tailwind CSS',
    meetingNumber: 4,
    category: 'CSS & UI',
    readingTime: '8 menit',
    publishedDate: '01 Okt 2026',
    author: 'Widiyanto, M.Kom.',
    excerpt: 'Tinggalkan penamaan class manual yang melelahkan. Pelajari utilitas class Tailwind CSS, konfigurasi warna brand UNUGHA, dan penataan padding mikro untuk layar sentuh.',
    keyTakeaways: [
      'Filosofi Utility-First dan kenapa industri modern meninggalkan CSS murni konvensional',
      'Handling hover, focus, dan responsive prefix (md:, lg:)',
      'Ergonomi touch target minimal 44px untuk aplikasi web mobile'
    ],
    sections: [
      {
        heading: 'Kenapa Mahasiswa SI Harus Belajar Tailwind CSS?',
        body: 'Di era pengembangan web cepat, menulis ribuan baris file style.css dengan nama class seperti `.card-inner-wrapper-v2` menghabiskan banyak waktu dan rawan konflik styling. Tailwind CSS memberikan utility class yang langsung diterapkan di JSX atau HTML dengan skala spacing, tipografi, dan warna yang harmonis sejak awal.'
      },
      {
        heading: 'Contoh Praktis Pembuatan Card Profil Mahasiswa',
        body: 'Berikut adalah contoh praktis bagaimana menyusun komponen kartu profil responsif dengan padding, flex alignment, dan styling tombol ergonomis:',
        codeSnippet: {
          language: 'html',
          code: `<div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
  <div class="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
    SI
  </div>
  <div>
    <h4 class="font-semibold text-slate-900">Lab Komputer UNUGHA</h4>
    <p class="text-xs text-slate-500">Gedung FTI Lt. 2 Kesugihan</p>
  </div>
  <button class="ml-auto min-h-[44px] px-4 rounded-xl bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 transition">
    Buka
  </button>
</div>`,
          explanation: 'Perhatikan touch target tombol memakai min-h-[44px] sesuai standar ergonomis aplikasi smartphone.'
        }
      }
    ]
  },
  {
    id: 'art-05',
    slug: 'javascript-modern-es6-plus',
    title: 'JavaScript Modern (ES6+): Arrow Functions, Destructuring & Async/Await',
    meetingNumber: 6,
    category: 'JavaScript',
    readingTime: '10 menit',
    publishedDate: '15 Okt 2026',
    author: 'Widiyanto, M.Kom.',
    excerpt: 'Tinggalkan var dan callback hell! Kuasai const/let, template literals, arrow functions, destructuring, array methods (map, filter, reduce), dan Promises.',
    keyTakeaways: [
      'Perbedaan mendasar let vs const vs var (block scope vs function scope)',
      'Array methods mutlak: .map(), .filter(), .find() untuk manipulasi data tabel',
      'Asynchronous JavaScript menggunakan async/await yang bersih dan mudah dibaca'
    ],
    sections: [
      {
        heading: 'Array Methods dalam Pemrosesan Data Sistem Informasi',
        body: 'Mahasiswa SI sering memproses daftar data seperti daftar nilai mahasiswa, katalog buku perpustakaan, atau list presensi. Daripada memakai loop for konvensional, JavaScript modern menyediakan method fungsional yang deklaratif.',
        codeSnippet: {
          language: 'javascript',
          code: `const mahasiswaSI = [
  { nama: 'Zulfa', ipk: 3.85, status: 'Aktif' },
  { nama: 'Budi', ipk: 3.40, status: 'Aktif' },
  { nama: 'Citra', ipk: 3.92, status: 'Aktif' }
];

// 1. Filter: Ambil mahasiswa dengan IPK di atas 3.50 (Cumlaude track)
const cumlaude = mahasiswaSI.filter(m => m.ipk >= 3.50);

// 2. Map: Format nama dan IPK menjadi array string siap render
const labelMahasiswa = cumlaude.map(m => \`\${m.nama} (IPK: \${m.ipk})\`);

console.log(labelMahasiswa);
// Output: ["Zulfa (IPK: 3.85)", "Citra (IPK: 3.92)"]`,
          explanation: 'Kode menjadi ringkas, minim bug off-by-one, dan siap dioperasikan dalam state framework seperti React.'
        }
      }
    ]
  },
  {
    id: 'art-06',
    slug: 'dom-manipulation-event-handling',
    title: 'Manipulasi DOM & Event Handling: Menghidupkan Interaktivitas Web',
    meetingNumber: 7,
    category: 'JavaScript',
    readingTime: '8 menit',
    publishedDate: '22 Okt 2026',
    author: 'Widiyanto, M.Kom.',
    excerpt: 'Pelajari Document Object Model (DOM), querySelector, manipulasi classList, event listener klik/ketik, serta pembuatan kalkulator IPK sederhana.',
    keyTakeaways: [
      'Pohon hierarki Document Object Model (DOM) yang dibangun browser',
      'Teknik addEventListener() untuk menangkap interaksi pengguna',
      'Event Delegation untuk menangani daftar dinamis tanpa memory leak'
    ],
    sections: [
      {
        heading: 'Menghubungkan HTML dengan Logika JavaScript',
        body: 'Melalui objek dokumen `document`, JavaScript dapat membaca konten HTML, mengubah style CSS seketika, menyembunyikan atau memunculkan modal dialog, serta mendengarkan setiap ketukan jari di layar smartphone pengguna.',
        codeSnippet: {
          language: 'javascript',
          code: `const tombolKirim = document.querySelector('#btnKirim');
const inputNim = document.querySelector('#nimInput');
const pesanError = document.querySelector('#pesanError');

tombolKirim.addEventListener('click', (event) => {
  event.preventDefault();
  const nilaiNim = inputNim.value.trim();
  
  if (nilaiNim.length < 8) {
    pesanError.textContent = 'NIM Mahasiswa UNUGHA minimal 8 karakter!';
    pesanError.classList.remove('hidden');
  } else {
    pesanError.classList.add('hidden');
    alert(\`NIM \${nilaiNim} terverifikasi!\`);
  }
});`,
          explanation: 'Selalu berikan umpan balik instan (instant validation) kepada pengguna sebelum formulir disubmit.'
        }
      }
    ]
  },
  {
    id: 'art-07',
    slug: 'panduan-lengkap-deploy-cloudflare-pages',
    title: 'Panduan Praktis Deployment Proyek Web ke Cloudflare Pages',
    meetingNumber: 13,
    category: 'Deploy & Git',
    readingTime: '7 menit',
    publishedDate: '12 Nov 2026',
    author: 'Widiyanto, M.Kom.',
    excerpt: 'Langkah demi langkah mempublikasikan web statis / SPA Vite ke Cloudflare Pages secara gratis, cepat dengan SSL otomatis, dan link permanen untuk pengumpulan tugas perkuliahan.',
    keyTakeaways: [
      'Kenapa Cloudflare Pages sangat cocok untuk tugas perkuliahan mahasiswa SI UNUGHA',
      'Proses build command `npm run build` dan folder output `dist`',
      'Dua metode deployment: Direct Upload (Drag-and-Drop) & Git Automation via GitHub'
    ],
    sections: [
      {
        heading: 'Mengapa Memilih Cloudflare Pages?',
        body: 'Cloudflare Pages menawarkan hosting situs statis tak terbatas secara gratis dengan kecepatan luar biasa melalui jaringan edge global Cloudflare (termasuk server Jakarta/Singapura). Anda mendapatkan sertifikat SSL HTTPS otomatis, domain gratis `*.pages.dev`, dan integrasi CI/CD otomatis setiap kali Anda melakukan `git push` ke GitHub.'
      },
      {
        heading: 'Metode 1: Direct Upload (Paling Cepat untuk Pemula)',
        body: 'Jika Anda belum menguasai Git secara mendalam, metode Direct Upload memungkinkan Anda mengunggah folder hasil build langsung melalui browser dashboard.',
        bulletPoints: [
          'Jalankan perintah `npm run build` di terminal proyek Anda.',
          'Buka folder proyek Anda dan pastikan folder bernama `dist/` telah tercipta.',
          'Buka dashboard.cloudflare.com > Masuk menu Compute (Workers & Pages) > Create application > Pages > Pilih tab "Upload assets".',
          'Beri nama proyek, misalnya: `tugas-web-widiyanto-si-unugha`.',
          'Drag dan drop seluruh isi folder `dist/` ke area upload, lalu klik "Deploy site".'
        ]
      },
      {
        heading: 'Metode 2: Terhubung Otomatis dengan GitHub (Rekomendasi Kuliah)',
        body: 'Metode ini membuat web Anda otomatis ter-update setiap kali Anda menyimpan perubahan kode di GitHub.',
        codeSnippet: {
          language: 'bash',
          code: `# Pengaturan pada formulir Cloudflare Pages:
Project name: web-si-unugha-nama-anda
Production branch: main
Framework preset: Vite
Build command: npm run build
Build output directory: dist`,
          explanation: 'Setelah disimpan, Cloudflare akan melakukan cloning repo GitHub Anda dan membangunnya dalam waktu sekitar 30-40 detik.'
        },
        tips: 'Simpan URL hasil deployment (misal: https://tugas-web-unugha.pages.dev) untuk dimasukkan ke formulir pengumpulan tugas praktikum di portal ini.'
      }
    ]
  },
  {
    id: 'art-08',
    slug: 'git-github-kolaborasi-tim-mahasiswa',
    title: 'Version Control dengan Git & GitHub untuk Proyek Tim Mahasiswa',
    meetingNumber: 12,
    category: 'Deploy & Git',
    readingTime: '6 menit',
    publishedDate: '05 Nov 2026',
    author: 'Widiyanto, M.Kom.',
    excerpt: 'Kuasai git init, add, commit, push, pull, branch, serta pull request untuk menghindari hilangnya kode saat menyusun proyek kelompok Pemrograman Web.',
    keyTakeaways: [
      'Alur kerja Git lokal: Working Directory -> Staging Area -> Git Repository',
      'Format pesan commit yang rapi dan profesional untuk portofolio resume',
      'Pemanfaatan GitHub README.md untuk mendokumentasikan spesifikasi proyek'
    ],
    sections: [
      {
        heading: 'Perintah Dasar Git yang Wajib Dihapal Mahasiswa',
        body: 'Berikut adalah rangkaian perintah yang akan digunakan sehari-hari dalam praktikum laboratorium komputer:',
        codeSnippet: {
          language: 'bash',
          code: `# Inisialisasi repo di folder lokal
git init

# Tambahkan file ke staging
git add .

# Rekam checkpoint dengan pesan deskriptif
git commit -m "feat: tambahkan halaman landing mobile-first"

# Hubungkan dengan remote repository di GitHub
git remote add origin https://github.com/username/repo-web-unugha.git
git branch -M main
git push -u origin main`,
          explanation: 'Gunakan awalan konvensional seperti feat:, fix:, docs:, style: pada commit message.'
        }
      }
    ]
  }
];

export const SYLLABUS_DATA: SyllabusItem[] = [
  {
    meeting: 1,
    title: 'Kontrak Kuliah & Pengenalan Ekosistem Web',
    category: 'Fundamental',
    cpmk: 'Mahasiswa mampu memahami arsitektur web client-server, protokol HTTP/HTTPS, dan setup environment.',
    description: 'Penyampaian RPS, kriteria penilaian, pengenalan tools wajib (VS Code, Git, Browser DevTools), serta sejarah evolusi World Wide Web.',
    materials: ['Slide Pengantar Arsitektur Web', 'Panduan Instalasi Tooling Dev', 'Daftar Ekstensi VS Code Rekomendasi'],
    practicalTask: 'Instalasi VS Code & Git di laptop masing-masing mahasiswa.',
    status: 'completed',
    dateSchedule: '10 Sep 2026'
  },
  {
    meeting: 2,
    title: 'HTML5 Semantik & Struktur Dokumen Standar',
    category: 'Dasar Web',
    cpmk: 'Mahasiswa mampu menyusun dokumen web berstandar W3C menggunakan elemen semantik yang ramah SEO & aksesibilitas.',
    description: 'Tag semantik, struktur teks, hyperlink, tabel data, form controls, dan validasi input HTML5.',
    materials: ['Modul HTML5 Semantik', 'Cheatsheet Tag HTML5 W3C'],
    practicalTask: 'Membuat halaman profil mahasiswa statis menggunakan tag semantik.',
    status: 'completed',
    dateSchedule: '17 Sep 2026'
  },
  {
    meeting: 3,
    title: 'CSS3 Styling Dasar & Box Model',
    category: 'CSS & UI',
    cpmk: 'Mahasiswa menguasai konsep cascading, inheritance, box model (margin, border, padding, content).',
    description: 'Selektor CSS, Box Sizing, typography, background, border radius, dan sistem pewarnaan RGB/HEX/HSL.',
    materials: ['Slide Box Model & Spefisitas Selektor', 'Latihan Box Sizing'],
    status: 'completed',
    dateSchedule: '24 Sep 2026'
  },
  {
    meeting: 4,
    title: 'Layout Responsif: Flexbox & Media Query',
    category: 'CSS & UI',
    cpmk: 'Mahasiswa mampu membangun tata letak web satu dimensi yang adaptif terhadap berbagai resolusi layar.',
    description: 'Flex container, flex items, justify-content, align-items, flex-wrap, dan mobile-first breakpoints.',
    materials: ['Interactive Flexbox Guide', 'Template Navbar Mobile'],
    practicalTask: 'Tugas 1: Pembuatan Kartu Portofolio Responsif.',
    status: 'completed',
    dateSchedule: '01 Okt 2026'
  },
  {
    meeting: 5,
    title: 'CSS Grid & Utility CSS (Tailwind)',
    category: 'CSS & UI',
    cpmk: 'Mahasiswa mampu mendesain layout 2 dimensi kompleks dan mengimplementasikan utility-first Tailwind CSS.',
    description: 'Grid-template-columns, gap, repeat(), dan pengenalan framework utilitas Tailwind CSS.',
    materials: ['Tailwind CSS Quick Reference', 'Lab Sheet CSS Grid Dashboard'],
    status: 'in-progress',
    dateSchedule: '08 Okt 2026'
  },
  {
    meeting: 6,
    title: 'Fundamental JavaScript Modern (ES6+)',
    category: 'JavaScript',
    cpmk: 'Mahasiswa memahami sintaks dasar JS, tipe data, scope, fungsi panah (arrow function), dan template literal.',
    description: 'Let vs Const vs Var, conditional logic, loops, arrow functions, objek dan array manipulasi dasar.',
    materials: ['Modul JS ES6+ untuk Mahasiswa SI', 'Kumpulan Soal Algoritma Web'],
    status: 'upcoming',
    dateSchedule: '15 Okt 2026'
  },
  {
    meeting: 7,
    title: 'DOM Manipulation & Event Handling',
    category: 'JavaScript',
    cpmk: 'Mahasiswa mampu menghubungkan aksi pengguna (klik, input, submit) dengan perubahan elemen pada layar.',
    description: 'QuerySelector, innerHTML, textContent, classList add/remove/toggle, dan addEventListener.',
    materials: ['Lab Sheet Interaktivitas DOM', 'Contoh Aplikasi Todo Vanilla'],
    practicalTask: 'Tugas 2: Kalkulator Konversi Nilai Mahasiswa SI.',
    status: 'upcoming',
    dateSchedule: '22 Okt 2026'
  },
  {
    meeting: 8,
    title: 'Ujian Tengah Semester (UTS)',
    category: 'Evaluasi',
    cpmk: 'Evaluasi kemampuan mahasiswa dalam merancang dan mengoding website statis interaktif berbasis HTML5, CSS, dan JS.',
    description: 'Pengerjaan proyek mandiri pembuatan Landing Page Informasi Layanan Kampus UNUGHA.',
    materials: ['Soal & Rubrik Penilaian UTS', 'Format Lembar Jawaban'],
    status: 'upcoming',
    dateSchedule: '29 Okt 2026'
  },
  {
    meeting: 9,
    title: 'Asynchronous JavaScript & Fetch API',
    category: 'JavaScript',
    cpmk: 'Mahasiswa mampu mengambil data dari REST API publik dan menampilkannya secara dinamis ke halaman web.',
    description: 'Promises, async/await, format data JSON, penanganan status HTTP (200, 404, 500), error handling try-catch.',
    materials: ['Panduan Mengonsumsi RESTful API', 'Daftar Public API Latihan'],
    status: 'upcoming',
    dateSchedule: '05 Nov 2026'
  },
  {
    meeting: 10,
    title: 'Penyimpanan Data di Browser (Storage API)',
    category: 'JavaScript',
    cpmk: 'Mahasiswa menguasai localStorage dan sessionStorage untuk menyimpan data pengguna tanpa database server.',
    description: 'Serialisasi JSON.stringify dan JSON.parse, persistensi preferensi tema gelap/terang, keranjang belanja lokal.',
    materials: ['Latihan LocalStorage Mahasiswa', 'Studi Kasus Bookmark Materi'],
    status: 'upcoming',
    dateSchedule: '12 Nov 2026'
  },
  {
    meeting: 11,
    title: 'Pengenalan Komponen Modern & Framework React',
    category: 'Modern Web',
    cpmk: 'Mahasiswa memahami konsep component-driven development, declarative UI, props, dan state dasar.',
    description: 'Evolusi dari Vanilla JS ke React SPA, JSX, useState hook, dan passing props antar komponen.',
    materials: ['Pengantar React untuk Pemula', 'Arsitektur Folder Proyek Vite'],
    status: 'upcoming',
    dateSchedule: '19 Nov 2026'
  },
  {
    meeting: 12,
    title: 'Git Version Control & Kolaborasi GitHub',
    category: 'Deploy & Git',
    cpmk: 'Mahasiswa mampu mengelola repositori kode, membuat branch, commit terstruktur, dan pull request tim.',
    description: 'Git workflow, merge conflict resolution, file .gitignore, dan pembuatan dokumentasi README portofolio.',
    materials: ['Cheatsheet Perintah Git Praktis', 'Panduan Kolaborasi Kelompok'],
    practicalTask: 'Tugas 3: Publikasi Repositori Portofolio di GitHub.',
    status: 'upcoming',
    dateSchedule: '26 Nov 2026'
  },
  {
    meeting: 13,
    title: 'Deployment Produksi ke Cloudflare Pages',
    category: 'Deploy & Git',
    cpmk: 'Mahasiswa mampu mempublikasikan aplikasi web ke infrastruktur edge global Cloudflare Pages dengan SSL otomatis.',
    description: 'Build script Vite, konfigurasi custom build output, menghubungkan GitHub repo ke Cloudflare Pages, custom domain.',
    materials: ['Step-by-Step Deploy Cloudflare Pages', 'Troubleshooting Build Error'],
    status: 'upcoming',
    dateSchedule: '03 Des 2026'
  },
  {
    meeting: 14,
    title: 'Optimasi Web Vitals & Keamanan Frontend',
    category: 'Kualitas Web',
    cpmk: 'Mahasiswa memahami metrik performa web (LCP, FID, CLS), optimasi ukuran gambar WebP, dan sanitasi input dari XSS.',
    description: 'Pengujian Google Lighthouse, lazy loading gambar, proteksi input form dasar, meta tag OpenGraph untuk sosial media.',
    materials: ['Checklist Audit Web Vitals', 'Praktik Audit Website Kampus'],
    status: 'upcoming',
    dateSchedule: '10 Des 2026'
  },
  {
    meeting: 15,
    title: 'Review Proyek Akhir & Asistensi Lab',
    category: 'Praktikum',
    cpmk: 'Asistensi kesiapan proyek akhir web terintegrasi kelompok mahasiswa sebelum sidang presentasi.',
    description: 'Code review bersama dosen pengampu, pengujian respon mobile, dan pemantapan link Cloudflare Pages.',
    materials: ['Formulir Asistensi Proyek Kelompok', 'Panduan Presentasi Teknis'],
    status: 'upcoming',
    dateSchedule: '17 Des 2026'
  },
  {
    meeting: 16,
    title: 'Ujian Akhir Semester (UAS): Presentasi Web',
    category: 'Evaluasi',
    cpmk: 'Presentasi dan demo langsung sistem web karya mahasiswa yang telah aktif di internet via Cloudflare Pages.',
    description: 'Demo langsung sistem web, tanya jawab teknis kode, penilaian kepatuhan semantik dan estetika responsif.',
    materials: ['Rubrik Penilaian UAS FTI UNUGHA', 'Jadwal Urutan Presentasi'],
    status: 'upcoming',
    dateSchedule: '24 Des 2026'
  }
];

export const ASSIGNMENTS_DATA: Assignment[] = [
  {
    id: 'tugas-01',
    title: 'Tugas 1: CV / Biodata Mahasiswa Semantik & Responsif',
    meetingRelated: 4,
    deadline: '10 Oktober 2026, 23.59 WIB',
    status: 'open',
    description: 'Rancang dan kembangkan halaman resume / CV online pribadi Anda sebagai mahasiswa Program Studi Sistem Informasi UNUGHA Cilacap. Harus dapat diakses nyaman di smartphone.',
    requirements: [
      'Gunakan minimal 5 elemen semantik HTML5 (<header>, <nav>, <main>, <section>, <footer>)',
      'Layout responsif (tampilan mobile dan desktop rapi)',
      'Gunakan CSS murni atau Tailwind CSS',
      'Deploy ke Cloudflare Pages dan push source code ke GitHub'
    ],
    rubric: [
      { criteria: 'Kepatuhan Semantik HTML & Aksesibilitas', weight: 30 },
      { criteria: 'Desain Responsif Mobile-First', weight: 30 },
      { criteria: 'Kelengkapan Konten Mahasiswa SI', weight: 20 },
      { criteria: 'Keberhasilan Deployment Cloudflare Pages', weight: 20 }
    ],
    templateRepo: 'https://github.com/widiyanto-unugha/template-cv-web'
  },
  {
    id: 'tugas-02',
    title: 'Tugas 2: Aplikasi Web Interaktif (Kalkulator Nilai / Katalog)',
    meetingRelated: 7,
    deadline: '31 Oktober 2026, 23.59 WIB',
    status: 'open',
    description: 'Buat aplikasi web interaktif menggunakan JavaScript DOM manipulation. Contoh topik: Kalkulator Penghitung IPK Semester Mahasiswa SI atau Aplikasi Manajemen Tugas Kuliah.',
    requirements: [
      'Validasi formulir input dengan feedback visual instan',
      'Manipulasi elemen DOM dinamis tanpa me-reload halaman',
      'Simpan riwayat input ke localStorage browser',
      'Desain touch-friendly dengan ukuran tombol minimal 44px'
    ],
    rubric: [
      { criteria: 'Logika & Penanganan Event JavaScript', weight: 40 },
      { criteria: 'Implementasi LocalStorage', weight: 20 },
      { criteria: 'Pengalaman Pengguna (UX) Mobile', weight: 20 },
      { criteria: 'Kerapihan Kode & Dokumentasi README', weight: 20 }
    ]
  },
  {
    id: 'tugas-uas',
    title: 'Proyek Akhir UAS: Portal Web Sistem Informasi Terintegrasi',
    meetingRelated: 15,
    deadline: '20 Desember 2026, 23.59 WIB',
    status: 'open',
    description: 'Kembangkan sebuah portal web interaktif lengkap (bisa bertema direktori UMKM Cilacap, portal kegiatan mahasiswa UNUGHA, atau sistem peminjaman lab komputer).',
    requirements: [
      'Dibangun dengan arsitektur modern (React/Vite atau Vanilla JS modular)',
      'Desain mobile-first responsif dengan Tailwind CSS',
      'Konsumsi minimal 1 data eksternal (REST API publik / data JSON terstruktur)',
      'Deploy aktif di Cloudflare Pages dengan nama subdomain jelas'
    ],
    rubric: [
      { criteria: 'Fungsionalitas & Kompleksitas Sistem', weight: 35 },
      { criteria: 'Kualitas UI/UX dan Mobile Adaptability', weight: 25 },
      { criteria: 'Kerapihan Git Commits & Kolaborasi', weight: 20 },
      { criteria: 'Presentasi & Penguasaan Materi', weight: 20 }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Manakah tag HTML5 yang paling tepat digunakan untuk membungkus konten utama yang unik dalam sebuah halaman web?',
    options: ['<section>', '<main>', '<article>', '<header>'],
    correctIndex: 1,
    explanation: 'Tag <main> dirancang khusus untuk menandai konten utama yang khas dan unik pada halaman tersebut, serta hanya boleh muncul satu kali dalam dokumen.'
  },
  {
    id: 2,
    question: 'Di era smartphone saat ini, berapakah ukuran minimum touch target (area sentuh tombol) yang disarankan agar pengguna tidak salah tekan?',
    options: ['24 x 24 px', '32 x 32 px', '44 x 44 px', '80 x 80 px'],
    correctIndex: 2,
    explanation: 'Menurut pedoman WCAG dan pedoman desain mobile modern (Apple Human Interface & Google Material), target sentuh minimal adalah 44x44px atau 48x48px.'
  },
  {
    id: 3,
    question: 'Apa perbedaan utama antara perintah `git add .` dan `git commit -m "..."`?',
    options: [
      'git add mengirim kode ke Cloudflare, sedangkan git commit mengunduhnya',
      'git add memindahkan file ke staging area, sedangkan git commit merekam riwayat permanen ke repositori lokal',
      'git add menghapus file sementara, sedangkan git commit membuat branch baru',
      'Keduanya memiliki fungsi identik tanpa perbedaan'
    ],
    correctIndex: 1,
    explanation: '`git add .` menyiapkan (stage) file yang berubah, sedangkan `git commit` mencatat snapshot permanen dengan pesan deskriptif di repo lokal.'
  },
  {
    id: 4,
    question: 'Saat mendeploy proyek web Vite ke Cloudflare Pages, folder output manakah yang biasanya dihasilkan dari perintah `npm run build`?',
    options: ['build/', 'src/', 'dist/', 'public/'],
    correctIndex: 2,
    explanation: 'Secara default, Vite mengompilasi dan mengoptimasi semua asset web siap produksi ke dalam direktori bernama `dist/`.'
  },
  {
    id: 5,
    question: 'Dalam JavaScript ES6, manakah method array yang digunakan untuk menyaring elemen berdasarkan kondisi tanpa mengubah array asli?',
    options: ['.map()', '.reduce()', '.filter()', '.push()'],
    correctIndex: 2,
    explanation: 'Method `.filter()` membuat array baru berisi elemen-elemen yang lolos evaluasi fungsi predicate (menghasilkan true).'
  }
];

export const CLOUDFLARE_PAGES_GUIDE = [
  {
    step: 1,
    title: 'Siapkan Proyek & Jalankan Build Lokal',
    description: 'Pastikan proyek Anda dapat dikompilasi tanpa error menggunakan Vite.',
    command: 'npm run build',
    detail: 'Periksa folder proyek Anda. Jika berhasil, Anda akan melihat folder baru bernama "dist" yang berisi file index.html, file CSS yang terkompresi, dan bundle JavaScript.'
  },
  {
    step: 2,
    title: 'Buat Akun di Cloudflare Dashboard',
    description: 'Daftar secara gratis di dash.cloudflare.com menggunakan email kampus (@unugha.id) atau email pribadi.',
    detail: 'Cloudflare Pages menyediakan hosting statis gratis selamanya, SSL otomatis tanpa biaya perpanjangan, dan kuota bandwidth yang sangat cukup untuk tugas perkuliahan.'
  },
  {
    step: 3,
    title: 'Hubungkan GitHub Repository',
    description: 'Pilih opsi "Connect to Git" agar setiap perubahan kode otomatis dideploy.',
    detail: 'Pilih repo proyek Anda di GitHub. Pada kolom "Build Settings", pilih framework preset "Vite", build command "npm run build", dan output directory "dist".'
  },
  {
    step: 4,
    title: 'Dapatkan Link *.pages.dev & Bagikan',
    description: 'Situs web Anda langsung live dalam waktu kurang dari 1 menit!',
    detail: 'Contoh link: https://si-unugha-webprog.pages.dev. Salin tautan ini dan masukkan ke formulir pengumpulan tugas praktikum di portal ini.'
  }
];
