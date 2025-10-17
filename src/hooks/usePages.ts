import { useEffect, useState } from "react";
import axios from "axios";

interface UsePagesResult {
  pages: any[];
  loading: boolean;
  error: string | null;
}

const usePages = (): UsePagesResult => {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(" https://mystore-245577333791.asia-south1.run.app/api/link")
      .then((res) => {
        setPages(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Failed to fetch pages");
        setPages([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { pages, loading, error };
};

export default usePages;
