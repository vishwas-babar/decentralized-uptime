import useSession from "@/hooks/useSession";
import { Navigate, Outlet } from "react-router-dom";
import SessionLoadingScreen from "./SessionLoadingScreen";

function ProtectedRoute() {
   const { status } = useSession();

   if (status === "loading") return <SessionLoadingScreen />; // while checking session

   return status === "authenticated" ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
