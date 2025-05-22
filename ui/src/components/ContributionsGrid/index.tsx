import Box from '@mui/material/Box';
import styles from './styles.module.scss';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import { CardResult } from '../CardResult';

import { Contribution } from '../../services/contributions/types';

export const ContributionsGrid: React.FC<{
  contributions: Contribution[];
}> = ({ contributions }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={2}>
          {contributions.map((contribution, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }} // 3 per row on md and up, 2 per row on sm, 1 per row on xs
              key={`${contribution.id}-${index}`}
            >
              <CardResult
                title={contribution.title}
                description={contribution.description}
                startTime={contribution.startTime}
                endTime={contribution.endTime}
                owner={contribution.owner}
              />
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
    </>
  );
};
