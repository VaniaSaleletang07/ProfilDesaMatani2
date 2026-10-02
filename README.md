# Profil Kelurahan Matani 2

Website profil wilayah berbasis React, Vite, React Router, Tailwind CSS, Express, dan SQLite. Website publik bersifat informatif; perubahan konten hanya dapat dilakukan oleh satu role admin.

## Menjalankan proyek

```bash
cp .env.example .env
npm install
npm run dev
```

Di Windows PowerShell:

```powershell
Copy-Item .env.example .env
notepad .env
npm.cmd install
npm.cmd run dev
```

Alamat website mengikuti baris `WEB` pada terminal. API berjalan pada `http://127.0.0.1:4174`.

Build produksi:

```bash
npm run build
npm run preview
```

## Mengubah konten

Data awal berasal dari `src/data/`, kemudian disimpan di database SQLite saat server pertama kali berjalan. Sesudah itu, kelola konten melalui dashboard admin.

Untuk membuka login admin, klik tiga kali titik kecil paling kanan pada baris hak cipta di footer dalam waktu 1,2 detik. Path login diatur melalui `VITE_ADMIN_ENTRY_PATH` pada `.env`; jangan memakai `/admin/login`.

URL tersembunyi bukan lapisan keamanan. Dashboard tetap dilindungi autentikasi server, cookie `HttpOnly`, pembatasan percobaan login, dan pemeriksaan role untuk setiap operasi perubahan data.

Untuk peta, salin URL dari atribut `src` pada kode **Embed a map** Google Maps ke kolom URL embed di dashboard.

## Kredensial admin

Isi `ADMIN_USERNAME`, `ADMIN_PASSWORD` (minimal 12 karakter), dan `JWT_SECRET` (minimal 32 karakter) di `.env`. Jangan commit file `.env`. Pada saat server dimulai, kredensial tunggal di database akan diselaraskan dengan nilai `.env`.

## Placeholder yang perlu dilengkapi

### `src/data/desa.js`

- Slogan kelurahan
- Ringkasan singkat profil
- Alamat lengkap kantor
- Nomor telepon
- Hari dan jam layanan
- URL embed Google Maps

### `src/data/pemerintahan.js`

- Nama kepala wilayah
- Jabatan kepala wilayah

### `src/data/statistik.js`

- Jumlah penduduk
- Luas wilayah
- Jumlah lingkungan/jaga
- Jumlah kepala keluarga (KK)

### `src/data/potensi.js`

- Nama dan deskripsi tiga potensi unggulan

### `src/data/galeri.js`

- Judul dan deskripsi alternatif untuk enam foto galeri

### `src/data/site.js`

- Isi halaman Profil
- Isi halaman Pemerintahan
- Isi halaman Data Penduduk
- Isi halaman Potensi
- Isi halaman Wisata & Budaya
- Isi halaman Fasilitas
- Isi halaman Galeri
- Isi halaman Kontak
