export interface Flashcard {
  id: number;
  category: 'Dasar Web' | 'CSS & Layout' | 'JavaScript & DOM' | 'Git & Deploy';
  meetingRef: string;
  frontQuestion: string;
  frontHint?: string;
  backAnswer: string;
  backCodeSnippet?: string;
  explanation: string;
}

export const FLASHCARDS_DATA: Flashcard[] = [
  {
    id: 1,
    category: 'Dasar Web',
    meetingRef: 'Prt. 1 & 2',
    frontQuestion: 'Apa perbedaan mendasar antara tag semantik `<article>` dan `<section>` dalam HTML5?',
    frontHint: 'Pikirkan tentang sindikasi konten independen vs pengelompokan tematik.',
    backAnswer: '<article> bersifat mandiri dan dapat berdiri sendiri (dapat disindikasikan), sedangkan <section> adalah pengelompokan tematik dari konten yang saling terkait.',
    backCodeSnippet: `<article>\n  <h2>Judul Artikel</h2>\n  <section>\n    <h3>Sub-topik A</h3>\n  </section>\n</article>`,
    explanation: 'Gunakan <article> untuk blog post, berita, atau kartu produk. Gunakan <section> jika konten membutuhkan judul bab/bagian dalam suatu dokumen.'
  },
  {
    id: 2,
    category: 'Dasar Web',
    meetingRef: 'Prt. 2',
    frontQuestion: 'Mengapa atribut `alt` wajib disertakan pada tag `<img>`?',
    frontHint: 'Fokus pada aksesibilitas dan SEO.',
    backAnswer: 'Sebagai teks alternatif bagi pengguna tunanetra yang memakai Screen Reader, serta fallback jika gambar gagal dimuat akibat jaringan lambat.',
    backCodeSnippet: `<img src="gedung-unugha.jpg" alt="Gedung Rektorat UNUGHA Cilacap tampak depan" loading="lazy" />`,
    explanation: 'Jangan biarkan atribut alt kosong kecuali jika gambar murni bersifat dekoratif visual (alt="").'
  },
  {
    id: 3,
    category: 'CSS & Layout',
    meetingRef: 'Prt. 3',
    frontQuestion: 'Bagaimana cara termudah menempatkan elemen persis di tengah (horizontal & vertikal) menggunakan CSS Flexbox?',
    frontHint: 'Hanya butuh 3 baris CSS pada container parent.',
    backAnswer: 'Gunakan display: flex, justify-content: center, dan align-items: center.',
    backCodeSnippet: `.parent {\n  display: flex;\n  justify-content: center; /* Sumbu utama (X) */\n  align-items: center;     /* Sumbu silang (Y) */\n  min-height: 100vh;\n}`,
    explanation: 'Dalam Tailwind CSS, Anda cukup menulis class "flex items-center justify-center min-h-screen".'
  },
  {
    id: 4,
    category: 'CSS & Layout',
    meetingRef: 'Prt. 3 & 4',
    frontQuestion: 'Apa fungsi dari `box-sizing: border-box;` dalam CSS?',
    frontHint: 'Berkaitan dengan perhitungan padding dan border pada lebar elemen.',
    backAnswer: 'Memastikan padding dan border disertakan dalam perhitungan total width dan height elemen, sehingga elemen tidak membesar melebihi ukuran yang ditentukan.',
    backCodeSnippet: `* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}`,
    explanation: 'Tanpa border-box (default: content-box), kotak dengan width 200px + padding 20px akan menjadi 240px di layar dan merusak grid.'
  },
  {
    id: 5,
    category: 'CSS & Layout',
    meetingRef: 'Prt. 4',
    frontQuestion: 'Apa perbedaan antara `gap` pada Flexbox/Grid dengan `margin` antar elemen anak?',
    frontHint: 'Pikirkan tentang margin pada elemen terluar (pertama dan terakhir).',
    backAnswer: '`gap` hanya memberi jarak ANTARA elemen (gutters) tanpa menambahkan margin di sisi luar (tepi awal atau akhir).',
    backCodeSnippet: `.card-container {\n  display: flex;\n  gap: 1.5rem; /* Rapi tanpa repot :first-child / :last-child */\n}`,
    explanation: 'Gap adalah standar modern yang menggantikan teknik lama margin-right dengan selector :not(:last-child).'
  },
  {
    id: 6,
    category: 'JavaScript & DOM',
    meetingRef: 'Prt. 5',
    frontQuestion: 'Apa perbedaan utama antara `const`, `let`, dan `var` dalam JavaScript modern (ES6)?',
    frontHint: 'Perhatikan block scope vs function scope dan re-assignment.',
    backAnswer: '`const` tidak dapat di-reassign (tetap), `let` dapat di-reassign, dan keduanya bersifat Block Scoped {}. Sedangkan `var` bersifat function scoped dan mengalami hoisting tak aman.',
    backCodeSnippet: `const PI = 3.14159; // Nilai tidak bisa diubah\nlet counter = 0;   // Bisa diubah\ncounter += 1;`,
    explanation: 'Aturan modern: Selalu gunakan `const` secara default. Gunakan `let` hanya jika nilainya memang harus berubah (misal counter loop). Hindari `var` sama sekali.'
  },
  {
    id: 7,
    category: 'JavaScript & DOM',
    meetingRef: 'Prt. 5 & 6',
    frontQuestion: 'Apa itu "Event Bubbling" dalam DOM dan bagaimana cara menghentikannya?',
    frontHint: 'Event merambat ke atas menuju parent.',
    backAnswer: 'Event Bubbling adalah fenomena di mana event yang terjadi pada elemen anak merambat naik ke parent-parent di atasnya. Dihentikan dengan `e.stopPropagation()`.',
    backCodeSnippet: `button.addEventListener('click', (e) => {\n  e.stopPropagation(); // Mencegah klik menyebar ke card parent\n  console.log('Button clicked!');\n});`,
    explanation: 'Sering dipakai saat membuat tombol bookmark atau hapus di dalam kartu yang juga memiliki event klik navigasi.'
  },
  {
    id: 8,
    category: 'JavaScript & DOM',
    meetingRef: 'Prt. 6',
    frontQuestion: 'Bagaimana cara melakukan request data API dengan aman menggunakan `async/await` dan `try...catch`?',
    frontHint: 'Gunakan fetch dan selalu cek response.ok.',
    backAnswer: 'Gunakan fungsi async, await fetch(), cek res.ok, lalu parse res.json() di dalam blok try...catch untuk menangani kegagalan jaringan.',
    backCodeSnippet: `async function getMahasiswa() {\n  try {\n    const res = await fetch('https://api.unugha.ac.id/data');\n    if (!res.ok) throw new Error(\`HTTP error! status: \${res.status}\`);\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error('Fetch gagal:', err);\n  }\n}`,
    explanation: 'Fetch tidak otomatis melempar error saat HTTP 404 atau 500, melainkan hanya saat koneksi jaringan putus. Oleh karena itu pengecekan !res.ok sangat penting.'
  },
  {
    id: 9,
    category: 'Git & Deploy',
    meetingRef: 'Prt. 7',
    frontQuestion: 'Apa perbedaan antara `git add .` dan `git commit -m "pesan"`?',
    frontHint: 'Staging Area vs History Repository.',
    backAnswer: '`git add .` memindahkan file perubahan ke Staging Area (siap disimpan), sedangkan `git commit` menyimpan snapshot perubahan tersebut secara permanen ke riwayat git.',
    backCodeSnippet: `git add .                          # Siapkan semua berkas\ngit commit -m "feat: tambah modal"  # Rekam snapshot\ngit push origin main              # Kirim ke Cloudflare/GitHub`,
    explanation: 'Staging area memberikan kontrol bagi developer untuk memilih berkas mana saja yang pantas masuk ke dalam satu unit commit.'
  },
  {
    id: 10,
    category: 'Git & Deploy',
    meetingRef: 'Prt. 7',
    frontQuestion: 'Mengapa folder `node_modules/` dan file `.env` wajib dimasukkan ke dalam `.gitignore`?',
    frontHint: 'Ukuran file dan keamanan kredensial.',
    backAnswer: '`node_modules/` berukuran sangat besar (ratusan MB) dan dapat di-generate ulang dengan `npm install`. Sementara `.env` berisi rahasia/token sensitif yang tidak boleh bocor ke publik.',
    backCodeSnippet: `# .gitignore\nnode_modules/\n.env\ndist/\n*.log`,
    explanation: 'Mengunggah node_modules ke GitHub membuat proses cloning lambat dan sering menyebabkan kegagalan build pada platform CI/CD seperti Cloudflare Pages.'
  }
];
