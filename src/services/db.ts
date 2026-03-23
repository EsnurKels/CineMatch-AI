import type { Movie } from "../types/index"

const DB_NAME = 'CineMatchDB';
const DB_VERSION = 2; // Versiyonu 2 yaptık çünkü yeni store ekliyoruz
const STORES = {
  WATCHLIST: 'watchlist',
  WATCHED: 'watched'
};

export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORES.WATCHLIST)) {
        db.createObjectStore(STORES.WATCHLIST, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORES.WATCHED)) {
        db.createObjectStore(STORES.WATCHED, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const addToDB = async (movie: Movie, storeName: 'watchlist' | 'watched') => {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  store.put(movie);
  return new Promise((resolve) => {
    tx.oncomplete = () => resolve(true);
  });
};

export const removeFromDB = async (id: number, storeName: 'watchlist' | 'watched') => {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  store.delete(id);
  return new Promise((resolve) => {
    tx.oncomplete = () => resolve(true);
  });
};

export const getAllFromDB = async (storeName: 'watchlist' | 'watched'): Promise<Movie[]> => {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readonly');
  const store = tx.objectStore(storeName);
  return new Promise((resolve) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
  });
};