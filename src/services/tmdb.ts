const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getMoviePoster = async (movieName: string) => {
  try {
    // Film ismine göre arama yapıyoruz
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(movieName)}&language=tr-TR`
    );
    
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const movie = data.results[0]; // En alakalı ilk sonucu al
      return {
        poster: movie.poster_path 
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
          : "https://via.placeholder.com/500x750?text=Afis+Bulunamadi",
        overview: movie.overview || "Bu film için henüz bir özet eklenmemiş.",
        vote: movie.vote_average || 0
      };
    }

    // Film bulunamazsa boş dön
    return {
      poster: "https://via.placeholder.com/500x750?text=Film+Bulunamadi",
      overview: "Üzgünüz, bu film hakkında detaylı bilgiye ulaşılamadı.",
      vote: 0
    };
  } catch (error) {
    console.error("TMDB Servis Hatası:", error);
    return {
      poster: "https://via.placeholder.com/500x750?text=Hata+Olustu",
      overview: "Veri çekilirken bir hata oluştu.",
      vote: 0
    };
  }
};