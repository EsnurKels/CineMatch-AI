# CineMatch AI

Yapay zeka desteği ile kullanıcıların doğal dil tanımlamalarına göre kişiselleştirilmiş film önerileri sunan modern bir web uygulamasıdır.

**Canlı Demo:** [cine-match-ai-taupe.vercel.app](https://cine-match-ai-taupe.vercel.app/)

## Proje Hakkında

CineMatch AI, geleneksel kategori bazlı filtreleme yöntemlerinin ötesine geçerek, kullanıcının o anki ruh halini veya spesifik betimlemelerini analiz eder. Google Gemini AI altyapısını kullanarak kullanıcı girdilerini anlamlandırır ve TMDB veri tabanı üzerinden en doğru eşleşmeleri görselleştirir.

## Teknik Özellikler

* **Doğal Dil İşleme:** Google Gemini 1.5 Flash modeli entegrasyonu ile karmaşık kullanıcı isteklerini film isimlerine dönüştürür.
* **Dinamik Ver Veri Entegrasyonu:** TMDB API aracılığıyla gerçek zamanlı film afişleri, özet bilgiler ve puanlamalar sunar.
* **Modüler Mimari:** React bileşen tabanlı yapı (Component-based architecture) ile sürdürülebilir ve ölçeklenebilir kod yapısı.
* **Gelişmiş CSS Animasyonları:** 3D Flip Card efektleri ve modern kullanıcı etkileşimleri.
* **Dinamik Tema Yönetimi:** Sistem tercihlerine duyarlı veya manuel olarak değiştirilebilen Dark/Light mode desteği.
* **Hızlı Derleme:** Vite yapılandırması ile optimize edilmiş çalışma zamanı performansı.

## Kullanılan Teknolojiler

* **Frontend:** React 18, TypeScript
* **Stil:** Tailwind CSS v4 (Midnight-Indigo Tasarım Sistemi)
* **Yapay Zeka:** Google Gemini Generative AI SDK
* **API:** The Movie Database (TMDB) API
* **İkon Seti:** Heroicons (Outline)
* **Dağıtım:** Vercel

## Klasör Yapısı

```text
src/
├── components/       # UI Bileşenleri (Navbar, SearchBar, MovieCard vb.)
├── services/         # API Servisleri (Gemini ve TMDB yapılandırmaları)
├── utils/            # Yardımcı Fonksiyonlar (Prompt Generator)
├── types/            # TypeScript Interface ve Tip tanımlamaları
└── App.tsx           # Ana uygulama mantığı ve state yönetimi