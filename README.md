# 🎬 CineMatch - AI Movie Assistant

CineMatch, Google Gemini AI teknolojisini kullanarak kullanıcıların moduna ve tercihlerine göre kişiselleştirilmiş film önerileri sunan modern bir web uygulamasıdır. Sadece bir öneri motoru değil, aynı zamanda kişisel film kütüphanenizi yönetebileceğiniz akıllı bir asistanıdır.

![CineMatch Preview](https://via.placeholder.com/1200x600?text=CineMatch+AI+Preview)

## ✨ Öne Çıkan Özellikler

* **🤖 AI Destekli Öneriler:** Google Gemini API ile doğal dildeki isteklerinize (örn: "Yağmurlu bir günde izlenecek gizemli filmler") anlamlı cevaplar.
* **📚 Gelişmiş Kitaplık Sistemi:** IndexedDB altyapısı ile tarayıcı tabanlı kalıcı veri saklama.
    * **İzleyeceklerim:** Sonra izlemek için kaydedilen filmler.
    * **İzlediklerim:** Bitirdiğiniz filmlerin dijital arşivi.
* **🔍 Akıllı Filtreleme:** Arama sonuçlarında "İzlediklerimi Gizle" seçeneği ile sadece yeni keşiflere odaklanma.
* **📽️ Zengin Film Detayları:** TMDB API entegrasyonu ile yüksek kaliteli posterler, puanlar, özetler ve izleme platformları (Netflix, Disney+, vb.).
* **🌓 Modern UI/UX:** Tailwind CSS ile oluşturulmuş, tamamen responsive ve Dark Mode uyumlu premium tasarım.

## 🛠️ Teknik Stack

- **Framework:** React 18 + Vite
- **Dil:** TypeScript
- **AI:** Google Gemini 1.5 Flash
- **Veritabanı:** IndexedDB (Browser Storage)
- **Styling:** Tailwind CSS + Headless UI
- **Icons:** HeroIcons
- **Deployment:** Vercel

## 🚀 Kurulum

1. Projeyi klonlayın:
   ```bash
   git clone [https://github.com/kullaniciadi/cinematch.git](https://github.com/kullaniciadi/cinematch.git)