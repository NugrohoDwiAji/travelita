import { put } from '@vercel/blob';
import fs from 'fs/promises';
import path from 'path';

export async function uploadFile(file: File, folder: string) {
  // CEK APAKAH LAGI DI PRODUCTION ATAU LOKAL
  if (process.env.STORAGE_TYPE === 'VERCEL_BLOB') {
    // KODE UNTUK PRODUCTION (VERCEL BLOB)
    const blob = await put(`${folder}/${file.name}`, file, {
      access: 'public', // atau konfigurasi private jika tersedia
    });
    return blob.url;
  } else {
    // KODE UNTUK LOCAL (FOLDER PUBLIC)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Simpan ke public/uploads/...
    const relativePath = `/uploads/${folder}/${Date.now()}-${file.name}`;
    const fullPath = path.join(process.cwd(), 'public', relativePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    
    await fs.writeFile(fullPath, buffer);
    return relativePath; // Mengembalikan path lokal: /uploads/ktp/123.jpg
  }
}