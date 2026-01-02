import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for managing localStorage with type safety and expiration
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: { expirationMinutes?: number }
) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;

      const parsed = JSON.parse(item);
      
      // Check expiration
      if (options?.expirationMinutes && parsed.expiresAt) {
        if (Date.now() > parsed.expiresAt) {
          window.localStorage.removeItem(key);
          return initialValue;
        }
      }
      
      return parsed.value ?? initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      const item = {
        value: valueToStore,
        expiresAt: options?.expirationMinutes
          ? Date.now() + options.expirationMinutes * 60 * 1000
          : null,
      };

      window.localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue, options]);

  return [storedValue, setValue] as const;
}

/**
 * Custom hook for debounced values
 */
export function useDebounce<T>(value: T, delayMs: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => clearTimeout(handler);
  }, [value, delayMs]);

  return debouncedValue;
}

/**
 * Custom hook for fetch with error handling and loading states
 */
export function useFetch<T>(
  url: string | null,
  options?: RequestInit & { retries?: number; retryDelay?: number }
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    if (!url) return;

    setLoading(true);
    setError(null);

    let retries = options?.retries ?? 3;
    let lastError: Error | null = null;

    while (retries > 0) {
      try {
        abortControllerRef.current = new AbortController();

        const response = await fetch(url, {
          ...options,
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
        setError(null);
        setLoading(false);
        return;
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        retries--;

        if (retries > 0) {
          await new Promise(resolve =>
            setTimeout(resolve, options?.retryDelay ?? 1000)
          );
        }
      }
    }

    setError(lastError);
    setLoading(false);
  }, [url, options]);

  useEffect(() => {
    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchData]);

  const retry = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, retry };
}

/**
 * Custom hook for managing async operations with loading/error states
 */
export function useAsync<T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true
) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    setValue(null);
    setError(null);

    try {
      const response = await asyncFunction();
      setValue(response);
      setStatus('success');
      return response;
    } catch (error) {
      setError(error as E);
      setStatus('error');
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };
}

/**
 * Custom hook for tracking previous value
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
