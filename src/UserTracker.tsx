import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUser, clearUser } from "./redux/sideSlice";
// import useMessages from "./hooks/useMessages";

// Client-side UUID generator with fallback
function generateUUID() {
  if (
    typeof crypto !== "undefined" &&
    typeof (crypto as any).randomUUID === "function"
  ) {
    // @ts-ignore
    return (crypto as any).randomUUID();
  }
  // fallback simple UUID (not RFC-perfect but acceptable client-side)
  return (
    "u_" +
    Date.now().toString(36) +
    "_" +
    Math.random().toString(36).slice(2, 9)
  );
}

const CREATE_USER_ENDPOINT =
  " https://mystore-245577333791.asia-south1.run.app/api/v1/ai/create-user"; // imaginary endpoint to create user doc

const CREATE_USER_ENDPOINT2 = " http://localhost:5000/api/v1/ai/create-user2";

const UserTracker = () => {
  const dispatch = useDispatch();
  // const { fetchMessages } = useMessages();

  useEffect(() => {
    // parse cookie for userId
    const match = document.cookie
      .split(";")
      .map((c) => c.trim())
      .find(
        (c) =>
          c.startsWith("userId=") ||
          c.startsWith("userID=") ||
          c.startsWith("userid=")
      );
    let userId: string | null = null;
    if (match) {
      const parts = match.split("=");
      userId = parts.slice(1).join("=");
    }

    if (!userId) {
      // generate, set cookie, and notify backend to create record
      userId = generateUUID();
      // set cookie (client-side can't set HttpOnly)
      const maxAge = 60 * 60 * 24 * 365; // 1 year
      document.cookie = `userId=${userId}; max-age=${maxAge}; path=/; samesite=lax`;

      // send to imaginary create-user endpoint (best-effort)
      (async () => {
        try {
          await fetch(CREATE_USER_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userid: userId }),
          });
          await fetch(CREATE_USER_ENDPOINT2, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userid: userId }),
          });
        } catch (err) {
          // ignore network errors for now; record will be created when backend receives later requests
          console.warn("create-user request failed:", err);
        }
      })();
    }

    // store userId in redux
    if (userId) {
      (async () => {
        try {
          await fetch(CREATE_USER_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userid: userId }),
          });
          await fetch(CREATE_USER_ENDPOINT2, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userid: userId }),
          });
        } catch (err) {
          // ignore network errors for now; record will be created when backend receives later requests
          console.warn("create-user request failed:", err);
        }
      })();
      dispatch(addUser(userId));
      // trigger loading messages for this user
      // try { fetchMessages(); } catch (e) { /* ignore */ }
    }

    return () => {
      dispatch(clearUser());
    };
  }, [dispatch]);

  return null;
};

export default UserTracker;
