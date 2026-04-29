import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, Leaf, MapPin, AtSign } from "lucide-react";
import { motion } from "motion/react";

const Auth: React.FC<{ type: "login" | "signup" }> = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "login") {
      login(email, name || email.split("@")[0]);
    } else {
      signup({ email, name, username, address });
    }
    navigate("/");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full grid gap-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl text-emerald-600 mb-4">
            <Leaf className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-emerald-950">
            {type === "login" ? "Welcome Back" : "Join the Ritual"}
          </h1>
          <p className="text-emerald-700/60 leading-relaxed">
            {type === "login"
              ? "Sign in to access your curated herbal selections."
              : "Start your journey towards a cleaner, more natural lifestyle."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {type === "signup" && (
              <>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-emerald-400" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-11 pr-4 py-4 bg-white border border-emerald-100 rounded-2xl text-emerald-900 placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <AtSign className="h-5 w-5 text-emerald-400" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-11 pr-4 py-4 bg-white border border-emerald-100 rounded-2xl text-emerald-900 placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm"
                  />
                </div>
              </>
            )}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-emerald-400" />
              </div>
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-11 pr-4 py-4 bg-white border border-emerald-100 rounded-2xl text-emerald-900 placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-emerald-400" />
              </div>
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-11 pr-4 py-4 bg-white border border-emerald-100 rounded-2xl text-emerald-900 placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm"
              />
            </div>
            {type === "signup" && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-emerald-400" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Shipping Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 bg-white border border-emerald-100 rounded-2xl text-emerald-900 placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all transform active:scale-[0.98] shadow-lg shadow-emerald-200"
          >
            <span>{type === "login" ? "Sign In" : "Create Account"}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-emerald-700/60">
            {type === "login" ? "New to Climjo?" : "Already have an account?"}{" "}
            <Link
              to={type === "login" ? "/signup" : "/login"}
              className="font-bold text-emerald-700 hover:text-emerald-900 underline underline-offset-4"
            >
              {type === "login" ? "Create an account" : "Sign in instead"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
