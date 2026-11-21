import { useState } from "react";
import { Link } from "react-router-dom";
import { Upload, FileSpreadsheet, Download, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";

function BatchUpload() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const extension = selectedFile.name.split(".").pop()?.toLowerCase();

      if (!["csv", "xlsx", "xls"].includes(extension || "")) {
        alert("Please select a CSV or Excel file.");
        event.target.value = "";
        return;
      }

      setFile(selectedFile);
    }
  };

  return (
    <>
      <Navbar />

      <main className="page-container">
        <div className="page-header">
          <div>
            <Link to="/dashboard" className="back-link">
              <ArrowLeft size={17} /> Back to Dashboard
            </Link>
            <h1>Upload Candidate Batch</h1>
            <p>Upload candidate information using an Excel or CSV file.</p>
          </div>
        </div>

        <section className="card upload-card">
          <div className="upload-heading">
            <div className="upload-heading-icon">
              <FileSpreadsheet size={26} />
            </div>
            <div>
              <h2>Candidate Spreadsheet</h2>
              <p>Select your prepared candidate spreadsheet.</p>
            </div>
          </div>

          <label className="upload-dropzone">
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              hidden
            />

            <div className="upload-icon">
              <Upload size={30} />
            </div>

            <h3>Click to browse your files</h3>
            <p>Supported formats: CSV, XLS, XLSX</p>
            <span className="btn btn-secondary">Choose File</span>
          </label>

          {file && (
            <div className="selected-file">
              <FileSpreadsheet size={22} />
              <div>
                <strong>{file.name}</strong>
                <p>{(file.size / 1024).toFixed(2)} KB</p>
              </div>
              <button
                className="btn btn-secondary"
                onClick={() => setFile(null)}
              >
                Remove
              </button>
            </div>
          )}

          <div className="upload-note">
            <h3>Important Instructions</h3>
            <ul>
              <li>Ensure all candidate details are entered correctly.</li>
              <li>Use the approved spreadsheet format.</li>
              <li>Invalid records must be corrected before submission.</li>
              <li>All candidate records will be validated before processing.</li>
            </ul>
          </div>

          <button
            className="btn btn-primary upload-submit"
            disabled={!file}
            onClick={() =>
              alert("File selected successfully. Batch upload API is not connected yet.")
            }
          >
            <Upload size={18} />
            Submit Batch
          </button>
        </section>
      </main>
    </>
  );
}

export default BatchUpload;