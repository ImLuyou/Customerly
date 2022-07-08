import { Grid } from '@mui/material';

import { useAuth } from '@redwoodjs/auth';

import MyClientsByOwnerCell from 'src/components/MyClientsByOwnerCell';

const MyClientsPage = () => {
  const { currentUser } = useAuth();

  return (
    <Grid container spacing={2}>
      <MyClientsByOwnerCell owner={currentUser.uid} />
    </Grid>
  );
};

export default MyClientsPage;
