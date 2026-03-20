export interface Movie {
  id: number;
  name: string;
  poster: string;
  overview: string;
  vote: number;
  date?: string;
}

export interface Mood {
  id: string;
  label: string;
  emoji: string;
  searchQuery: string;
}