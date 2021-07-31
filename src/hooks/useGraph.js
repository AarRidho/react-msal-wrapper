import { useCallback, useEffect, useState } from 'react';
import useAcquireToken from './useAcquireToken';

function useGraph({
  scopes = ['User.Read'],
  graphEndpoint = 'https://graph.microsoft.com/v1.0/me',
  immediate = true,
  headers = {}
} = {}) {
  const { accessToken } = useAcquireToken({ scopes });
  const [graphData, setGraphData] = useState(null);
  const [error, setError] = useState(null);

  const getData = useCallback(
    async (accessToken, controller) => {
      try {
        const response = await fetch(graphEndpoint, {
          method: 'GET',
          headers: {
            ...headers,
            Authorization: 'Bearer ' + accessToken
          },
          signal: controller.signal
        });
        const body = await response.json();

        setGraphData(body);
      } catch (error) {
        setError(error);
      }
    },
    [graphEndpoint, headers]
  );

  useEffect(() => {
    const controller = new AbortController();
    if (accessToken && immediate) getData(accessToken, controller);

    return () => controller.abort();
  }, [accessToken, getData, immediate]);

  return { graphData, error };
}

export default useGraph;
