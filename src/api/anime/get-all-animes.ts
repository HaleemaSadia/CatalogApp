import {AxiosError} from 'axios';
import {useQuery, UseQueryOptions} from 'react-query';
import {api} from '../axios.instance';
import {animeKeyFactory} from './key-factory';
import {AnimeListResponse} from './types';

export const getAllAnimes = async (page: number, status: string) => {
  return (
    await api.get<AnimeListResponse>('/anime', {
      params: {
        page,
        status,
      },
    })
  ).data;
};

export const useGetAllAnimes = (
  page: number,
  status: string,
  options?: UseQueryOptions<AnimeListResponse, AxiosError>,
) => {
  return useQuery({
    queryFn: () => getAllAnimes(page, status),
    queryKey: [...animeKeyFactory.animes, page, status],
    ...options,
  });
};
