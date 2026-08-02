import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg)" }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-amber-500 animate-spin"
          style={{ borderColor: "var(--border)", borderTopColor: "#F59E0B" }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return children;
}

export default ProtectedRoute;