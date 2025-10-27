# MyMedica - Sistem Antrian Layanan Kesehatan

Ini adalah *submission* untuk *coding test* **Healthcare Queue System**. Proyek ini adalah sistem antrian *multi-tenant* yang dibangun menggunakan Next.js (App Router), Prisma, dan MySQL. Sistem ini memungkinkan setiap penyedia layanan kesehatan (tenant) untuk mengelola alur antrian pasien mereka sendiri.

## Demo Langsung

Proyek ini di-hosting di Vercel dan dapat diakses di sini:
[https://mymedica-queue.vercel.app/](https://mymedica-queue.vercel.app/)

## Fitur Utama

Berdasarkan persyaratan, aplikasi ini mencakup fitur-fitur berikut:

* **Arsitektur Multi-Tenant:** Isolasi data berbasis baris menggunakan `tenant_id` untuk memastikan setiap tenant only dapat mengakses datanya sendiri.
* **Autentikasi Admin:** Fungsionalitas *login* dasar untuk admin tenant.
* **Manajemen Tenant & Tahapan:** Operasi CRUD penuh untuk Tenant dan Tahapan Antrian (Queue Stages).
* **Dasbor Admin:** Dasbor untuk admin tenant melihat antrian aktif, memindahkan pasien ke tahap berikutnya, dan mengedit tahapan.
* **API Operasi Antrian:** *Endpoint* REST API untuk menambah pasien, memindahkan antrian, menandai selesai, dan melihat antrian.
* **(Bonus) Notifikasi Email:** Mengirim email notifikasi (menggunakan Resend) ketika pasien baru bergabung dalam antrian.

## Teknologi yang Digunakan

Berikut adalah teknologi utama yang digunakan dalam proyek ini:

* **Framework:** Next.js 14 (App Router)
* **Database:** MySQL
* **ORM:** Prisma
* **Autentikasi:** better-auth
* **Komponen UI:** shadcn/ui
* **Layanan Email:** Resend
* **Deployment:** Vercel

## Penyiapan Lingkungan Lokal

Berikut adalah langkah-langkah untuk menjalankan proyek ini secara lokal.

### 1. Prasyarat

* Node.js (v22 atau lebih baru)
* Database MySQL yang sedang berjalan
* `npm` 

### 2. Instalasi

1.  **Clone repositori:**

    ```bash
    git clone https://github.com/hadiid-studentcode/mymedica-queue.git
    cd mymedica-queue
    ```

2.  **Instal dependensi:**

    ```bash
    npm install
    # atau
    yarn install
    ```

3.  **Siapkan Variabel Lingkungan:**
    Buat file `.env` di root proyek dan salin konten dari `.env.example`.

    **`.env.example`**

    ```env
    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
    
    # Auth Secret (ganti dengan string acak yang kuat)
    BETTER_AUTH_SECRET="supersecret"
    BETTER_AUTH_URL="http://localhost:3000"
    
    NEXT_PUBLIC_APP_NAME="MyMedica-Queue"
    
    # API Key dari Resend.com
    RESEND_API_KEY= "resend_api_key"
    EMAIL_FROM= "onboarding@resend.dev"
    
    # Email tujuan untuk notifikasi
    NEXT_PUBLIC_EMAIL_TO= "Email to"
    NEXT_PUBLIC_DASHBOARD_URL= "http://localhost:3000/dashboard"
    ```

4.  **Migrasi Database:**
    Jalankan migrasi Prisma untuk membuat skema database:

    ```bash
    npx prisma migrate dev
    ```

5.  **Generate Klien Prisma:**

    ```bash
    npx prisma generate
    ```

6.  **(Opsional) Jalankan Seed Data:**
    Jika Anda memiliki *script seed* untuk mengisi data awal (misalnya, data admin atau tenant default), jalankan:

    ```bash
    npx prisma db seed
    ```

7.  **Jalankan Server Pengembangan:**

    ```bash
    npm run dev
    ```

    Aplikasi sekarang akan berjalan di [http://localhost:3000](http://localhost:3000).

## Penjelasan Skema Database

Skema database dirancang menggunakan Prisma dan berfokus pada *multi-tenancy*.

* `User`: Menyimpan data admin tenant, digunakan untuk autentikasi.
* `Tenant`: Mewakili setiap pusat layanan kesehatan. Setiap `User` terhubung ke satu `Tenant`.
* `Stage`: Mendefinisikan tahapan-tahapan dalam alur antrian (misal: "Registrasi", "Pemeriksaan Perawat", "Dokter"). Setiap `Stage` **wajib** memiliki `tenant_id` untuk isolasi data.
* `Queue`: Mewakili setiap pasien dalam antrian. Tabel ini memiliki relasi ke `Tenant` dan `Stage` saat ini, memastikan data antrian terisolasi per tenant.

Pendekatan *row-based isolation* diterapkan secara ketat di seluruh *service* dan *endpoint* API, di mana setiap kueri database (melalui Prisma) selalu menyertakan klausa `where` untuk `tenant_id` yang diautentikasi.

## Cara Menguji Sistem

Karena *unit test* tidak diimplementasikan, pengujian dapat dilakukan secara manual melalui UI:

1.  Buka [http://localhost:3000/sign-in](http://localhost:3000/sign-in) untuk *login* sebagai admin tenant.
2.  Dari **Dasbor**, navigasikan ke menu **Tenant** untuk melihat atau membuat data *tenant*.
3.  Navigasikan ke menu **Stage** untuk membuat tahapan antrian (misal: "Registrasi", "Ruang Tunggu", "Apotek").
4.  Navigasikan ke menu **Queue** untuk menambahkan pasien baru ke antrian.
5.  Gunakan tombol aksi di dasbor untuk "Memproses" pasien (memindahkan ke tahap selanjutnya) atau "Menyelesaikan" antrian.
6.  Saat pasien baru ditambahkan, periksa email yang diatur di `NEXT_PUBLIC_EMAIL_TO` untuk notifikasi.

