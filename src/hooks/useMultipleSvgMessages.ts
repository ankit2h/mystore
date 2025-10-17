
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSvgMessages } from "../redux/sideSlice";

interface SvgMessage {
  svgid: string;
  messages: any[];
}

interface RootState {
  sidebar: {
    user: string;
  };
}

export default function useMultipleSvgMessages(svgidArray: string[]): void {
  const dispatch = useDispatch();
  const userid = useSelector((state: RootState) => state.sidebar.user);

  useEffect(() => {
    if (!svgidArray || svgidArray.length === 0) {
      dispatch(setSvgMessages([]));
      return;
    }
    Promise.all(
      svgidArray.map((svgid: string) =>
        fetch(`https://mystore-245577333791.asia-south1.run.app/api/v1/ai/svg/messages/${svgid}?userid=${userid}`)
          .then((res) => res.json())
          .then((data) => ({ svgid, messages: data.messages || [] }))
          .catch(() => ({ svgid, messages: [] }))
      )
    ).then((results: SvgMessage[]) => {
      // Store as array of { svgid, messages }
      dispatch(setSvgMessages(results));
    });
  }, [svgidArray, dispatch, userid]);
}
