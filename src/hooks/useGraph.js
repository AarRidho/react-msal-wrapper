import { useCallback, useEffect, useRef, useState } from 'react';
import useAcquireToken from './useAcquireToken';

function useGraph({
  scopes = ['User.Read'],
  graphEndpoint = 'https://graph.microsoft.com/v1.0/me',
  immediate = true,
  headers = null
} = {}) {
  const { accessToken } = useAcquireToken({ scopes });
  const [graphData, setGraphData] = useState(null);
  const [error, setError] = useState(null);
  const abortController = useRef(null);
  useEffect(() => {
    const controller = new AbortController();
    abortController.current = controller;

    return () => AbortController.abort();
  }, []);

  const getData = useCallback(async () => {
    const controller = abortController.current;
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
  }, [accessToken, graphEndpoint, headers]);

  useEffect(() => {
    if (immediate) getData();
  }, [getData, immediate]);

  return { graphData, error };
}

export default useGraph;
