import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import styles from './styles.module.scss';

export const CardResult: React.FC<{
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  owner: string;
}> = ({ title, description, startTime, endTime, owner }) => {
  return (
    <>
      <Card className={styles.card} variant="outlined">
        <CardContent>
          <Typography variant="h6" color="text.primary">
            {title}
          </Typography>
          <p>{description}</p>
          <p>Start Time: {new Date(startTime).toLocaleString()}</p>
          <p>End Time: {new Date(endTime).toLocaleString()}</p>
          <p>Owner: {owner}</p>
          <p>
            Status:{' '}
            {new Date(endTime) < new Date()
              ? 'Complete'
              : new Date(startTime) > new Date()
                ? 'Scheduled'
                : 'Active'}
          </p>
        </CardContent>
      </Card>
    </>
  );
};
