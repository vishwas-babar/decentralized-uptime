import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ValidatorsPage from "./pages/ValidatorsPage";
import MonitorsPage from "./pages/MonitorsPage";
import "./App.css";
import RewardsPage from "./pages/RewardsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/validators" element={<ValidatorsPage />} />
          <Route path="/monitors" element={<MonitorsPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            // Default options for all toasts
            duration: 4000,
            style: {
              background: "#1e293b", // slate-800
              color: "#f8fafc", // slate-50
              border: "1px solid #334155", // slate-700
            },
            // Success toast styling
            success: {
              style: {
                background: "#1e293b",
                color: "#f8fafc",
                border: "1px solid #10b981", // emerald-500
              },
              iconTheme: {
                primary: "#10b981", // emerald-500
                secondary: "#f8fafc",
              },
            },
            // Error toast styling
            error: {
              style: {
                background: "#1e293b",
                color: "#f8fafc",
                border: "1px solid #ef4444", // red-500
              },
              iconTheme: {
                primary: "#ef4444", // red-500
                secondary: "#f8fafc",
              },
            },
            // Loading toast styling
            loading: {
              style: {
                background: "#1e293b",
                color: "#f8fafc",
                border: "1px solid #6b7280", // gray-500
              },
              iconTheme: {
                primary: "#10b981", // emerald-500
                secondary: "#f8fafc",
              },
            },
          }}
        />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
