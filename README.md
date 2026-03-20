# 🎬 CineMatch AI v2.0

CineMatch AI, geleneksel film arama motorlarının ötesine geçerek, o anki ruh halinizi ve spesifik betimlemelerinizi anlayan **AI tabanlı** bir film keşif platformudur. Google Gemini AI'ın zekasını, TMDB'nin devasa veri kütüphanesiyle birleştirir.

**🚀 Canlı Demo:** [cine-match-ai-taupe.vercel.app](https://cine-match-ai-taupe.vercel.app/)

---

## ✨ Öne Çıkan Yeni Özellikler

* 🧠 **Sonsuz AI Önerisi (Infinite Suggestion):** "Daha Fazla Öner" butonu ile Gemini'den her seferinde taze isimler çekerek, tekrara düşmeyen sonsuz bir film akışı sağlar.
* 💾 **Kişisel Koleksiyon (Watchlist):** **IndexedDB** entegrasyonu sayesinde beğendiğiniz filmleri tarayıcı hafızasına kaydeder, sayfa yenilense bile verilerinizi korur.
* 🎭 **Mood Selector:** "Neşeli", "Düşündürücü" veya "Gerilim" gibi ruh hallerine göre optimize edilmiş tek tıkla arama motoru.
* 🌗 **Dinamik Dark/Light Mode:** Tailwind CSS v4 tabanlı, sistem tercihlerine duyarlı veya manuel kontrol edilebilir modern arayüz.
* ⚡ **Hız ve Optimizasyon:** Görüntü lazy-loading ve skeleton screen (yükleme efektleri) ile düşük internet hızlarında bile akıcı deneyim.

## 🛠️ Teknik Stack

* **Core:** React 18, TypeScript, Vite
* **Styling:** Tailwind CSS v4 (Midnight-Indigo Design System)
* **AI Engine:** Google Gemini SDK (Gemini-3-Flash-Preview)
* **Database:** IndexedDB (Local persistence for watchlist)
* **Icons:** Heroicons (Outline & Solid)
* **Deployment:** Vercel + Vercel Analytics

## 📂 Proje Yapısı

```text
src/
├── components/       # UI Bileşenleri (Navbar, SearchBar, MoodSelector, Footer vb.)
├── services/         # API & DB Mantığı (Gemini, TMDB ve IndexedDB servisleri)
├── utils/            # Yardımcılar (Prompt Generator, ID Creator vb.)
├── types/            # TypeScript Interface ve Tip tanımlamaları
├── assets/           # Statik dosyalar
└── App.tsx           # Ana uygulama mimarisi ve State yönetimi