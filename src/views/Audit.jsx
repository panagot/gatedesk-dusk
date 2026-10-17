import { useState } from "react";
import { useGate } from "../state.jsx";

function fmt(iso) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function Audit() {
  const { audit } = useGate();
  const [filter, setFilter] = useState("all");
  const shown = audit.filter((r) => (filter === "all" ? true : r.action === filter));

  return (
    <main className="main">
      <div className="page-head">
        <h1>Audit log</h1>
        <p>
          Policy publishes, proves, binds, allows, and revokes — the compliance trail venues and
          supervisors expect. DEMO refs stand in for on-chain session / tx ids.
        </p>
      </div>

      <div className="legend">
        {["all", "policy", "prove", "bind", "allow", "revoke"].map((f) => (
          <button
            key={f}
            type="button"
            className={`btn sm${filter === f ? "" : " ghost"}`}
            onClick={() => setFilter(f)}
          >
            {f}
            {f !== "all" ? ` (${audit.filter((a) => a.action === f).length})` : ""}
          </button>
        ))}
      </div>

      <div className="callout" style={{ marginBottom: "1rem" }}>
        <strong>For reviewers:</strong> Prove that eligibility can be audited without putting
        investor PII on the public ledger. Gate Desk logs the event; Citadel keeps attributes
        private.
      </div>

      <div className="panel" style={{ overflowX: "auto" }}>
        <table className="audit-table">
          <thead>
            <tr>
              <th>When</th>
              <th>Action</th>
              <th>Actor</th>
              <th>Detail</th>
              <th>Ref</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((row) => (
              <tr key={row.id}>
                <td className="mono">{fmt(row.at)}</td>
                <td>
                  <span className={`action-${row.action}`}>{row.action}</span>
                </td>
                <td>{row.actor}</td>
                <td style={{ color: "var(--ink-soft)", maxWidth: 360 }}>{row.detail}</td>
                <td className="mono">{row.ref}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
