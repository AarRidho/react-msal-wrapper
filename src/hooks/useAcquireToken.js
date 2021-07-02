import { useCallback, useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';

function useAcquireToken({
  scopes = ['User.Read'],
  account = null,
  requestRefreshToken = false
}) {
  const { instance, inProgress, accounts } = useMsal();
  const [accessToken, setAccessToken] = useState(null);

  const getData = useCallback(async () => {
    if (inProgress === 'none' && (account || accounts.length > 0)) {
      // Retrieve an access token
      const request = {
        account: account ?? accounts[0],
        scopes
      };

      try {
        const response = await instance.acquireTokenSilent(request);

        checkTokenResponse(response);
        return;
      } catch (error) {
        console.log(error?.message, error?.errorCode);
        if (
          requestRefreshToken &&
          (error.errorCode === 'consent_required' ||
            error.errorCode === 'interaction_required' ||
            error.errorCode === 'login_required' ||
            error.errorCode === 'monitor_window_timeout')
        ) {
          try {
            const response = await instance.acquireTokenRedirect(request);
            return checkTokenResponse(response);
          } catch {
            if (accessToken) setAccessToken(null);
            return null;
          }
        }

        if (accessToken) setAccessToken(null);
        return null;
      }
    }
  }, [
    accessToken,
    account,
    accounts,
    inProgress,
    instance,
    requestRefreshToken,
    scopes
  ]);

  const checkTokenResponse = (response) => {
    console.info({ response });

    if (response.accessToken) {
      setAccessToken(response.accessToken);
      return response.accessToken;
    }

    setAccessToken(null);
    return null;
  };

  useEffect(() => {
    getData();
  }, [getData]);

  // console.warn({ accessToken });
  return { accessToken, getAccessToken: getData };
}

export default useAcquireToken;
