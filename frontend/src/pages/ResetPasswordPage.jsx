import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/Logo/shriji_logo_black.png";
import { clearErrors, clearMessage, resetPassword } from "../actions/userAction";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, message, success } = useSelector((state) => state.password);

  useEffect(() => {
    dispatch(clearErrors());
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    if (!success) return;

    const timer = window.setTimeout(() => {
      navigate("/admin/login", { replace: true });
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [success, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setLocalError("");

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Password and confirm password do not match.");
      return;
    }

    dispatch(resetPassword(token, password));
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-200 font-sans">
      <div className="w-full max-w-md px-4">
        <div className="w-full bg-white border border-gray-300 rounded-xl shadow-sm">
          <div className="flex items-center justify-center pt-8 pb-6">
            <img
              src={logo}
              alt="Shriji Logo"
              style={{ width: "200px", height: "120px" }}
              className="object-contain brightness-0"
            />
          </div>

          <div className="border-t border-gray-100 mx-0" />

          <div className="px-9 pt-6 pb-4">
            <h1 className="text-xl font-semibold text-gray-900 tracking-tight text-center">
              Reset Password
            </h1>
          </div>

          <div className="px-9 pb-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-900">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400 transition-all duration-150 focus:border-gray-800 focus:ring-2 focus:ring-gray-800/10"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-900">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400 transition-all duration-150 focus:border-gray-800 focus:ring-2 focus:ring-gray-800/10"
                />
              </div>

              <button
                type="submit"
                disabled={loading || success}
                className="w-full py-3 mt-1 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-150"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>

              {submitted && message && (
                <div className="text-sm px-3 py-2.5 rounded-md bg-green-50 border border-green-200 text-green-700">
                  {message}
                </div>
              )}

              {submitted && (localError || error) && (
                <div className="text-sm px-3 py-2.5 rounded-md bg-red-50 border border-red-200 text-red-600">
                  {localError || error}
                </div>
              )}

              <Link
                to="/admin/login"
                className="text-sm text-center text-gray-500 hover:text-gray-900 transition-colors duration-150"
              >
                Back to login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
