
import { Navigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAdminLoggedIn } = useAdmin();

  if (false) {
    return <Navigate to="/admin-login" replace />;
  }

  return <>{children}</>;
}
