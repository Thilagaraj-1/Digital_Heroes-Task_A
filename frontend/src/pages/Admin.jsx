import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { getLeads, updateLeadStatus } from "../api/api.js";
import LeadTable from "../components/LeadTable.jsx";
import Footer from "../components/Footer.jsx";
import "./Admin.css";

function Admin() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchLeads = useCallback(async (searchTerm) => {
    setLoading(true);
    setError("");
    try {
      const res = await getLeads(searchTerm);
      setLeads(res.data.data);
    } catch (err) {
      setError("Could not load leads. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchLeads(search);
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, fetchLeads]);

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id);
    const previousLeads = leads;

    setLeads((prev) =>
      prev.map((lead) => (lead._id === id ? { ...lead, status } : lead))
    );

    try {
      await updateLeadStatus(id, status);
    } catch (err) {
      setLeads(previousLeads);
      setError("Could not update status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="admin">
      <div className="container admin__inner">
        <div className="admin__header">
          <div>
            <span className="admin__eyebrow">Admin</span>
            <h1>Leads desk</h1>
            <p>Track every submission and move it through your pipeline.</p>
          </div>
          <Link to="/" className="admin__back-link">
            ← Back to landing page
          </Link>
        </div>

        <div className="admin__toolbar">
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin__search"
          />
          <span className="admin__count">
            {leads.length} lead{leads.length === 1 ? "" : "s"}
          </span>
        </div>

        {error && <p className="admin__error">{error}</p>}

        {loading ? (
          <div className="admin__loading">Loading leads...</div>
        ) : (
          <LeadTable
            leads={leads}
            onStatusChange={handleStatusChange}
            updatingId={updatingId}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Admin;
