export const animeKeyFactory = {
  animes: ['all-animes'],
  animeById: (id: number) => [...animeKeyFactory.animes, id],
} as const;
