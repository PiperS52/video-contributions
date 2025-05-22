import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

export type ContributionFilters = {
  title?: string;
  owner?: string;
  status?: string;
};

export function useContributionFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const title = searchParams.get('title') ?? '';
  const owner = searchParams.get('owner') ?? '';
  const status = searchParams.get('status') ?? '';

  const setFilters = useCallback(
    (filters: ContributionFilters) => {
      setSearchParams((params) => {
        Object.entries(filters).forEach(([key, value]) => {
          if (value === null || value === undefined || value === '') {
            params.delete(key);
          } else if (value) {
            params.set(key, value);
          }
        });
        return params;
      });
    },
    [setSearchParams]
  );

  return useMemo(
    () => ({
      title,
      owner,
      status,
      setFilters,
    }),
    [title, owner, status, setFilters]
  );
}
