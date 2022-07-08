import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

import { navigate, routes } from '@redwoodjs/router';

const DashboardPage = () => {
  return (
    <>
      <Card sx={{ display: 'flex' }}>
        <CardMedia
          component='img'
          sx={{ width: 151 }}
          image='https://p4.wallpaperbetter.com/wallpaper/642/336/838/mountains-firewatch-sunset-hd-wallpaper-preview.jpg'
          alt='Mountains'
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component='div' variant='h5'>
              Customerly
            </Typography>
            <Typography variant='subtitle1' component='div'>
              Ready to help you on the adventure that comes with the relations
              that you create with your clients!
            </Typography>
            <Button onClick={e => navigate(routes.myClients())}>
              <Typography fontSize={20} component='span'>
                Lets get starter!
              </Typography>
            </Button>
          </CardContent>
          <Box
            sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}
          ></Box>
        </Box>
      </Card>
    </>
  );
};

export default DashboardPage;
