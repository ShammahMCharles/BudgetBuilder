import { useState } from "react";

type FetchFunction<T> = () => Promise<T>;

export function useFetch<T>(fetchFunction: FetchFunction<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const execute = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await fetchFunction();

      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refetch: execute,
  };
}