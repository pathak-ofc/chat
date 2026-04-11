import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, Loader2 } from "lucide-react";
import { authStore } from "../store/auth.Store.js";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = authStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="w-full max-w-md">
      <div className="px-8 py-10 border shadow-2xl rounded-2xl border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
          <p className="mt-2 text-sm text-white/60">
            Sign up to continue to your chat app
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block mb-2 text-sm text-white/80">Full Name</label>
            <div className="flex items-center gap-3 px-4 py-3 transition border rounded-xl border-white/10 bg-white/5 focus-within:border-cyan-400/50 focus-within:bg-white/10">
              <User className="size-5 text-white/50" />
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full text-sm text-white bg-transparent outline-none placeholder:text-white/40"
                value={formData.fullname}
                onChange={(e) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
              />
            </div>
          </div>

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
            <p className="mt-2 text-xs text-white/40">
              Password must be at least 6 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={isSigningUp}
            className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-xl bg-cyan-500/80 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSigningUp ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Creating account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-white/60">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-cyan-400 hover:text-cyan-300"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;