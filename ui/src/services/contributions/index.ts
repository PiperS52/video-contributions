import { ContributionsResponse } from './types';
import { api } from '../api';

export const contributionsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getContributions: build.query<
      ContributionsResponse,
      { title: string; owner: string; skip: number; limit: number }
    >({
      query: ({ title, owner, skip, limit }) => ({
        url: `/contributions`,
        method: 'GET',
        params: { title, owner, skip, limit },
      }),
      providesTags: ['Contributions'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetContributionsQuery, useLazyGetContributionsQuery } =
  contributionsApi;
