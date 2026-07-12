import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import logo from "../assets/Logo/shriji_logo_black.png";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { clearErrors, login } from '../actions/userAction.js';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false); 


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
     setSubmitted(true);
    dispatch(login(email, password)) 
  }


  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-200 font-sans">
      <div className="w-full max-w-md px-4">

        {/* Single unified card */}
        <div className="w-full bg-white border border-gray-300 rounded-xl shadow-sm">

          {/* Logo — centered, no border */}
          <div className="flex items-center justify-center pt-8 pb-6">
            <img
              src={logo}
              alt="Shriji Logo"
              style={{ width: "200px", height: "120px" }}
              className="object-contain brightness-0"
            />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 mx-0" />

          {/* Login heading */}
          <div className="px-9 pt-6 pb-4">
            <h1 className="text-xl font-semibold text-gray-900 tracking-tight text-center">
              Login
            </h1>
          </div>

          {/* Form */}
          <div className="px-9 pb-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Error Banner */}
              
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400 transition-all duration-150 focus:border-gray-800 focus:ring-2 focus:ring-gray-800/10"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-900">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-11 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400 transition-all duration-150 focus:border-gray-800 focus:ring-2 focus:ring-gray-800/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-150"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex justify-end">

                <Link
                  to="/forgot-password"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-1 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-150"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                    </svg>
                    Log in...
                  </span>
                ) : "Log In"}
              </button>
              {submitted && error && (
      <div className="flex items-center gap-2 text-sm px-3 py-2.5 rounded-md bg-red-50 border border-red-200 text-red-600">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        Invalid email or password
      </div>
    )}


            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LoginPage;
