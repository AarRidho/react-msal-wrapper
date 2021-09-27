import { useCallback, useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import {
  InteractionRequiredAuthError,
  InteractionStatus
} from '@azure/msal-browser';

function useAcquireToken({
  scopes = ['User.Read'],
  account = null,
  requestRefreshToken = false,
  prompt = 'select_account'
}) {
  const { instance, accounts, inProgress } = useMsal();
  const [accessToken, setAccessToken] = useState(null);

  const getData = useCallback(
    async (aborted) => {
      if (
        !accessToken &&
        inProgress === InteractionStatus.None &&
        (account || accounts.length > 0)
      ) {
        // Retrieve an access token
        const request = {
          account: account ?? accounts[0],
          scopes,
          prompt
        };

        try {
          const response = await instance.acquireTokenSilent(request);
          return checkTokenResponse(response, aborted);
        } catch (error) {
          // console.log(error?.message, error?.errorCode);
          if (
            requestRefreshToken &&
            (error.errorCode === 'consent_required' ||
              error.errorCode === 'interaction_required' ||
              error.errorCode === 'login_required' ||
              error.errorCode === 'monitor_window_timeout' ||
              error instanceof InteractionRequiredAuthError)
          ) {
            try {
              const response = await instance.acquireTokenPopup(request);
              return checkTokenResponse(response, aborted);
              // eslint-disable-next-line no-empty
            } catch (errorTokenPopup) {
              console.log(error);
            }
          }

          if (accessToken) setAccessToken(null);
          return null;
        }
      }
    },
    [
      accessToken,
      account,
      accounts,
      inProgress,
      instance,
      prompt,
      requestRefreshToken,
      scopes
    ]
  );

  const checkTokenResponse = (response, aborted) => {
    if (aborted) return;

    if (response.accessToken) {
      setAccessToken(response.accessToken);
      return response.accessToken;
    }

    setAccessToken(null);
    return null;
  };

  useEffect(() => {
    let aborted = false;
    getData(aborted);

    return () => {
      aborted = true;
    };
  }, [getData]);

  return { accessToken, getAccessToken: getData };
}

export default useAcquireToken;
