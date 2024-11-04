'use client';
import { useEffect, useState } from "react";

export function useProfile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    fetch('/api/profile', { signal })
      .then(response => response.json())
      .then(data => {
        setData(data);
        setError(null);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError("Failed to fetch profile data.");
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();  // Cleanup
  }, []);

  return { loading, data, error };
}
