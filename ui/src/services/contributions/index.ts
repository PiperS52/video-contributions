import { ContributionsResponse } from './types';
import { api } from '../api';

export const contributionsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getContributions: build.query<
      ContributionsResponse,
      { title: string; skip: number; limit: number }
    >({
      query: ({ title, skip, limit }) => ({
        url: `/contributions`,
        method: 'GET',
        params: { title, skip, limit },
      }),
      providesTags: ['Contributions'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetContributionsQuery, useLazyGetContributionsQuery } =
  contributionsApi;
