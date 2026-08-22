import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading, hasConsent } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100dvh", direction: "rtl" }}>
        <p style={{ color: "hsl(var(--color-gray-500))" }}>جاري التحميل...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasConsent && location.pathname !== "/consent") {
    return <Navigate to="/consent" replace />;
  }

  return <>{children}</>;
}
