import { useState } from "react";
import {
  ShieldCheck,
  Search,
  GraduationCap,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState("");

  const handleVerify = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!certificateId.trim()) {
      return;
    }

    alert("Certificate verification API is not connected yet.");
  };

  return (
    <main className="verify-page">
      <header className="verify-header">
        <Link to="/login" className="navbar-brand">
          <div className="navbar-logo">
            <GraduationCap size={25} />
          </div>
          <span>CertiFlow</span>
        </Link>

        <Link to="/login" className="back-link">
          <ArrowLeft size={17} /> Login
        </Link>
      </header>

      <section className="verify-container">
        <div className="verify-icon">
          <ShieldCheck size={38} />
        </div>

        <span className="welcome-label">PUBLIC VERIFICATION PORTAL</span>

        <h1>Verify Certificate</h1>

        <p>
          Verify the authenticity and current status of a skill development
          certificate using its unique certificate ID.
        </p>

        <form onSubmit={handleVerify}>
          <label htmlFor="certificateId">Certificate ID</label>

          <div className="verify-input">
            <input
              id="certificateId"
              type="text"
              placeholder="Enter certificate ID"
              value={certificateId}
              onChange={(event) => setCertificateId(event.target.value)}
              required
            />

            <button type="submit" className="btn btn-primary">
              <Search size={18} />
              Verify
            </button>
          </div>
        </form>

        <div className="verify-security">
          <ShieldCheck size={18} />
          <span>Secure certificate verification powered by CertiFlow.</span>
        </div>
      </section>

      <footer className="verify-footer">
        © 2026 CertiFlow. Digital Certification Platform.
      </footer>
    </main>
  );
}

export default VerifyCertificate;