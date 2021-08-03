import { useCallback, useEffect, useState } from 'react';
import { useAcquireToken } from 'react-msal-wrapper';

function useGraphPhoto({
  scopes = ['User.Read'],
  graphEndpoint = 'https://graph.microsoft.com/v1.0/me/photo/$value',
  immediate = true,
  ConsistencyLevel = 'eventual'
} = {}) {
  const { accessToken } = useAcquireToken({ scopes });
  const [photos, setPhotos] = useState(null);
  const [error, setError] = useState(null);

  const getData = useCallback(
    async (accessToken, controller) => {
      if (!accessToken) return;
      const response = await fetch(graphEndpoint, {
        method: 'GET',
        headers: {
          ConsistencyLevel,
          Authorization: 'Bearer ' + accessToken
        },
        signal: controller.signal
      });

      if (!response.ok) {
        setError(response);
        return;
      }

      const blob = await response.blob();
      const url = window.URL || window.webkitURL;
      const blobUrl = url.createObjectURL(blob);
      setPhotos(blobUrl);
    },
    [ConsistencyLevel, graphEndpoint]
  );

  useEffect(() => {
    const controller = new AbortController();
    if (accessToken && immediate) getData(accessToken, controller);

    return () => controller.abort();
  }, [accessToken, getData, immediate]);

  return { photos, error };
}

export default useGraphPhoto;
