const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

interface TMDBVideo {
  type: string;
  site: string;
  key: string;
}

export const getMovieTrailer = async (movieId: number): Promise<string | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_KEY}&language=en-US`
    );
    const data = await response.json();
    const trailer = data.results?.find(
      (v: TMDBVideo) => v.type === "Trailer" && v.site === "YouTube"
    );
    return trailer ? trailer.key : null;
  } catch (error) {
    console.error("TMDB Trailer Hatası:", error);
    return null;
  }
};

export const getMoviePoster = async (movieName: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(movieName)}&language=tr-TR`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const movie = data.results[0];
      return {
        id: movie.id,
        poster_path: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "https://via.placeholder.com/500x750?text=Afis+Bulunamadi",
        overview: movie.overview || "Bu film için henüz bir özet eklenmemiş.",
        vote_average: movie.vote_average || 0,
        release_date: movie.release_date || ""
      };
    }
    return null;
  } catch (error) {
    console.error("TMDB Arama Hatası:", error);
    return null;
  }
};

export const getMovieWatchProviders = async (movieId: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/watch/providers?api_key=${TMDB_KEY}`
    );
    const data = await response.json();

    return data.results?.TR || null;
  } catch (error) {
    console.error("Platform bilgisi çekilemedi:", error);
    return null;
  }
};