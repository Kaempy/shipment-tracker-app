/* eslint-disable no-undef */

import { useState } from 'react';
import { Alert } from 'react-native';

const useFetch = () => {
  const [loading, setLoading] = useState(false);

  const fetchData = async <T>(
    url: string | URL,
    options?: RequestInit
  ): Promise<T | undefined> => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        ...options,
      });
      return await response.json();
    } catch (error) {
      if (error instanceof Error) Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, fetchData };
};
export default useFetch;
