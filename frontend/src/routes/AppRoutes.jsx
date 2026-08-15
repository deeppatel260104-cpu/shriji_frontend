import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Dashboard from "../pages/backend/Sidebar";
import { loadUser } from "../actions/userAction";
import LoginPage from "./../pages/LoginPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import HomePage from "../pages/frontend/HomePage";
import Loading from '../pages/frontend/Loading';
import PhotographyEditor from "../pages/backend/PhotographyEditor";
import Category from "../pages/backend/Category";
import Image from "../pages/backend/Image";
import Video from "../pages/backend/Video";
import AddOnPackage from "../pages/backend/AddOnPackage";
import PackageFaq from "../pages/backend/PackageFaq";
import PackageAdmin from "../pages/backend/Package";
import CategoryPage from "../pages/frontend/Category";
import PackagePage from "../pages/frontend/Packages";
import Contact from "../pages/frontend/ContactUs";
import DashboardConfig from './../components/Backend/config/Dashboard';
import CategoryDetailPage from "../pages/frontend/CategoryDetailPage";
import AboutUsPage from "../pages/frontend/AboutUsPage";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, authChecked } = useSelector((state) => state.auth);

  if (loading || !authChecked) return <Loading />;

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

function AppContent() {
  const dispatch = useDispatch();
  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/admin") &&
    location.pathname !== "/admin/login";

  useEffect(() => {
    if(isAdminRoute) {
      dispatch(loadUser());
    }
  }, [dispatch, isAdminRoute]);

  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/category" element={<CategoryPage />}  />
      <Route path="/category/:slug" element={<CategoryDetailPage />}  />
      <Route path="/packages" element={<PackagePage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      {/* Protected routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >

      {/* Redirect /admin → /admin/dashboard */}
      <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<DashboardConfig />} />
          <Route path="hero-section" element={<PhotographyEditor />} />
          <Route path="category" element={<Category />} />
          <Route path="image" element={<Image />} />
          <Route path="video" element={<Video />} />
          <Route path="packages" element={<PackageAdmin />} />
          <Route path="package-addons" element={<AddOnPackage />} />
          <Route path="package-faqs" element={<PackageFaq />} />

      </Route>
    </Routes>
  );
}

export default AppContent;
