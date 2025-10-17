import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import { useAuthForm } from "../hooks/useAuthForm";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const { handleAuth, loading } = useAuthForm({ setUser, navigate, setIsLogin });

  const loginHandler = () => {
    setIsLogin((prev) => !prev);
  };

  const resetFields = () => {
    setFullname("");
    setEmail("");
    setPassword("");
  };

  const getInputData = (e) => {
    e.preventDefault();
    handleAuth({
      isLogin,
      fullname,
      email,
      password,
      resetFields,
    });
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#f3f3f3] flex flex-col items-center justify-center z-[9999]">
      <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon Logo" className="w-32 mb-6" />
      <form
        onSubmit={getInputData}
        className="bg-white px-6 py-8 rounded-lg shadow-lg min-w-[400px] max-w-[440px] flex flex-col gap-4"
      >
        <h1 className="font-normal text-[28px] mb-4 text-[#111]">
          {isLogin ? "Sign-In" : "Create account"}
        </h1>
        {!isLogin && (
          <div className="mb-2">
            <label className="text-sm text-[#555]">Your name</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Fullname"
              className="w-full px-2 py-2 border border-[#a6a6a6] rounded mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
        )}
        <div className="mb-2">
          <label className="text-sm text-[#555]">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-2 py-2 border border-[#a6a6a6] rounded mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>
        <div className="mb-2">
          <label className="text-sm text-[#555]">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-2 py-2 border border-[#a6a6a6] rounded mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#ffd814] border border-[#fcd200] rounded py-2 font-medium text-base text-[#111] cursor-pointer mt-2 hover:bg-yellow-300 transition"
        >
          {loading ? "Loading..." : isLogin ? "Sign-In" : "Create your Amazon account"}
        </button>
        <div className="mt-4 text-sm text-[#555]">
          {isLogin ? "New to Amazon?" : "Already have an account?"}
          <span
            onClick={loginHandler}
            className="text-[#007185] cursor-pointer ml-2 hover:underline"
          >
            {isLogin ? "Create your Amazon account" : "Sign-In"}
          </span>
        </div>
      </form>
      <div className="mt-8 text-xs text-[#555] text-center">
        <p>
          By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
        </p>
      </div>
    </div>
  );
}
export default Login;
