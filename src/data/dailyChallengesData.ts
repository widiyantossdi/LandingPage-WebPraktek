export interface ChallengeCriterion {
  id: string;
  label: string;
  check: (code: string) => boolean;
}

export interface DailyChallenge {
  id: string;
  dayTitle: string;
  title: string;
  topic: 'HTML5' | 'CSS3' | 'JavaScript';
  difficulty: 'Mudah' | 'Menengah' | 'Tantangan';
  timeLimitSeconds: number; // e.g. 180 = 3 minutes
  description: string;
  basePoints: number;
  initialCode: string;
  language: 'html' | 'css' | 'javascript';
  criteria: ChallengeCriterion[];
  solutionSnippet: string;
  explanation: string;
  hints: string[];
}

export const DAILY_CHALLENGES_DATA: DailyChallenge[] = [
  {
    id: 'dc-01',
    dayTitle: 'Tantangan Hari Ini #1',
    title: 'Formulir Pendaftaran Mahasiswa UNUGHA',
    topic: 'HTML5',
    difficulty: 'Mudah',
    timeLimitSeconds: 180,
    basePoints: 100,
    language: 'html',
    description:
      'Buatlah formulir HTML yang memiliki input Nama Mahasiswa (type="text" required), input Email Kampus (type="email" required), dan tombol Submit bertuliskan "Kirim Formulir".',
    initialCode: `<!-- Tulis kode HTML Formulir di sini -->
<div class="form-container">
  <h2>Pendaftaran Mahasiswa</h2>
  
</div>`,
    criteria: [
      {
        id: 'c1',
        label: 'Menggunakan elemen <form> pembungkus',
        check: (code) => /<form[\s\S]*>[\s\S]*<\/form>/i.test(code)
      },
      {
        id: 'c2',
        label: 'Memiliki input dengan type="text" dan atribut required',
        check: (code) => /<input[^>]*type=["']text["'][^>]*required/i.test(code) || /<input[^>]*required[^>]*type=["']text["']/i.test(code)
      },
      {
        id: 'c3',
        label: 'Memiliki input dengan type="email" dan atribut required',
        check: (code) => /<input[^>]*type=["']email["'][^>]*required/i.test(code) || /<input[^>]*required[^>]*type=["']email["']/i.test(code)
      },
      {
        id: 'c4',
        label: 'Memiliki elemen <button> dengan teks "Kirim Formulir"',
        check: (code) => /<button[^>]*>[\s\S]*Kirim Formulir[\s\S]*<\/button>/i.test(code)
      }
    ],
    solutionSnippet: `<form class="form-container">
  <h2>Pendaftaran Mahasiswa</h2>
  <label for="nama">Nama Lengkap:</label>
  <input type="text" id="nama" name="nama" required placeholder="Masukkan Nama" />
  
  <label for="email">Email Mahasiswa:</label>
  <input type="email" id="email" name="email" required placeholder="nama@unugha.ac.id" />
  
  <button type="submit">Kirim Formulir</button>
</form>`,
    explanation:
      'Validasi formulir bawaan HTML5 (type="email" dan required) memvalidasi input sebelum dikirim ke server tanpa perlu baris JavaScript tambahan.',
    hints: [
      'Gunakan tag <form> untuk membungkus semua elemen input dan tombol.',
      'Tambahkan kata "required" di dalam tag <input>.',
      'Pastikan tulisan pada tombol adalah "Kirim Formulir".'
    ]
  },
  {
    id: 'dc-02',
    dayTitle: 'Tantangan Hari Ini #2',
    title: 'Kartu Profil Terpusat Sempurna (Flexbox Center)',
    topic: 'CSS3',
    difficulty: 'Mudah',
    timeLimitSeconds: 150,
    basePoints: 100,
    language: 'css',
    description:
      'Gunakan CSS Flexbox pada selektor `.wrapper` untuk memusatkan kartu profil tepat di tengah layar secara horizontal dan vertikal, lalu beri `.card` sudut tumpul (border-radius) dan bayangan (box-shadow).',
    initialCode: `/* Lengkapi CSS di bawah ini */
.wrapper {
  min-height: 100vh;
  /* Tambahkan properti flexbox di sini */
}

.card {
  width: 300px;
  padding: 20px;
  background: #ffffff;
  /* Tambahkan border-radius dan box-shadow di sini */
}`,
    criteria: [
      {
        id: 'c1',
        label: 'Menggunakan "display: flex;" pada .wrapper',
        check: (code) => /display\s*:\s*flex/i.test(code)
      },
      {
        id: 'c2',
        label: 'Penyelarasan horizontal dengan "justify-content: center;"',
        check: (code) => /justify-content\s*:\s*center/i.test(code)
      },
      {
        id: 'c3',
        label: 'Penyelarasan vertikal dengan "align-items: center;"',
        check: (code) => /align-items\s*:\s*center/i.test(code)
      },
      {
        id: 'c4',
        label: 'Menambahkan "border-radius" pada kartu',
        check: (code) => /border-radius\s*:\s*[^;]+;/i.test(code)
      },
      {
        id: 'c5',
        label: 'Menambahkan "box-shadow" pada kartu',
        check: (code) => /box-shadow\s*:\s*[^;]+;/i.test(code)
      }
    ],
    solutionSnippet: `.wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f5f9;
}

.card {
  width: 300px;
  padding: 20px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}`,
    explanation:
      'Kombinasi `display: flex; justify-content: center; align-items: center;` pada elemen parent dengan `min-height: 100vh;` adalah teknik paling standar dan andal untuk memusatkan elemen di web modern.',
    hints: [
      'Gunakan justify-content: center untuk sumbu utama.',
      'Gunakan align-items: center untuk sumbu silang.',
      'Gunakan nilai px atau rem pada border-radius, contoh: border-radius: 12px;'
    ]
  },
  {
    id: 'dc-03',
    dayTitle: 'Tantangan Hari Ini #3',
    title: 'Counter Penilai Interaktif DOM Event Listener',
    topic: 'JavaScript',
    difficulty: 'Menengah',
    timeLimitSeconds: 210,
    basePoints: 120,
    language: 'javascript',
    description:
      'Tulis kode JavaScript untuk menginisialisasi variabel `nilai = 0`. Tambahkan event listener "click" pada elemen `#btn-tambah` yang akan menambah `nilai` sebesar 10 poin dan memperbarui teks pada `#angka-skor`.',
    initialCode: `// Inisialisasi variabel dan ambil elemen DOM
let nilai = 0;
const btnTambah = document.getElementById('btn-tambah');
const angkaSkor = document.getElementById('angka-skor');

// Tulis event listener Anda di bawah ini:
`,
    criteria: [
      {
        id: 'c1',
        label: 'Memasang event listener dengan method "addEventListener"',
        check: (code) => /btnTambah\.addEventListener\s*\(\s*['"]click['"]/i.test(code) || /addEventListener\s*\(\s*['"]click['"]/i.test(code)
      },
      {
        id: 'c2',
        label: 'Menambah nilai sebesar 10 (nilai += 10 atau nilai = nilai + 10)',
        check: (code) => /nilai\s*\+=\s*10/i.test(code) || /nilai\s*=\s*nilai\s*\+\s*10/i.test(code)
      },
      {
        id: 'c3',
        label: 'Memperbarui tampilan dengan "textContent" atau "innerText"',
        check: (code) => /angkaSkor\.(textContent|innerText|innerHTML)\s*=\s*nilai/i.test(code) || /angkaSkor\.(textContent|innerText|innerHTML)\s*=/i.test(code)
      }
    ],
    solutionSnippet: `let nilai = 0;
const btnTambah = document.getElementById('btn-tambah');
const angkaSkor = document.getElementById('angka-skor');

btnTambah.addEventListener('click', () => {
  nilai += 10;
  angkaSkor.textContent = nilai;
});`,
    explanation:
      '`addEventListener("click", ...)` tidak menimpa handler lain seperti `onclick`, dan memperbarui `textContent` lebih aman dari celah XSS dibanding `innerHTML`.',
    hints: [
      'Gunakan sintaks: btnTambah.addEventListener("click", () => { ... });',
      'Di dalam callback, tambahkan nilai += 10;',
      'Lalu pasang ke tampilan: angkaSkor.textContent = nilai;'
    ]
  },
  {
    id: 'dc-04',
    dayTitle: 'Tantangan Hari Ini #4',
    title: 'Filter Nilai Kelulusan Mahasiswa (ES6 Array Method)',
    topic: 'JavaScript',
    difficulty: 'Menengah',
    timeLimitSeconds: 180,
    basePoints: 110,
    language: 'javascript',
    description:
      'Diberikan array objek nilai mahasiswa. Gunakan metode `daftarMahasiswa.filter()` untuk menghasilkan array baru `mahasiswaLulus` yang hanya berisi mahasiswa dengan `nilai >= 60`.',
    initialCode: `const daftarMahasiswa = [
  { nama: 'Budi', nilai: 75 },
  { nama: 'Siti', nilai: 55 },
  { nama: 'Ahmad', nilai: 88 },
  { nama: 'Dewi', nilai: 45 },
  { nama: 'Fajar', nilai: 60 }
];

// Tulis kode filter di bawah ini:
const mahasiswaLulus = 
`,
    criteria: [
      {
        id: 'c1',
        label: 'Menggunakan method array ".filter()"',
        check: (code) => /daftarMahasiswa\.filter\s*\(/i.test(code)
      },
      {
        id: 'c2',
        label: 'Kondisi kelulusan nilai >= 60',
        check: (code) => /nilai\s*>=\s*60/i.test(code)
      },
      {
        id: 'c3',
        label: 'Menyimpan hasil ke variabel "mahasiswaLulus"',
        check: (code) => /const\s+mahasiswaLulus\s*=\s*daftarMahasiswa\.filter/i.test(code) || /mahasiswaLulus\s*=/i.test(code)
      }
    ],
    solutionSnippet: `const daftarMahasiswa = [
  { nama: 'Budi', nilai: 75 },
  { nama: 'Siti', nilai: 55 },
  { nama: 'Ahmad', nilai: 88 },
  { nama: 'Dewi', nilai: 45 },
  { nama: 'Fajar', nilai: 60 }
];

const mahasiswaLulus = daftarMahasiswa.filter(mhs => mhs.nilai >= 60);
console.log('Jumlah Lulus:', mahasiswaLulus.length);`,
    explanation:
      '`filter()` adalah Higher-Order Function murni (immutable) yang tidak memutasi array asli, melainkan mengembalikan array baru berisi elemen yang memenuhi syarat kondisi.',
    hints: [
      'Gunakan arrow function: (mhs) => mhs.nilai >= 60',
      'Array filter secara otomatis mengevaluasi boolean true/false untuk tiap item.'
    ]
  }
];
