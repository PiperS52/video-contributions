import { useState } from 'react';
import { useGetContributionsQuery } from '../services/contributions';
import Box from '@mui/material/Box';
import styles from './styles.module.scss';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';

export const ContributionsPage: React.FC = () => {
  const [skipParam, setSkip] = useState<number>(0);
  const limit = 14;
  const [title, setTitle] = useState<string>('');

  const { contributions, isLoading, isError } = useGetContributionsQuery(
    { title, skip: skipParam, limit },
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        contributions: data?.contributions ?? [],
        isLoading,
        isError,
      }),
      // skip: !title,
      refetchOnMountOrArgChange: true,
    }
  );

  console.log('contributions', contributions);

  return (
    <>
      <div>
        <h1>Video Contributions</h1>
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
            </Grid>
          </Box>
        )}
      </div>
    </>
  );
};
