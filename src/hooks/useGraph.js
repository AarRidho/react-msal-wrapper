import { useCallback, useEffect, useState } from 'react';
import useAcquireToken from './useAcquireToken';

function useGraph({
  graphEndpoint = 'https://graph.microsoft.com/v1.0/me'
} = {}) {
  const { accessToken } = useAcquireToken({ scopes: ['User.Read'] });
  const [graphData, setGraphData] = useState(null);
  const [error, setError] = useState(null);
  // console.log({ accessToken });

  const getData = useCallback(
    async (accessToken) => {
      return fetch(graphEndpoint, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      })
        .then((response) => response.json())
        .then(setGraphData)
        .catch(setError);
    },
    [graphEndpoint]
  );

  useEffect(() => {
    if (accessToken) {
      getData(accessToken);
    }
  }, [accessToken, getData]);

  return { graphData, error };
}

export default useGraph;
