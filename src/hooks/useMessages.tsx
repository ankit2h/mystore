import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setMessages } from "../redux/sideSlice";
import toast from "react-hot-toast";

// Backend base URL - adjust if your API is hosted elsewhere
const BACKEND_BASE = " https://mystore-245577333791.asia-south1.run.app/api/v1/ai";

/**
 * Hook to load all messages for the current user and dump them into the Redux store
 * @param pollInterval Optional milliseconds to poll repeatedly. Pass 0 or undefined to disable polling.
 */
export default function useMessages({
  pollInterval,
}: { pollInterval?: number } = {}) {
  const dispatch = useDispatch();
  const userid = useSelector((store: RootState) => store.sidebar.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    if (!userid) {
      // if no user id, clear messages
      dispatch(setMessages([]));
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const url = `${BACKEND_BASE}/messages/?userid=${userid}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`Failed to fetch messages: ${res.status}`);
      const data = await res.json();
      const messages = Array.isArray(data?.messages) ? data.messages : [];
      // push into redux store
      dispatch(setMessages(messages));
    } catch (err: any) {
      setError(err?.message || String(err));
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, [userid, dispatch]);

  useEffect(() => {
    // fetch once when userid changes
    fetchMessages();

    // optional polling
    let timer: ReturnType<typeof setInterval> | undefined;
    if (pollInterval && userid) {
      timer = setInterval(() => {
        fetchMessages();
      }, pollInterval);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [fetchMessages, pollInterval, userid]);

  return { fetchMessages, loading, error } as const;
}
