import { useCallback, useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';

function useAcquireToken({ scopes = ['User.Read'] }) {
  const { instance, inProgress, accounts } = useMsal();
  const [accessToken, setAccessToken] = useState(null);

  const getData = useCallback(async () => {
    if (inProgress === 'none' && accounts.length > 0) {
      // Retrieve an access token
      try {
        const response = await instance.acquireTokenSilent({
          account: accounts[0],
          scopes
        });

        if (response.accessToken) {
          // console.info({ response });
          setAccessToken(response.accessToken);
          return response.accessToken;
        }

        // console.info({ response });
        setAccessToken(null);
        return null;
      } catch (error) {
        // console.log(error);
        if (accessToken) setAccessToken(null);
        return null;
      }
    }
  }, [accessToken, accounts, inProgress, instance, scopes]);

  useEffect(() => {
    getData();
  }, [getData]);

  // console.warn({ accessToken });
  return { accessToken, getAccessToken: getData };
}

export default useAcquireToken;
