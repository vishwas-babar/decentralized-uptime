import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ValidatorsPage from "./pages/ValidatorsPage";
import MonitorsPage from "./pages/MonitorsPage";
import "./App.css";
import RewardsPage from "./pages/RewardsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Provider from "./components/Provider";

function App() {
   return (
      <Provider>
         <Router>
            <Routes>
               <Route path="/" element={<LandingPage />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/signup" element={<SignupPage />} />

               <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/validators" element={<ValidatorsPage />} />
                  <Route path="/monitors" element={<MonitorsPage />} />
                  <Route path="/rewards" element={<RewardsPage />} />
               </Route>
            </Routes>
         </Router>
      </Provider>
   );
}

export default App;
