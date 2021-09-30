import { useCallback, useEffect, useState, useRef } from 'react';
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
  const abortController = useRef(new AbortController());

  const getData = useCallback(async () => {
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
        return checkTokenResponse(response, abortController);
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
            return checkTokenResponse(response, abortController);
            // eslint-disable-next-line no-empty
          } catch (errorTokenPopup) {
            console.log(error);
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
    prompt,
    requestRefreshToken,
    scopes
  ]);

  const checkTokenResponse = (response, abortController) => {
    if (abortController.current.signal.aborted) return;

    if (response.accessToken) {
      setAccessToken(response.accessToken);
      return response.accessToken;
    }

    setAccessToken(null);
    return null;
  };

  useEffect(() => {
    const AbortController = abortController.current;
    getData();

    return () => {
      AbortController.abort();
    };
  }, [getData]);

  return { accessToken, getAccessToken: getData };
}

export default useAcquireToken;
