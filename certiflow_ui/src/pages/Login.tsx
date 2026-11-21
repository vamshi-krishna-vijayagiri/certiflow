import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  GraduationCap,
  LockKeyhole,
} from "lucide-react";
import axios from "axios";
import api from "../services/api";

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post<LoginResponse>("/auth/login", {
        email: email.trim(),
        password,
      });

      if (!response.data.success || !response.data.token) {
        setError(response.data.message || "Login failed. Please try again.");
        return;
      }

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Unable to connect to the server. Please try again."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Branding Section */}
      <section className="login-brand-panel">
        <div className="brand-logo">
          <div className="brand-icon">
            <GraduationCap size={30} />
          </div>
          <span>CertiFlow</span>
        </div>

        <div className="brand-content">
          <div className="brand-tagline">
            SKILL DEVELOPMENT & CERTIFICATION
          </div>

          <h1>
            Empowering Skills.
            <br />
            <span>Certifying Futures.</span>
          </h1>

          <p>
            A unified digital platform for managing skill development
            certifications with transparency, accountability, and trust.
          </p>

          <div className="brand-features">
            <div>
              <ShieldCheck size={20} />
              <span>Secure Certificate Issuance</span>
            </div>

            <div>
              <LockKeyhole size={20} />
              <span>Role-Based Access Control</span>
            </div>

            <div>
              <GraduationCap size={20} />
              <span>Transparent Certification Process</span>
            </div>
          </div>
        </div>

        <div className="brand-footer">
          © 2026 CertiFlow. Digital Certification Platform.
        </div>
      </section>

      {/* Login Form Section */}
      <section className="login-form-panel">
        <div className="login-form-container">
          <div className="mobile-brand">
            <GraduationCap size={28} />
            <span>CertiFlow</span>
          </div>

          <div className="login-heading">
            <div className="welcome-label">WELCOME BACK</div>
            <h2>Sign in to your account</h2>
            <p>Enter your credentials to access your workspace.</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="login-input-group">
              <label htmlFor="email">Email Address</label>

              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div className="login-input-group">
              <label htmlFor="password">Password</label>

              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="login-error" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="login-security">
            <ShieldCheck size={17} />
            <span>
              Your account is protected with secure authentication.
            </span>
          </div>

          <div className="login-bottom">
            Need help accessing your account? Contact your administrator.
          </div>

          <Link to="/verify" className="login-verify-link">
            Verify a certificate without signing in →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Login;