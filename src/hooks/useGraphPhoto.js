import { useCallback, useEffect, useState } from 'react';
import { useAcquireToken } from 'react-msal-wrapper';

function useGraphPhoto({
  scopes = ['User.Read'],
  graphEndpoint = 'https://graph.microsoft.com/v1.0/me/photo/$value',
  immediate = true,
  headers = null
} = {}) {
  const { accessToken } = useAcquireToken({ scopes });
  const [photos, setPhotos] = useState(null);
  const [error, setError] = useState(null);

  const getData = useCallback(
    async (accessToken, controller, headers) => {
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

        // console.log('WOY');
        // console.log(response);
        const blob = await response.blob();
        // console.log(blob);

        const url = window.URL || window.webkitURL;
        const blobUrl = url.createObjectURL(blob);
        // console.log({ url, blobUrl });

        setPhotos(blobUrl);
      } catch (error) {
        // console.log(error);
        setError(error);
      }
    },
    [graphEndpoint]
  );

  useEffect(() => {
    const controller = new AbortController();
    if (accessToken && immediate) getData(accessToken, controller, headers);

    return () => controller.abort();
  }, [accessToken, getData, headers, immediate]);

  return { photos, error };
}

export default useGraphPhoto;
