
import { Navigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAdminLoggedIn } = useAdmin();

  if (isAdminLoggedIn == false) {
    return <Navigate to="/game-admin/login" replace />;
  }

  return <>{children}</>;
}
