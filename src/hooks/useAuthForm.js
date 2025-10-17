import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Accept 'navigate' instead of 'router' for React Router compatibility
export function useAuthForm({ setUser, navigate, setIsLogin }) {
  const [loading, setLoading] = useState(false);

  const handleAuth = async ({ isLogin, fullname, email, password, resetFields }) => {
    setLoading(true);
    if (isLogin) {
      // Login
      const user = { email, password };
      try {
        const res = await axios.post(
          ` https://mystore-245577333791.asia-south1.run.app/api/v1/user/login`,
          user,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          toast.success(res.data.message);
          setUser(res.data.user || { email });
          if (navigate) navigate("/");
        }
      } catch (error) {
        const errorMsg = error?.response?.data?.message || error.message || "Something went wrong";
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    } else {
      // Signup
      const user = { fullname, email, password };
      try {
        const res = await axios.post(
          ` https://mystore-245577333791.asia-south1.run.app/api/v1/user/signup`,
          user,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          toast.success(res.data.message);
          setIsLogin && setIsLogin(true);
        }
      } catch (error) {
        const errorMsg = error?.response?.data?.message || error.message || "Something went wrong";
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    }
    if (resetFields) resetFields();
  };

  return { handleAuth, loading };
}
