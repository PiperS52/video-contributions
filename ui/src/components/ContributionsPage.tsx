import { useState, useEffect, useCallback } from 'react';
import { useGetContributionsQuery } from '../services/contributions';
import Box from '@mui/material/Box';
import styles from './styles.module.scss';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import { MenuItem, Typography } from '@mui/material';
import { useContributionFilters } from '../hooks/use-contribution-filters';

export const ContributionsPage: React.FC = () => {
  const [skipParam, setSkipParam] = useState<number>(0);
  const limit = 14;
  const { title, owner, status, setFilters } = useContributionFilters();

  const { contributions, totalCount, isLoading, isError } =
    useGetContributionsQuery(
      { title, owner, status, skip: skipParam, limit },
      {
        selectFromResult: ({ data, isLoading, isError }) => ({
          contributions: data?.contributions ?? [],
          totalCount: data?.total ?? 0,
          isLoading,
          isError,
        }),
        refetchOnMountOrArgChange: true,
      }
    );

  const handleClearFilters = useCallback(() => {
    setFilters({ title: null, owner: null, status: null });
  }, [setFilters]);

  useEffect(() => {
    if (title) {
      setSkipParam(0);
    }
    if (owner) {
      setSkipParam(0);
    }
    if (status) {
      setSkipParam(0);
    }
  }, [title, owner, status]);

  console.log('contributions', contributions);
  const statusOptions = ['', 'Complete', 'Scheduled', 'Active'];

  return (
    <>
      <div>
        <h1>Video Contributions</h1>
        <div className="search-bar">
          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              className="title-search-input"
              id="title-search-input"
              label="Search by title"
              variant="outlined"
              value={title}
              fullWidth
              type="string"
              onChange={(e) =>
                setFilters({ title: String(e.target.value), owner, status })
              }
            />
            <TextField
              className="owner-search-input"
              id="owner-search-input"
              label="Search by owner"
              variant="outlined"
              value={owner}
              fullWidth
              type="string"
              onChange={(e) =>
                setFilters({ owner: String(e.target.value), title, status })
              }
            />
            <TextField
              id="status-select-input"
              select
              label="Status"
              value={status}
              defaultValue={''}
              onChange={(e) =>
                setFilters({ status: String(e.target.value), title, owner })
              }
            >
              {statusOptions.map((option, index) => (
                <MenuItem key={`${option}-${index}`} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Button
            variant="contained"
            size="medium"
            onClick={handleClearFilters}
          >
            Clear filters
          </Button>
        </div>
        {isLoading && (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        )}
        {isError && <p>Error loading contributions</p>}
        {!contributions.length ? (
          <p>No contributions found</p>
        ) : (
          <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container spacing={2}>
              {contributions.map((contribution, index) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4 }} // 3 per row on md and up, 2 per row on sm, 1 per row on xs
                  key={`${contribution.id}-${index}`}
                >
                  <Card className={styles.card} variant="outlined">
                    <CardContent>
                      <Typography variant="h6" color="text.primary">
                        {contribution.title}
                      </Typography>
                      <p>{contribution.description}</p>
                      <p>
                        Start Time:{' '}
                        {new Date(contribution.startTime).toLocaleString()}
                      </p>
                      <p>
                        End Time:{' '}
                        {new Date(contribution.endTime).toLocaleString()}
                      </p>
                      <p>Owner: {contribution.owner}</p>
                      <p>
                        Status:{' '}
                        {new Date(contribution.endTime) < new Date()
                          ? 'Complete'
                          : new Date(contribution.startTime) > new Date()
                            ? 'Scheduled'
                            : 'Active'}
                      </p>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              {contributions.length === 2 && (
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card
                    className={styles.card}
                    variant="outlined"
                    sx={{
                      border: 'none',
                      boxShadow: 'none',
                      background: 'transparent',
                    }}
                  />{' '}
                </Grid>
              )}
            </Grid>
          </Box>
        )}
        <Typography>
          {!contributions.length
            ? ''
            : `Page ${skipParam / limit + 1} of ${Math.ceil(totalCount / limit)}`}
        </Typography>
        <div
          className="pagination"
          style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}
        >
          <Pagination
            count={Math.ceil(totalCount / limit)}
            page={skipParam / limit + 1}
            onChange={(event, value) => {
              setSkipParam((value - 1) * limit);
            }}
          />
        </div>
      </div>
    </>
  );
};
