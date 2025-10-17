import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSvgs } from "../redux/sideSlice";
import axios from "axios";

const usePage = (link: string): void => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!link) return;
    axios
      .get(
        ` https://mystore-245577333791.asia-south1.run.app/api/v1/ai/link/${link}`
      )
      .then((res) => {
        if (Array.isArray(res.data)) {
          dispatch(setSvgs(res.data));
        } else {
          console.error("API did not return an array:", res.data);
          dispatch(setSvgs([]));
        }
      })
      .catch((err) => {
        console.log(err.response?.data?.error || "Failed to fetch SVGs");
      });
    axios
      .get(
        ` https://mystore-245577333791.asia-south1.run.app/api/v1/ai/front/${link}`
      )
      .then((res) => {
        if (Array.isArray(res.data)) {
          dispatch(setSvgs(res.data));
        } else {
          console.error("API did not return an array:", res.data);
          dispatch(setSvgs([]));
        }
      })
      .catch((err) => {
        console.log(err.response?.data?.error || "Failed to fetch SVGs");
      });
  }, [link, dispatch]);
};

export default usePage;
