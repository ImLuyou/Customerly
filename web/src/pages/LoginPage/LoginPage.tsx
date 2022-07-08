import { useEffect } from 'react';

import { Google } from '@mui/icons-material';
import { Box, Button, Card, Divider, Typography } from '@mui/material';

import { useAuth } from '@redwoodjs/auth';
import { navigate, routes } from '@redwoodjs/router';
import { MetaTags } from '@redwoodjs/web';
import { toast, Toaster } from '@redwoodjs/web/toast';

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.dashboard());
    }
  }, [isAuthenticated]);

  const loginWithGoogle = async () => {
    const response = await logIn();
    if (response.message) {
      toast(response.message);
    } else if (response.error) {
      toast.error(response.error);
    } else {
      toast.success('Welcome back!');
    }
  };

  return (
    <>
      <MetaTags title='Login' />

      <Box className='rw-main'>
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <Box className='rw-scaffold rw-login-container'>
          <Card className='rw-segment'>
            <Box
              display='flex'
              style={{
                justifyContent: 'center',
              }}
            >
              <img
                alt='Customerly'
                src='Customerly_Transparent.png'
                style={{
                  width: '60%',
                  height: 'auto',
                }}
              />
            </Box>

            <Box
              display='flex'
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                sx={{ margin: '2rem', marginTop: '0rem' }}
                variant='contained'
                onClick={() => loginWithGoogle()}
              >
                <Google /> &nbsp; Login with Google
              </Button>
            </Box>
            <Divider />
            <Box sx={{ textAlign: 'center' }}>
              <Typography color='gray' variant='caption'>
                Created by{' '}
                <a
                  target='_blank'
                  href='https://www.linkedin.com/in/adrian-legaspi/'
                  rel='noreferrer'
                >
                  Adrian Legaspi
                </a>{' '}
                {new Date().getFullYear()}
              </Typography>
            </Box>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
