import { useMemo, useState } from "react";
import { Link, useSearch } from "wouter";
import { useGate } from "../state.jsx";

export function Gate() {
  const { policies, investors, transfers, attemptTransfer, revokeInvestor, shortWallet } =
    useGate();
  const search = useSearch();
  const demo =
    new URLSearchParams(search.startsWith("?") ? search.slice(1) : search).get(
      "demo"
    ) === "1";

  const live = policies.filter((p) => p.status === "live");
  const bound = investors.filter((i) => i.status === "bound" && i.wallet);

  const [policyId, setPolicyId] = useState(live[0]?.id || "");
  const [wallet, setWallet] = useState(bound[0]?.wallet || "");
  const [amount, setAmount] = useState("100");
  const [last, setLast] = useState(null);
  const [toast, setToast] = useState(null);

  const holdersForPolicy = useMemo(
    () =>
      investors.filter(
        (i) => i.policies.includes(policyId) && i.wallet && i.status !== "proved"
      ),
    [investors, policyId]
  );

  const selected = investors.find((i) => i.wallet === wallet);

  function run() {
    if (!policyId || !wallet) return;
    const row = attemptTransfer({ policyId, wallet, amount });
    setLast(row);
    setToast(row.ok ? "Transfer ALLOWED (simulated)" : "Transfer DENIED");
    setTimeout(() => setToast(null), 2200);
  }

  function revokeThenRetest() {
    if (!selected) return;
    revokeInvestor(selected.id);
    setTimeout(() => {
      const row = attemptTransfer({ policyId, wallet, amount });
      setLast(row);
      setToast("Revoked then re-tested — expect DENY");
      setTimeout(() => setToast(null), 2500);
    }, 100);
  }

  return (
    <main className="main">
      <div className="page-head">
        <h1>Transfer Gate</h1>
        <p>
          Enforce the allowlist: attempt a transfer against a policy. Bound holders pass; revoked
          holders are denied. This is the missing “who enforces this?” demo — still simulated, no
          on-chain token.
        </p>
      </div>

      {demo && (
        <div className="callout" style={{ marginBottom: "1rem" }}>
          <strong>After prove/bind:</strong> Run a transfer (should ALLOW), then “Revoke + re-test”
          to watch the gate flip to DENY.
        </div>
      )}

      <div className="desk-layout">
        <div className="panel">
          <div className="panel-head">
            <h2>Attempt transfer</h2>
            <span className="demo-tag">Simulated</span>
          </div>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="gpol">Asset policy</label>
              <select
                id="gpol"
                value={policyId}
                onChange={(e) => {
                  setPolicyId(e.target.value);
                  setLast(null);
                }}
              >
                {live.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} · mode={p.transferMode}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="gw">From wallet</label>
              <select
                id="gw"
                value={wallet}
                onChange={(e) => {
                  setWallet(e.target.value);
                  setLast(null);
                }}
              >
                <option value="">Select holder…</option>
                {holdersForPolicy.map((i) => (
                  <option key={i.id} value={i.wallet}>
                    {i.label} · {i.status} · {shortWallet(i.wallet || "")}
                  </option>
                ))}
              </select>
              {selected && (
                <div className="hint">
                  Status: {selected.status}
                  {selected.revokedAt ? " (revoked)" : ""}
                </div>
              )}
            </div>
            <div className="field">
              <label htmlFor="amt">Amount (units)</label>
              <input id="amt" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <button type="button" className="btn" onClick={run} disabled={!wallet}>
                Attempt transfer
              </button>
              <button
                type="button"
                className="btn danger"
                onClick={revokeThenRetest}
                disabled={!selected || selected.status === "revoked"}
              >
                Revoke + re-test
              </button>
            </div>

            {last && (
              <div
                className="callout"
                style={{ background: last.ok ? "var(--ok-soft)" : "var(--rust-soft)" }}
              >
                <strong>{last.ok ? "ALLOW" : "DENY"}</strong>
                <div style={{ marginTop: "0.35rem" }}>{last.reason}</div>
                <div className="mono" style={{ marginTop: "0.35rem" }}>
                  {last.ref}
                </div>
              </div>
            )}
          </div>
        </div>

        <aside className="panel">
          <div className="side-stat">
            <div className="label">Attempts</div>
            <div className="value">{transfers.length}</div>
            <div className="hint">Logged to audit</div>
          </div>
          <div style={{ padding: "1rem 1.15rem", fontSize: "0.88rem", color: "var(--ink-soft)" }}>
            M2 would hook this check into a DuskVM / DuskEVM transfer guard. Today the gate is the
            product proof that revoke changes outcomes.
          </div>
          <div style={{ padding: "0 1.15rem 1rem", display: "grid", gap: "0.4rem" }}>
            <Link href="/holders" className="btn ghost sm">
              Holders
            </Link>
            <Link href="/audit" className="btn ghost sm">
              Audit log
            </Link>
          </div>
        </aside>
      </div>

      {transfers.length > 0 && (
        <section className="section">
          <h2>Recent attempts</h2>
          <div className="panel" style={{ overflowX: "auto" }}>
            <table className="audit-table">
              <thead>
                <tr>
                  <th>When</th>
                  <th>Result</th>
                  <th>Wallet</th>
                  <th>Amount</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {transfers.slice(0, 8).map((t) => (
                  <tr key={t.id}>
                    <td className="mono">
                      {new Date(t.at).toLocaleTimeString()}
                    </td>
                    <td>
                      <span className={t.ok ? "action-allow" : "action-revoke"}>
                        {t.ok ? "ALLOW" : "DENY"}
                      </span>
                    </td>
                    <td className="mono">{shortWallet(t.wallet)}</td>
                    <td>{t.amount}</td>
                    <td style={{ color: "var(--ink-soft)" }}>{t.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {toast && (
        <div className="toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </main>
  );
}
