import React, { useEffect, useState } from 'react';

// Msal imports
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';
import { loginRequest } from '../authConfig';

// API imports
import { apiConfig } from '../apiConfig';

// Sample app imports
import { ProfileData } from '../ui-components/ProfileData';
import { Loading } from '../ui-components/Loading';
import { ErrorComponent } from '../ui-components/ErrorComponent';

// Material-ui imports
import Paper from '@material-ui/core/Paper';
import { useAcquireToken, useGraph } from 'react-msal-wrapper';
import { Button } from '@material-ui/core';

const ProfileContent = () => {
  const { graphData } = useGraph();
  const { accessToken } = useAcquireToken({ scopes: apiConfig.scopes });
  const [accessGranted, setAccessGranted] = useState(false);
  const [data, setData] = useState(false);
  const [errorApi, setErrorApi] = useState(null);

  useEffect(() => {
    const getDataFromApi = async () => {
      try {
        const response = await fetch(apiConfig.apiURL, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        });

        const body = await response.json();

        if (body?.data?.claims) {
          setAccessGranted(true);
          setErrorApi(null);
          setData(body?.data?.claims);
        }
      } catch (error) {
        setErrorApi(error);
      }
    };

    getDataFromApi();
  }, [accessToken]);

  return (
    <Paper>
      {graphData && <ProfileData graphData={graphData} />}
      <div style={{ textAlign: 'center' }}>
        <h5>{apiConfig.apiURL}</h5>
        <Button variant='outlined' color='primary'>
          {accessGranted ? 'Access Is Granted' : 'Access Not Granted'}
        </Button>
        <h5>{errorApi && errorApi?.message}</h5>
        <h5>{data && JSON.stringify(data)}</h5>
      </div>
    </Paper>
  );
};

export function Profile() {
  const authRequest = {
    ...loginRequest
  };

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Popup}
      authenticationRequest={authRequest}
      errorComponent={ErrorComponent}
      loadingComponent={Loading}
    >
      <ProfileContent />
    </MsalAuthenticationTemplate>
  );
}
