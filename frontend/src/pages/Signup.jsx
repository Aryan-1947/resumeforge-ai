import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiArrowRight } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import Logo from "../components/Logo";
import toast from "react-hot-toast";
import axios from "axios";

const AUTH0_DOMAIN = "dev-zot4kk3hoskmk6k4.us.auth0.com";
const AUTH0_CLIENT_ID = "W7PocqFJikBAroCMfxvcCHXtZhl5Agvk";
const AUTH0_AUDIENCE = "https://resumeforge-api";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !username) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    try {
      setLoading(true);

      // Step 1 — Create user in Auth0
      await axios.post(
        `https://${AUTH0_DOMAIN}/dbconnections/signup`,
        {
          client_id: AUTH0_CLIENT_ID,
          email,
          password,
          username,
          connection: "Username-Password-Authentication",
        },
        { headers: { "Content-Type": "application/json" } }
      );

      // Step 2 — Auto login after signup
      const loginRes = await axios.post(
        `https://${AUTH0_DOMAIN}/oauth/token`,
        {
          grant_type: "password",
          username: email,
          password,
          audience: AUTH0_AUDIENCE,
          scope: "openid profile email",
          client_id: AUTH0_CLIENT_ID,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const { access_token, id_token } = loginRes.data;
      localStorage.setItem("auth0_access_token", access_token);
      localStorage.setItem("auth0_id_token", id_token);
      toast.success("Account created! Welcome to ResumeForge AI!");
      navigate("/app");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message ||
                  err.response?.data?.error_description ||
                  "Signup failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: "google-oauth2",
        audience: AUTH0_AUDIENCE,
      },
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 grid-bg"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <Logo size={36} darkBg={true} />
          <div>
            <span className="text-lg font-bold tracking-tight" style={{ color: "var(--text)" }}>
              ResumeForge<span className="text-amber-500"> AI</span>
            </span>
            <p className="text-[10px] font-mono tracking-widest uppercase leading-none" style={{ color: "var(--text-faint)" }}>
              V1.0
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}>
          <h1 className="text-xl font-black tracking-tight mb-1" style={{ color: "var(--text)" }}>
            Create account
          </h1>
          <p className="text-xs font-mono mb-6" style={{ color: "var(--text-faint)" }}>
            Start optimizing your resume for free
          </p>

          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors mb-4"
            style={{ border: "1px solid var(--border)", backgroundColor: "var(--surface-2)", color: "var(--text)" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(245,158,11,0.4)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
          >
            <FaGoogle className="text-sm text-red-400" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
            <span className="text-xs font-mono" style={{ color: "var(--text-faint)" }}>OR</span>
            <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">

            {/* Username */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest mb-1.5" style={{ color: "var(--text-muted)" }}>
                Username
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--text-faint)" }} />
                <input
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg font-mono focus:outline-none transition-colors"
                  style={{
                    backgroundColor: "var(--bg)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "#F59E0B"}
                  onBlur={e => e.currentTarget.style.borderColor = "var(--border)"}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest mb-1.5" style={{ color: "var(--text-muted)" }}>
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--text-faint)" }} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg font-mono focus:outline-none transition-colors"
                  style={{
                    backgroundColor: "var(--bg)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "#F59E0B"}
                  onBlur={e => e.currentTarget.style.borderColor = "var(--border)"}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest mb-1.5" style={{ color: "var(--text-muted)" }}>
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--text-faint)" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 8 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 text-sm rounded-lg font-mono focus:outline-none transition-colors"
                  style={{
                    backgroundColor: "var(--bg)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "#F59E0B"}
                  onBlur={e => e.currentTarget.style.borderColor = "var(--border)"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-faint)" }}
                >
                  {showPassword ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-colors mt-2"
              style={{
                backgroundColor: loading ? "var(--surface-2)" : "#F59E0B",
                color: loading ? "var(--text-faint)" : "#000",
              }}
            >
              {loading ? "Creating account..." : <>Create Account <FiArrowRight /></>}
            </button>
          </form>
        </div>

        <p className="text-center text-xs font-mono mt-5" style={{ color: "var(--text-faint)" }}>
          Already have an account?{" "}
          <Link to="/login" className="text-amber-500 hover:text-amber-400 font-semibold">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;