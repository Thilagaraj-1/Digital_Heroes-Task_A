import "./LeadTable.css";

const STATUS_OPTIONS = ["New", "Contacted", "Closed"];

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function LeadTable({ leads, onStatusChange, updatingId }) {
  if (leads.length === 0) {
    return (
      <div className="lead-table__empty">
        <p>No leads match your search yet.</p>
      </div>
    );
  }

  return (
    <div className="lead-table__wrapper">
      <table className="lead-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Budget</th>
            <th>Message</th>
            <th>Received</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td data-label="Name">{lead.name}</td>
              <td data-label="Email">{lead.email}</td>
              <td data-label="Budget">
                <span className="lead-table__budget">{lead.budget}</span>
              </td>
              <td data-label="Message" className="lead-table__message">
                {lead.message}
              </td>
              <td data-label="Received">{formatDate(lead.createdAt)}</td>
              <td data-label="Status">
                <select
                  className={`lead-table__status lead-table__status--${lead.status.toLowerCase()}`}
                  value={lead.status}
                  disabled={updatingId === lead._id}
                  onChange={(e) => onStatusChange(lead._id, e.target.value)}
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadTable;
