import { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';

function useAcquireToken({ scopes = ['User.Read'] }) {
  const { instance, inProgress, accounts } = useMsal();
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const getData = async () => {
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
            return;
          }
          setAccessToken(null);
        } catch (error) {
          if (accessToken) setAccessToken(null);
        }
      }
    };

    getData();
  }, [accessToken, accounts, inProgress, instance, scopes]);

  return { accessToken };
}

export default useAcquireToken;
