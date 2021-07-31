import { useCallback, useEffect, useState } from 'react';
import { useAcquireToken } from 'react-msal-wrapper';

function useGraphPhoto({
  scopes = ['User.Read'],
  graphEndpoint = 'https://graph.microsoft.com/v1.0/me/photo/$value',
  immediate = true,
  headers = {}
} = {}) {
  const { accessToken } = useAcquireToken({ scopes });
  const [photos, setPhotos] = useState(null);
  const [error, setError] = useState(null);

  const getData = useCallback(
    async (accessToken, controller) => {
      // console.log({ accessToken });

      if (!accessToken) return;
      try {
        const response = await fetch(graphEndpoint, {
          method: 'GET',
          headers: {
            ...headers,
            Authorization: 'Bearer ' + accessToken
          },
          signal: controller.signal
        });

        const blob = await response.blob();

        const url = window.URL || window.webkitURL;
        const blobUrl = url.createObjectURL(blob);

        setPhotos(blobUrl);
      } catch (error) {
        // console.log(error);
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

  return { photos, error };
}

export default useGraphPhoto;
