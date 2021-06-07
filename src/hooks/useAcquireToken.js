import { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';

function useAcquireToken({ scopes = ['User.Read'] }) {
  const { instance, inProgress, accounts } = useMsal();
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    if (inProgress === 'none' && accounts.length > 0) {
      // Retrieve an access token
      instance
        .acquireTokenSilent({
          account: accounts[0],
          scopes
        })
        .then((response) => {
          if (response.accessToken) {
            // console.info({ response });
            setAccessToken(response.accessToken);
            return;
          }
          setAccessToken(null);
        });
    }
  }, [accessToken, accounts, inProgress, instance, scopes]);

  return { accessToken: accessToken };
}

export default useAcquireToken;
