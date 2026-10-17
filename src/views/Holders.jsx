import { useState } from "react";
import { Link } from "wouter";
import { ATTRIBUTES, LICENSE_PROVIDERS } from "../data/seed.js";
import { useGate } from "../state.jsx";

function fmt(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function Holders() {
  const { investors, policies, revokeInvestor, bindWallet } = useGate();
  const [toast, setToast] = useState(null);
  const [filter, setFilter] = useState("all");

  const shown = investors.filter((i) => (filter === "all" ? true : i.status === filter));

  return (
    <main className="main">
      <div className="page-head">
        <h1>Holders</h1>
        <p>
          Bound and proved investors against live policies. Revoke ends transfer rights; audit
          records the event. DEMO allowlist surface.
        </p>
      </div>

      <div className="legend">
        <label>
          Filter{" "}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              marginLeft: 6,
              padding: "0.3rem 0.5rem",
              borderRadius: 8,
              border: "1px solid var(--line)",
            }}
          >
            <option value="all">All</option>
            <option value="bound">Bound</option>
            <option value="proved">Proved</option>
            <option value="revoked">Revoked</option>
          </select>
        </label>
        <span>
          <span className="pill bound">bound</span> wallet linked
        </span>
        <span>
          <span className="pill proved">proved</span> cookie only
        </span>
      </div>

      <div className="desk-layout">
        <div className="panel">
          <div className="panel-head">
            <h2>Investor register</h2>
            <Link href="/prove" className="btn sm">
              Prove new
            </Link>
          </div>
          {shown.length === 0 ? (
            <div className="empty">
              <strong>No investors in this filter</strong>
              Run a proof or clear the filter.
            </div>
          ) : (
            shown.map((inv) => (
              <article className="card-row" key={inv.id}>
                <div>
                  <div style={{ display: "flex", gap: "0.45rem", alignItems: "center" }}>
                    <h3>{inv.label}</h3>
                    <span className={`pill ${inv.status}`}>{inv.status}</span>
                  </div>
                  <div className="mono">
                    {inv.wallet || "no wallet"} · {inv.cookieRef} ·{" "}
                    {LICENSE_PROVIDERS.find((l) => l.id === inv.lpId)?.name || inv.lpId} · proved{" "}
                    {fmt(inv.provedAt)}
                  </div>
                  <div className="chips">
                    {inv.attributes.map((id) => (
                      <span className="chip" key={id}>
                        {ATTRIBUTES.find((a) => a.id === id)?.label || id}
                      </span>
                    ))}
                  </div>
                  <div className="mono">
                    Policies:{" "}
                    {inv.policies
                      .map((pid) => policies.find((p) => p.id === pid)?.name || pid)
                      .join(" · ") || "—"}
                  </div>
                </div>
                <div className="actions">
                  {inv.status === "proved" && (
                    <button
                      type="button"
                      className="btn sm ghost"
                      onClick={() => {
                        bindWallet(inv.id, "dusk1qauto…bound");
                        setToast("Wallet auto-bound (DEMO)");
                        setTimeout(() => setToast(null), 2000);
                      }}
                    >
                      Bind wallet
                    </button>
                  )}
                  {inv.status !== "revoked" && (
                    <button
                      type="button"
                      className="btn sm danger"
                      onClick={() => {
                        revokeInvestor(inv.id);
                        setToast("Eligibility revoked");
                        setTimeout(() => setToast(null), 2000);
                      }}
                    >
                      Revoke
                    </button>
                  )}
                </div>
              </article>
            ))
          )}
        </div>

        <aside className="panel">
          <div className="side-stat">
            <div className="label">Bound</div>
            <div className="value">
              {investors.filter((i) => i.status === "bound").length}
            </div>
            <div className="hint">Can hold gated assets</div>
          </div>
          <div className="side-stat">
            <div className="label">Proved only</div>
            <div className="value">
              {investors.filter((i) => i.status === "proved").length}
            </div>
            <div className="hint">Awaiting wallet bind</div>
          </div>
          <div className="side-stat">
            <div className="label">Revoked</div>
            <div className="value">
              {investors.filter((i) => i.status === "revoked").length}
            </div>
            <div className="hint">Transfers denied</div>
          </div>
        </aside>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}
