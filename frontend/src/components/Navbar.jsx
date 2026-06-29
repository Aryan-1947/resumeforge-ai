import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, Link } from "react-router-dom";
import { FiSun, FiMoon, FiLogOut, FiClock, FiZap } from "react-icons/fi";
import { IconTextScanAi } from "@tabler/icons-react";
import toast from "react-hot-toast";

function Navbar({ darkMode, setDarkMode }) {
  const { isAuthenticated, user, logout } = useAuth0();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    toast.success("Logged out successfully");
  };

  return (
    <nav style={{
      backgroundColor: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
    }} className="px-6 md:px-10 py-4 flex items-center justify-between sticky top-0 z-50">

      <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/")}>
        <div className="bg-amber-500 p-2 rounded-lg">
          <IconTextScanAi size={16} color="black" />
        </div>
        <div>
          <span className="text-base font-bold tracking-tight" style={{ color: 'var(--text)' }}>
            ResumeForge<span className="text-amber-500"> AI</span>
          </span>
          <p className="text-[10px] font-mono tracking-widest uppercase leading-none" style={{ color: 'var(--text-faint)' }}>
            V1.0
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isAuthenticated && (
          <>
            <span className="hidden md:block text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--text-faint)' }}>
              {user?.nickname || user?.name || user?.email}
            </span>
            <Link
              to="/history"
              className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-widest px-3 py-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}
            >
              <FiClock className="text-sm" /> History
            </Link>
            <Link
              to="/app"
              className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-widest bg-amber-500 hover:bg-amber-600 text-black px-3 py-2 rounded-lg transition-colors"
            >
              <FiZap className="text-sm" /> Analyze
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg transition-colors hover:text-red-400"
              style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
              title="Logout"
            >
              <FiLogOut className="text-sm" />
            </button>
          </>
        )}

        {!isAuthenticated && (
          <span className="text-xs font-mono uppercase tracking-widest hidden md:block" style={{ color: 'var(--text-faint)' }}>
            AI-Powered ATS Optimization
          </span>
        )}

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg transition-colors"
          style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
        >
          {darkMode ? <FiSun className="text-sm" /> : <FiMoon className="text-sm" />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;