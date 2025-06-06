import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import MassSchedulePage from "./pages/MassSchedulePage";
import RegistrationPage from "./pages/RegistrationPage";
import TithePage from "./pages/TithePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

// Admin Pages
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminRegistrationsPage from "./pages/admin/AdminRegistrationsPage";
import ChapelsPage from "./pages/ChapelsPage";
import AdminDizimistasPage from "./pages/admin/AdminDizimistasPage";

function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header />

      <main className="min-h-screen pt-16">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/horarios" element={<MassSchedulePage />} />
          <Route path="/inscricoes" element={<RegistrationPage />} />
          <Route path="/dizimo" element={<TithePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/capelas" element={<ChapelsPage />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/registrations"
            element={
              <ProtectedRoute adminOnly>
                <AdminRegistrationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dizimistas"
            element={
              <ProtectedRoute adminOnly>
                <AdminDizimistasPage />
              </ProtectedRoute>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </>
  );
}

export default App;
