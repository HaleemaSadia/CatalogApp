import {create} from 'zustand';
import {Anime} from '../api/anime';

export interface AnimeStore {
  favoriteAnimes: Array<Anime>;
  actions: {
    addToFavorite: (val: Anime) => void;
    removeFromFavorite: (id: number) => void;
  };
}

export const useAnimeStore = create<AnimeStore>((set, get) => ({
  favoriteAnimes: [],
  actions: {
    addToFavorite: anime =>
      set({
        favoriteAnimes: [...get().favoriteAnimes, anime],
      }),
    removeFromFavorite: id =>
      set({
        favoriteAnimes: [
          ...get().favoriteAnimes.filter(
            favoriteAnime => favoriteAnime.mal_id !== id,
          ),
        ],
      }),
  },
}));

export const useAnimeActions = () => useAnimeStore(state => state.actions);
export const useFavoriteAnimes = () =>
  useAnimeStore(state => state.favoriteAnimes);
