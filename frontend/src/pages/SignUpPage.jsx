import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";

import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white pt-16">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-6">
            <div className="flex flex-col items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold mt-2 text-gray-800">Create Account</h1>
              <p className="text-gray-500 text-sm">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control">
              <label className="label pb-2">
                <span className="label-text font-semibold text-gray-700 text-sm">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-gray-700 placeholder:text-gray-400"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label pb-2">
                <span className="label-text font-semibold text-gray-700 text-sm">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-gray-700 placeholder:text-gray-400"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label pb-2">
                <span className="label-text font-semibold text-gray-700 text-sm">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-gray-700 placeholder:text-gray-400"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-600 hover:shadow-xl hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gradient-to-br from-gray-50 to-white text-gray-500">
                Already a member?
              </span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default SignUpPage;