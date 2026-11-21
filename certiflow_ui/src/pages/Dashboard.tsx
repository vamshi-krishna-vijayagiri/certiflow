import { Link } from "react-router-dom";
import {
  Upload,
  Users,
  FileCheck,
  Clock,
  ArrowRight,
  GraduationCap,
  ClipboardList,
} from "lucide-react";
import Navbar from "../components/Navbar";

function Dashboard() {
  const stats = [
    {
      title: "Total Batches",
      value: "0",
      description: "Batches uploaded",
      icon: <ClipboardList size={23} />,
    },
    {
      title: "Total Candidates",
      value: "0",
      description: "Candidates registered",
      icon: <Users size={23} />,
    },
    {
      title: "Certificates Issued",
      value: "0",
      description: "Successfully certified",
      icon: <FileCheck size={23} />,
    },
    {
      title: "Pending Reviews",
      value: "0",
      description: "Awaiting approval",
      icon: <Clock size={23} />,
    },
  ];

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <>
      <Navbar />

      <main className="page-container">
        <section className="page-header">
          <div>
            <h1>Welcome back, {user.name || "User"}!</h1>
            <p>Here's an overview of your certification activities.</p>
          </div>

          <Link to="/upload" className="btn btn-primary">
            <Upload size={18} />
            Upload New Batch
          </Link>
        </section>

        <section className="dashboard-stats">
          {stats.map((stat) => (
            <div className="card dashboard-stat-card" key={stat.title}>
              <div className="dashboard-stat-icon">{stat.icon}</div>
              <div>
                <p>{stat.title}</p>
                <h2>{stat.value}</h2>
                <span>{stat.description}</span>
              </div>
            </div>
          ))}
        </section>

        <section className="dashboard-content">
          <div className="card dashboard-main-card">
            <div className="section-heading">
              <div>
                <h2>Recent Batches</h2>
                <p>Track your recently uploaded batches.</p>
              </div>
              <Link to="/upload" className="text-link">
                Upload Batch <ArrowRight size={16} />
              </Link>
            </div>

            <div className="empty-state">
              <ClipboardList size={42} />
              <h3>No batches uploaded yet</h3>
              <p>Start by uploading your first candidate batch.</p>
              <Link to="/upload" className="btn btn-primary">
                <Upload size={17} /> Upload Batch
              </Link>
            </div>
          </div>

          <div className="card dashboard-side-card">
            <div className="section-heading">
              <h2>Quick Actions</h2>
            </div>

            <Link to="/upload" className="quick-action">
              <div className="quick-action-icon">
                <Upload size={20} />
              </div>
              <div>
                <h3>Upload Candidate Batch</h3>
                <p>Submit candidate details for certification.</p>
              </div>
              <ArrowRight size={18} />
            </Link>

            <Link to="/verify" className="quick-action">
              <div className="quick-action-icon">
                <FileCheck size={20} />
              </div>
              <div>
                <h3>Verify Certificate</h3>
                <p>Check certificate authenticity.</p>
              </div>
              <ArrowRight size={18} />
            </Link>

            <div className="dashboard-info">
              <GraduationCap size={24} />
              <div>
                <h3>CertiFlow</h3>
                <p>Transparent and secure digital certification.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Dashboard;