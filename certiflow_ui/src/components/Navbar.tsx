import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  LayoutDashboard,
  Upload,
  ShieldCheck,
  LogOut,
  UserCircle,
} from "lucide-react";

interface StoredUser {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
}

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  let user: StoredUser = {};

  try {
    user = JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    user = {};
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const isActive = (path: string) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  return (
    <header className="navbar">
      <Link to="/dashboard" className="navbar-brand">
        <div className="navbar-logo">
          <GraduationCap size={25} />
        </div>
        <span>CertiFlow</span>
      </Link>

      <nav className="navbar-links">
        <Link to="/dashboard" className={isActive("/dashboard")}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </Link>

        <Link to="/upload" className={isActive("/upload")}>
          <Upload size={18} />
          <span>Batch Upload</span>
        </Link>

        <Link to="/verify" className={isActive("/verify")}>
          <ShieldCheck size={18} />
          <span>Verify Certificate</span>
        </Link>
      </nav>

      <div className="navbar-user">
        <UserCircle size={24} />
        <div className="navbar-user-info">
          <span className="navbar-user-name">
            {user.name || "User"}
          </span>
          <span className="navbar-user-role">
            {user.role?.replace(/_/g, " ") || "User"}
          </span>
        </div>

        <button
          className="navbar-logout"
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;