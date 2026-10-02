export interface CodeRecipe {
  id: string;
  title: string;
  category: 'JavaScript' | 'CSS Layout' | 'DOM & Events' | 'Deploy & Git';
  description: string;
  difficulty: 'Mudah' | 'Menengah' | 'Lanjutan';
  code: string;
  language: string;
  notes?: string;
  tags: string[];
}

export const CODE_RECIPES_DATA: CodeRecipe[] = [
  {
    id: 'recipe-fetch',
    title: 'Fetch API Data Mahasiswa + Loading & Error State',
    category: 'JavaScript',
    difficulty: 'Menengah',
    tags: ['fetch', 'async-await', 'api', 'loading-state'],
    language: 'javascript',
    description: 'Pola standar industri untuk mengambil data JSON dari server dengan penanganan status loading dan pencegahan crash saat error.',
    notes: 'Selalu pastikan memeriksa res.ok untuk mendeteksi kode status HTTP 4xx dan 5xx.',
    code: `async function muatDataMahasiswa() {
  const statusEl = document.getElementById('status');
  const listEl = document.getElementById('daftar-mhs');
  
  statusEl.textContent = 'Memuat data...';
  
  try {
    const res = await fetch('https://api.unugha.ac.id/api/mahasiswa');
    if (!res.ok) {
      throw new Error(\`Gagal memuat data (HTTP \${res.status})\`);
    }
    
    const data = await res.json();
    statusEl.textContent = '';
    
    // Render ke DOM
    listEl.innerHTML = data.map(mhs => \`
      <li class="p-2 border-b flex justify-between">
        <strong>\${mhs.nama}</strong>
        <span class="text-gray-500 font-mono">\${mhs.nim}</span>
      </li>
    \`).join('');
  } catch (error) {
    statusEl.innerHTML = \`<span class="text-red-500">Error: \${error.message}</span>\`;
  }
}`
  },
  {
    id: 'recipe-grid-responsive',
    title: 'CSS Grid Auto-Fit Responsive Card Layout',
    category: 'CSS Layout',
    difficulty: 'Mudah',
    tags: ['css-grid', 'responsive', 'auto-fit', 'minmax'],
    language: 'css',
    description: 'Grid responsif otomatis tanpa perlu menulis puluhan media query breakpoint (@media) satu per satu.',
    notes: 'Kunci utamanya ada pada minmax(280px, 1fr) yang mengatur lebar kartu fleksibel minimal 280px.',
    code: `/* Container Kartu */
.card-grid {
  display: grid;
  /* Otomatis menyesuaikan jumlah kolom berdasarkan lebar layar */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

/* Kartu individual */
.card-item {
  background: white;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}`
  },
  {
    id: 'recipe-dark-mode-pure',
    title: 'Dark Mode Switcher dengan LocalStorage & OS Preference',
    category: 'DOM & Events',
    difficulty: 'Menengah',
    tags: ['dark-mode', 'localstorage', 'theme', 'dom'],
    language: 'javascript',
    description: 'Logika tema gelap modern yang mengingat preferensi user dan otomatis mengikuti preferensi sistem operasi mahasiswa.',
    notes: 'Cocok digunakan bersama Tailwind CSS (mode class) pada tag <html>.',
    code: `// 1. Cek preferensi saat halaman pertama dimuat
function inisialisasiTema() {
  const temaTersimpan = localStorage.getItem('theme');
  const preferensiOS = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (temaTersimpan === 'dark' || (!temaTersimpan && preferensiOS)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

// 2. Fungsi Toggle saat tombol ditekan
function toggleTema() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Jalankan otomatis
inisialisasiTema();`
  },
  {
    id: 'recipe-event-delegation',
    title: 'Event Delegation DOM (Efisien Memory)',
    category: 'DOM & Events',
    difficulty: 'Menengah',
    tags: ['event-delegation', 'dom', 'closest', 'performance'],
    language: 'javascript',
    description: 'Teknik performa tinggi: hanya 1 event listener pada parent list daripada ratusan listener pada setiap tombol item.',
    notes: 'Gunakan e.target.closest() agar klik pada ikon anak tetap mengenai tombol yang dituju.',
    code: `const todoList = document.querySelector('#daftar-tugas');

todoList.addEventListener('click', (e) => {
  // Cek apakah tombol hapus yang diklik
  const btnHapus = e.target.closest('.btn-hapus');
  if (btnHapus) {
    const itemCard = btnHapus.closest('.item-tugas');
    const taskId = itemCard.dataset.id;
    
    // Hapus dengan transisi
    itemCard.classList.add('opacity-0', 'scale-95');
    setTimeout(() => itemCard.remove(), 200);
    console.log('Tugas dihapus:', taskId);
  }
});`
  },
  {
    id: 'recipe-cloudflare-redirects',
    title: 'Konfigurasi SPA Routing Cloudflare Pages (_routes.json / 200.html)',
    category: 'Deploy & Git',
    difficulty: 'Mudah',
    tags: ['cloudflare', 'spa-routing', 'pages', 'deployment'],
    language: 'json',
    description: 'Mencegah error 404 saat mahasiswa me-refresh halaman pada Single Page App (React/Vite) di Cloudflare Pages.',
    notes: 'Tempatkan file _redirects di dalam folder public/ pada proyek Vite Anda.',
    code: `/* /index.html 200

# Atau buat file public/_routes.json:
{
  "version": 1,
  "include": ["/*"],
  "exclude": ["/assets/*", "/favicon.ico", "/robots.txt"]
}`
  },
  {
    id: 'recipe-git-cheatsheet',
    title: 'Resep Alur Kerja Kolaborasi Git & GitHub',
    category: 'Deploy & Git',
    difficulty: 'Mudah',
    tags: ['git', 'github', 'branch', 'push', 'merge'],
    language: 'bash',
    description: 'Perintah-perintah terminal harian yang wajib dikuasai mahasiswa saat mengerjakan tugas proyek dan praktikum.',
    notes: 'Jangan pernah commit kredensial API atau folder node_modules.',
    code: `# 1. Mengambil update terbaru dari dosen/tim
git pull origin main

# 2. Membuat branch baru untuk fitur praktikum
git checkout -b fitur/praktikum-dom

# 3. Melihat berkas apa saja yang berubah
git status -s

# 4. Menyimpan perubahan dengan pesan rapi
git add .
git commit -m "feat(dom): selesaikan manipulasi to-do list"

# 5. Mengirim branch ke GitHub
git push -u origin fitur/praktikum-dom`
  }
];
