import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { ATTRIBUTES, LICENSE_PROVIDERS } from "../data/seed.js";
import { useGate } from "../state.jsx";

export function Prove() {
  const { policies, proveEligibility, bindWallet } = useGate();
  const [, setLoc] = useLocation();
  const livePolicies = useMemo(
    () => policies.filter((p) => p.status === "live"),
    [policies]
  );
  const [policyId, setPolicyId] = useState(livePolicies[0]?.id || "");
  const [lpId, setLpId] = useState("lp_demo");
  const [attrs, setAttrs] = useState(["accredited", "kyc_l2", "jurisdiction_eu", "pep_clear"]);
  const [result, setResult] = useState(null);
  const [wallet, setWallet] = useState("dusk1qdemo…gate");
  const [toast, setToast] = useState(null);

  const policy = policies.find((p) => p.id === policyId);

  function toggleAttr(id) {
    setAttrs((xs) => (xs.includes(id) ? xs.filter((x) => x !== id) : [...xs, id]));
  }

  function onProve(e) {
    e.preventDefault();
    const r = proveEligibility({
      policyId,
      lpId,
      attributes: attrs,
      label: `Investor · session`,
    });
    setResult(r);
    if (r.ok) {
      setToast("Eligibility proved · DEMO cookie issued");
      setTimeout(() => setToast(null), 2200);
    }
  }

  function onBind() {
    if (!result?.ok || !result.investor) return;
    bindWallet(result.investor.id, wallet);
    setToast("Wallet bound · holder active");
    setTimeout(() => {
      setToast(null);
      setLoc("/holders");
    }, 900);
  }

  return (
    <main className="main">
      <div className="page-head">
        <h1>Prove eligibility</h1>
        <p>
          Investor path: pick a policy, claim attributes (DEMO), select a License Provider, issue a
          Citadel-style session cookie. Bind a wallet when the proof passes.
        </p>
      </div>

      <div className="desk-layout">
        <form className="panel" onSubmit={onProve}>
          <div className="panel-head">
            <h2>Proof request</h2>
            <span className="demo-tag">ZK demo</span>
          </div>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="policy">Against policy</label>
              <select
                id="policy"
                value={policyId}
                onChange={(e) => {
                  setPolicyId(e.target.value);
                  setResult(null);
                }}
              >
                {livePolicies.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.asset}
                  </option>
                ))}
              </select>
              {policy && (
                <div className="hint">
                  Requires:{" "}
                  {policy.requireAll
                    .map((id) => ATTRIBUTES.find((a) => a.id === id)?.label || id)
                    .join(", ")}
                </div>
              )}
            </div>

            <div className="field">
              <label htmlFor="lp">License Provider</label>
              <select id="lp" value={lpId} onChange={(e) => setLpId(e.target.value)}>
                {LICENSE_PROVIDERS.map((lp) => (
                  <option key={lp.id} value={lp.id}>
                    {lp.name} ({lp.trust})
                  </option>
                ))}
              </select>
              <div className="hint">Must be in the policy’s trusted LP list.</div>
            </div>

            <div className="field">
              <label>Claimed attributes (off-chain)</label>
              <div className="opt-grid">
                {ATTRIBUTES.map((a) => {
                  const on = attrs.includes(a.id);
                  return (
                    <label key={a.id} className={`opt${on ? " on" : ""}`}>
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() => toggleAttr(a.id)}
                      />
                      <span>
                        <strong>{a.label}</strong>
                        <span>{a.detail}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <button type="submit" className="btn" disabled={!policyId}>
              Generate DEMO proof
            </button>

            {result && !result.ok && (
              <div className="callout" style={{ background: "var(--rust-soft)" }}>
                <strong>Proof denied.</strong> Missing or untrusted:{" "}
                {(result.missing || []).join(", ")}. Adjust attributes or LP and retry.
              </div>
            )}

            {result?.ok && (
              <div className="callout" style={{ background: "var(--ok-soft)" }}>
                <strong>Proof accepted.</strong> Cookie {result.investor.cookieRef}. Attributes were
                not written on-chain (DEMO). Bind a wallet to become a holder.
              </div>
            )}
          </div>
        </form>

        <aside className="panel">
          <div className="side-stat">
            <div className="label">Citadel step</div>
            <div className="value" style={{ fontSize: "1.1rem" }}>
              Session
            </div>
            <div className="hint">Prove license · SP policy</div>
          </div>
          <div style={{ padding: "1rem 1.15rem", borderBottom: "1px solid var(--line-soft)" }}>
            <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--ink-soft)" }}>
              On mainnet this becomes: LP issues encrypted license → user proves on-chain → SP
              receives cookie → Gate Desk decides access.
            </p>
          </div>
          {result?.ok && (
            <div className="form-grid">
              <div className="field">
                <label htmlFor="wallet">Bind Dusk wallet</label>
                <input
                  id="wallet"
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                />
                <div className="hint">Milestone 2: Dusk Connect discovery.</div>
              </div>
              <button type="button" className="btn" onClick={onBind}>
                Bind wallet
              </button>
            </div>
          )}
        </aside>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}
