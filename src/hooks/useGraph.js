import { useCallback, useEffect, useState } from 'react';
import useAcquireToken from './useAcquireToken';

function useGraph({
  graphEndpoint = 'https://graph.microsoft.com/v1.0/me'
} = {}) {
  const { accessToken } = useAcquireToken({ scopes: ['User.Read'] });
  const [graphData, setGraphData] = useState(null);
  const [error, setError] = useState(null);

  const getData = useCallback(
    async (accessToken, controller) => {
      try {
        const response = await fetch(graphEndpoint, {
          method: 'GET',
          headers: {
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
    [graphEndpoint]
  );

  useEffect(() => {
    const controller = new AbortController();
    if (accessToken) getData(accessToken, controller);

    return () => controller.abort();
  }, [accessToken, getData]);

  return { graphData, error };
}

export default useGraph;
