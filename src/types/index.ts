export interface Movie {
  id: number;
  name: string;
  poster: string;
  overview: string;
  vote: number;
  date?: string;
  watch_link?: string;
}

export interface Mood {
  id: string;
  label: string;
  emoji: string;
  searchQuery: string;
}

export interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
  link?: string;
}

export interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

export interface WatchProvidersResponse {
  flatrate?: WatchProvider[];
}