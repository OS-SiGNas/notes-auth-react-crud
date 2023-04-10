import { Box, Paper, Typography } from '@mui/material';
interface Props {
  error: Error;
}

export const ErrorComponent = ({ error }: Props): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '600px',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: '40px',
          background: '#eeeeee',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3">🕵️🪲 </Typography>
        <Typography variant="h4">{error.name}❗</Typography>
        <Typography variant="subtitle2">{error.message}</Typography>
      </Paper>
    </Box>
  );
};
