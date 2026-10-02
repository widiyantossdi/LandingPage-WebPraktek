import { jsPDF } from 'jspdf';
import { Article } from '../types/course';
import { BadgeItem } from '../components/ProgressDashboard';

interface StudentInfo {
  name: string;
  nim: string;
}

export function generateProgressPdf(
  articles: Article[],
  completedIds: string[],
  badges: BadgeItem[],
  studentInfo: StudentInfo = { name: 'Mahasiswa Sistem Informasi', nim: 'SI-2024-XXXX' }
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 18;
  const contentWidth = pageWidth - marginX * 2;

  let y = 16;

  // Header Accent Top Bar
  doc.setFillColor(5, 150, 105); // emerald-600
  doc.rect(0, 0, pageWidth, 5, 'F');

  // University & Faculty Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('UNIVERSITAS NAHDLATUL ULAMA AL GHAZALI (UNUGHA)', marginX, y);
  y += 5.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105); // slate-600
  doc.text('FAKULTAS ILMU KOMPUTER · PROGRAM STUDI SISTEM INFORMASI', marginX, y);
  y += 4.5;
  doc.setFontSize(8.5);
  doc.text('Jl. Kemerdekaan Barat No.17 Kesugihan, Cilacap, Jawa Tengah 53274', marginX, y);
  y += 4;

  // Dividing Line
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.setLineWidth(0.6);
  doc.line(marginX, y, pageWidth - marginX, y);
  y += 7;

  // Document Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(4, 120, 87); // emerald-700
  doc.text('LAPORAN CAPAIAN & PROGRES BELAJAR MAHASISWA', marginX, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139); // slate-500
  const todayStr = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long'
  }).format(new Date());
  doc.text(`Mata Kuliah: Pemrograman Web (3 SKS) · Dicetak pada: ${todayStr}`, marginX, y);
  y += 7;

  // Student & Course Info Box
  const totalArticles = articles.length;
  const completedCount = completedIds.length;
  const percentage = totalArticles > 0 ? Math.round((completedCount / totalArticles) * 100) : 0;

  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.roundedRect(marginX, y, contentWidth, 23, 2, 2, 'FD');

  const col1X = marginX + 4;
  const col2X = marginX + 90;

  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Nama Mahasiswa:', col1X, y + 6);
  doc.text('NIM / Identitas:', col1X, y + 12);
  doc.text('Dosen Pengampu:', col1X, y + 18);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(studentInfo.name || 'Mahasiswa SI UNUGHA', col1X + 28, y + 6);
  doc.text(studentInfo.nim || '-', col1X + 28, y + 12);
  doc.text('Widiyanto, M.Kom.', col1X + 28, y + 18);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Total Modul Selesai:', col2X, y + 6);
  doc.text('Persentase Capaian:', col2X, y + 12);
  doc.text('Status Kelulusan Materi:', col2X, y + 18);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(4, 120, 87);
  doc.text(`${completedCount} dari ${totalArticles} Modul`, col2X + 36, y + 6);
  doc.text(`${percentage}% Tuntas`, col2X + 36, y + 12);
  doc.text(percentage === 100 ? 'LULUS MATERI (SIAP UAS)' : 'DALAM PROGRES', col2X + 36, y + 18);

  y += 29;

  // Section: Rincian Modul Perkuliahan
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('A. Rincian Capaian per Modul Perkuliahan', marginX, y);
  y += 4.5;

  // Table Header
  const tableHeaderY = y;
  doc.setFillColor(241, 245, 249); // slate-100
  doc.rect(marginX, tableHeaderY, contentWidth, 6.5, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.line(marginX, tableHeaderY, pageWidth - marginX, tableHeaderY);
  doc.line(marginX, tableHeaderY + 6.5, pageWidth - marginX, tableHeaderY + 6.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text('No', marginX + 3, tableHeaderY + 4.5);
  doc.text('Pertemuan', marginX + 11, tableHeaderY + 4.5);
  doc.text('Judul Modul Pembelajaran', marginX + 31, tableHeaderY + 4.5);
  doc.text('Klaster', marginX + 115, tableHeaderY + 4.5);
  doc.text('Status Capaian', marginX + 146, tableHeaderY + 4.5);

  y += 6.5;

  // Table Rows
  articles.forEach((art, index) => {
    const isCompleted = completedIds.includes(art.id);
    const rowY = y;

    if (index % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(marginX, rowY, contentWidth, 6, 'F');
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);

    // No
    doc.text(String(index + 1), marginX + 3, rowY + 4.2);
    // Pertemuan
    doc.text(`Prt. ${art.meetingNumber}`, marginX + 11, rowY + 4.2);

    // Title (truncate if too long)
    const titleSnippet = art.title.length > 50 ? `${art.title.slice(0, 48)}...` : art.title;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(titleSnippet, marginX + 31, rowY + 4.2);

    // Klaster
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(art.category, marginX + 115, rowY + 4.2);

    // Status Badge text
    if (isCompleted) {
      doc.setTextColor(5, 150, 105);
      doc.setFont('helvetica', 'bold');
      doc.text('[X] SELESAI', marginX + 146, rowY + 4.2);
    } else {
      doc.setTextColor(148, 163, 184);
      doc.setFont('helvetica', 'normal');
      doc.text('[ ] Belum Dibaca', marginX + 146, rowY + 4.2);
    }

    // Border line bottom
    doc.setDrawColor(241, 245, 249);
    doc.setLineWidth(0.3);
    doc.line(marginX, rowY + 6, pageWidth - marginX, rowY + 6);

    y += 6;
  });

  y += 5;

  // Section: Lencana Prestasi (Badges)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('B. Lencana Prestasi yang Telah Diraih', marginX, y);
  y += 4.5;

  const unlockedBadges = badges.filter((b) => b.isUnlocked);
  if (unlockedBadges.length > 0) {
    unlockedBadges.forEach((badge) => {
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(4, 120, 87);
      doc.text(`* ${badge.title} (${badge.subtitle})`, marginX + 4, y + 3.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      doc.text(` - ${badge.description}`, marginX + 65, y + 3.5);
      y += 5;
    });
  } else {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text('Belum ada lencana yang terbuka. Tuntaskan modul untuk mengumpulkan lencana prestasi.', marginX + 4, y + 3.5);
    y += 6;
  }

  y += 7;

  // Signatures Section
  const sigY = Math.min(y, pageHeight - 45);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);

  // Left signature (Mahasiswa)
  doc.text('Mahasiswa yang bersangkutan,', marginX + 10, sigY);
  doc.text('Tanda Tangan:', marginX + 10, sigY + 14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`( ${studentInfo.name || 'Mahasiswa'} )`, marginX + 10, sigY + 22);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`NIM: ${studentInfo.nim || '-'}`, marginX + 10, sigY + 26);

  // Right signature (Dosen Pengampu)
  const rightSigX = pageWidth - marginX - 60;
  doc.text(`Cilacap, ${todayStr}`, rightSigX, sigY - 4);
  doc.text('Dosen Pengampu Pemrograman Web,', rightSigX, sigY);
  doc.text('Tanda Tangan:', rightSigX, sigY + 14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('( Widiyanto, M.Kom. )', rightSigX, sigY + 22);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('NIDN. UNUGHA Cilacap', rightSigX, sigY + 26);

  // Bottom footer note
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text(
    'Laporan ini digenerate secara otomatis oleh Learning Hub Mahasiswa Pemrograman Web SI UNUGHA Cilacap.',
    pageWidth / 2,
    pageHeight - 6,
    { align: 'center' }
  );

  // Trigger download
  const safeFilename = `Laporan-Progres-Web-${(studentInfo.name || 'Mahasiswa')
    .replace(/\s+/g, '-')
    .slice(0, 20)}.pdf`;
  doc.save(safeFilename);
}
