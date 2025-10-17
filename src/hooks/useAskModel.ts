import { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  setContext,
  setResponse,
  setOpen,
  setQuery,
  setTags,
} from "../redux/sideSlice";

interface RootState {
  sidebar: {
    user: string;
  };
}

interface AskResponse {
  response?: string;
}

interface ChatResponse {
  success: boolean;
  error?: string;
}

export default function useAskModel() {
  const dispatch = useDispatch();
  const userid = useSelector((state: RootState) => state.sidebar.user);

  const askModel = async (query: string, svgid: string): Promise<string> => {
    if (!query || query.trim() === "") {
      toast.error("Please type your question.");
      return "";
    }
    try {
      const res = await fetch(
        "https://response-245577333791.us-central1.run.app/ask",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, userid }),
        }
      );
      const data: AskResponse = await res.json();
      const response = data.response;
      console.log("API response:", data);
      if (data.response) {
        dispatch(setResponse(data.response));
        dispatch(setOpen(true));
        dispatch(setTags([]));
      }
      if (!data.response) {
        console.log("No response from AI. Cannot continue.");
      }
      dispatch(setContext(""));
      console.log(svgid, query, response, userid);
      const res2 = await fetch(
        " https://mystore-245577333791.asia-south1.run.app/api/v1/ai/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ svgid, query, response, userid }),
        }
      );
      const res2Data: ChatResponse = await res2.json();
      if (res2Data.success) {
      } else if (res2Data.error) {
        toast.error(res2Data.error);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return { askModel };
}
