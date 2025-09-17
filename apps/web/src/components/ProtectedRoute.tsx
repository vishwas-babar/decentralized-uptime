import useSession from "@/hooks/useSession";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
   const { status } = useSession();

   if (status === "loading") return <div>Loading...</div>; // while checking session

   return status === "authenticated" ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
