import {AxiosError} from 'axios';
import {useQuery, UseQueryOptions} from 'react-query';
import {api} from '../axios.instance';
import {animeKeyFactory} from './key-factory';
import {Anime} from './types';

export const getAnimeById = async (animeId: number) => {
  const response = await api.get(`/anime/${animeId}`);
  return response.data.data; // Return only the nested data property
};

export const useGetAnimeById = (
  animeId: number,
  options?: UseQueryOptions<
    Anime,
    AxiosError,
    Anime,
    readonly (string | number)[]
  >,
) => {
  return useQuery({
    queryFn: () => getAnimeById(animeId),
    queryKey: [...animeKeyFactory.animeById(animeId)],
    ...options,
  });
};
