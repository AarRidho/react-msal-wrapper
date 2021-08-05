import { useCallback, useEffect, useRef, useState } from 'react';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';

function useAcquireToken({
  scopes = ['User.Read'],
  account = null,
  requestRefreshToken = false
}) {
  const { instance, accounts } = useMsal();
  const [accessToken, setAccessToken] = useState(null);
  const isAuthenticated = useIsAuthenticated(account);
  const controller = useRef(new AbortController());

  const getData = useCallback(async () => {
    if (isAuthenticated && (account || accounts.length > 0)) {
      // Retrieve an access token
      const request = {
        account: account ?? accounts[0],
        scopes
      };

      try {
        const response = await instance.acquireTokenSilent(request);
        return checkTokenResponse(response);
      } catch (error) {
        // console.log(error?.message, error?.errorCode);
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
          } catch {}
        }

        if (accessToken) setAccessToken(null);
        return null;
      }
    }
  }, [
    accessToken,
    account,
    accounts,
    instance,
    isAuthenticated,
    requestRefreshToken,
    scopes
  ]);

  const checkTokenResponse = (response) => {
    if (controller.current.signal.aborted) return;

    if (response.accessToken) {
      setAccessToken(response.accessToken);
      return response.accessToken;
    }

    setAccessToken(null);
    return null;
  };

  useEffect(() => {
    const abortController = controller.current;
    getData();

    return () => abortController.abort();
  }, [getData]);

  return { accessToken, getAccessToken: getData };
}

export default useAcquireToken;
