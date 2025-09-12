import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ValidatorsPage from "./pages/ValidatorsPage";
import MonitorsPage from "./pages/MonitorsPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/validators" element={<ValidatorsPage />} />
        <Route path="/monitors" element={<MonitorsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
