# Movie Festival System

## 📌 Project Overview
Movie Festival System adalah aplikasi berbasis web yang memungkinkan pengguna untuk mengelola festival film, termasuk pendaftaran film, jadwal tayang, dan pemesanan tiket.

## 🚀 Tech Stack
### Frontend
- **Vue 3** - Framework JavaScript modern
- **Vue Router** - Manajemen routing
- **Pinia** - State management
- **Axios** - HTTP client untuk komunikasi API
- **Chart.js** - Visualisasi data
- **Vue Test Utils** - Unit testing

### Backend
- **Express.js** - Server backend
- **JSON Server** - API mockup
- **JWT (jsonwebtoken)** - Autentikasi token
- **Bcrypt.js** - Hashing password
- **CORS** - Middleware untuk CORS handling

### Testing
- **Jest & Vue Test Utils** - Unit testing
- **Cypress** - End-to-End testing
- **Vitest** - Alternative testing framework

## 📂 Project Structure
```
movie-festival-system/
├── src/      # Kode sumber frontend (Vue 3)
│   ├── assets/     # Gambar, CSS, dll.
│   ├── components/ # Komponen Vue
│   ├── pages/      # Halaman aplikasi
│   ├── router/     # Konfigurasi Vue Router
│   ├── services/   # Manajemen services
│   ├── store/      
│   ├── tests/           # Unit test
│   ├── public/          # File statis
│   ├── package.json     # Konfigurasi proyek frontend
│   ├── vite.config.js   # Konfigurasi Vite
│
├── backend/       # Kode sumber backend (Express.js)
│   ├── db.json/    # Data Collection (Movie & User)
│
├── README.md      # Dokumentasi proyek
```

## 🎯 Installation & Setup
### 1️⃣ Clone Repository
```sh
git clone https://github.com/evans2101/Movie-Festival.git
cd Movie-Festival
```

### 2️⃣ Install Dependencies
**Frontend**
```sh
npm install
```

### 3️⃣ Running the Project
**Jalankan Frontend**
```sh
npm run serve
```
Akses aplikasi di `http://localhost:8080`

**Jalankan Backend**
```sh
npx json-server --watch backend/db.json --port 3000
```
API berjalan di `http://localhost:3000`

## 🧪 Testing
**Unit Testing (Frontend & Backend)**
```sh
npm run test
```

## 🚀 Deployment
### Build Frontend
```sh
npm run build
```
Folder hasil build akan berada di `/dist`.

## 📜 License
MIT License.

---
🎉 **Selamat menggunakan Movie Festival System!**