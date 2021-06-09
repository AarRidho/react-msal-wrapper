import React, { useEffect } from 'react';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useIsAuthenticated
} from '@azure/msal-react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink, useHistory } from 'react-router-dom';

export function Home() {
  const router = useHistory();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) router.push('/profile');
  }, [router, isAuthenticated]);

  return (
    <>
      <AuthenticatedTemplate>
        <ButtonGroup orientation='vertical'>
          <Button
            component={RouterLink}
            to='/profile'
            variant='contained'
            color='primary'
          >
            Request Profile Information
          </Button>
          <Button
            component={RouterLink}
            to='/profileWithMsal'
            variant='contained'
            color='primary'
          >
            Request Profile Information (using withMsal HOC)
          </Button>
          <Button
            component={RouterLink}
            to='/profileRawContext'
            variant='contained'
            color='primary'
          >
            Request Profile Information (using raw context
          </Button>
        </ButtonGroup>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <Typography variant='h6'>
          <center>Please sign-in to see your profile information.</center>
        </Typography>
      </UnauthenticatedTemplate>
    </>
  );
}
