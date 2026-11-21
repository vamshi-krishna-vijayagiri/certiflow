import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  GraduationCap,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import axios from "axios";
import api from "../services/api";

interface RegisterResponse {
  success: boolean;
  message: string;
}

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post<RegisterResponse>("/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password,
        role: "TRAINING_CENTRE",
      });

      if (!response.data.success) {
        setError(response.data.message || "Registration failed.");
        return;
      }

      navigate("/login", {
        replace: true,
        state: {
          registrationSuccess:
            response.data.message || "Registration successful! Please sign in.",
        },
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Unable to complete registration. Please try again."
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
            Start Your Journey.
            <br />
            <span>Certify Success.</span>
          </h1>

          <p>
            Join CertiFlow to manage candidate batches and participate in a
            transparent digital certification process.
          </p>

          <div className="brand-features">
            <div>
              <ShieldCheck size={20} />
              <span>Secure Registration</span>
            </div>
            <div>
              <UserPlus size={20} />
              <span>Training Centre Access</span>
            </div>
            <div>
              <GraduationCap size={20} />
              <span>Digital Certification Management</span>
            </div>
          </div>
        </div>

        <div className="brand-footer">
          © 2026 CertiFlow. Digital Certification Platform.
        </div>
      </section>

      <section className="login-form-panel">
        <div className="login-form-container">
          <div className="mobile-brand">
            <GraduationCap size={28} />
            <span>CertiFlow</span>
          </div>

          <div className="login-heading">
            <div className="welcome-label">CREATE YOUR ACCOUNT</div>
            <h2>Register your training centre</h2>
            <p>Enter your details to get started with CertiFlow.</p>
          </div>

          <form onSubmit={handleRegister}>
            <div className="login-input-group">
              <label htmlFor="name">Training Centre Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter training centre name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="organization"
                required
              />
            </div>

            <div className="login-input-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="login-input-group">
              <label htmlFor="password">Password</label>

              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <div className="login-input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>

              <div className="password-wrapper">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
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
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="login-security">
            <ShieldCheck size={17} />
            <span>Your account details are securely protected.</span>
          </div>

          <div className="register-login-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;