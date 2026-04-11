import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Loader2 } from "lucide-react";
import { authStore } from "../store/auth.Store.js";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = authStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="w-full max-w-md px-4">
      <div className="px-8 py-10 border shadow-2xl rounded-2xl border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="mt-2 text-sm text-white/60">
            Login to continue to your chat app
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm text-white/80">Email</label>
            <div className="flex items-center gap-3 px-4 py-3 transition border rounded-xl border-white/10 bg-white/5 focus-within:border-cyan-400/50 focus-within:bg-white/10">
              <Mail className="size-5 text-white/50" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full text-sm text-white bg-transparent outline-none placeholder:text-white/40"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm text-white/80">Password</label>
            <div className="flex items-center gap-3 px-4 py-3 transition border rounded-xl border-white/10 bg-white/5 focus-within:border-cyan-400/50 focus-within:bg-white/10">
              <Lock className="size-5 text-white/50" />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full text-sm text-white bg-transparent outline-none placeholder:text-white/40"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-xl bg-cyan-500/80 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-white/60">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium transition text-cyan-400 hover:text-cyan-300"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;