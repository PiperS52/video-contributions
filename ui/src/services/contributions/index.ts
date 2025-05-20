import { ContributionsResponse } from './types';
import { api } from '../api';

export const contributionsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getContributions: build.query<
      ContributionsResponse,
      {
        title: string;
        owner: string;
        status: string;
        skip: number;
        limit: number;
      }
    >({
      query: ({ title, owner, status, skip, limit }) => ({
        url: `/contributions`,
        method: 'GET',
        params: { title, owner, status, skip, limit },
      }),
      providesTags: ['Contributions'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetContributionsQuery, useLazyGetContributionsQuery } =
  contributionsApi;
