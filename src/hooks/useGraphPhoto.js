import { useCallback, useEffect, useRef, useState } from 'react';
import useAcquireToken from './useAcquireToken';

function useGraphPhoto({
  scopes = ['User.Read'],
  graphEndpoint = 'https://graph.microsoft.com/v1.0/me/photo/$value',
  immediate = true,
  ConsistencyLevel = 'eventual'
} = {}) {
  const { accessToken } = useAcquireToken({ scopes });
  const [photos, setPhotos] = useState(null);
  const [error, setError] = useState(null);
  const abortController = useRef(null);
  useEffect(() => {
    const controller = new AbortController();
    abortController.current = controller;

    return () => AbortController.abort();
  }, []);

  const getData = useCallback(async () => {
    const controller = abortController.current;
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
  }, [ConsistencyLevel, accessToken, graphEndpoint]);

  useEffect(() => {
    if (immediate) getData();
  }, [getData, immediate]);

  return { photos, error };
}

export default useGraphPhoto;
