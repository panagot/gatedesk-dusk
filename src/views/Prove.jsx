import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { ConnectBind } from "../components/ConnectBind.jsx";
import { ATTRIBUTES, LICENSE_PROVIDERS, LP_PROFILES } from "../data/seed.js";
import { useGate } from "../state.jsx";
import { verifyLicense } from "../lib/simCrypto.js";

const STEPS = [
  { id: 1, label: "Policy + LP" },
  { id: 2, label: "Issue license" },
  { id: 3, label: "SP verify" },
  { id: 4, label: "Bind wallet" },
];

export function Prove() {
  const {
    policies,
    issueLicense,
    proveWithLicense,
    bindWallet,
    evaluatePolicy,
  } = useGate();
  const [, setLoc] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(
    search.startsWith("?") ? search.slice(1) : search
  );
  const guide = params.get("guide") === "1";
  const policyFromUrl = params.get("policy");

  const livePolicies = useMemo(
    () => policies.filter((p) => p.status === "live"),
    [policies]
  );

  const [step, setStep] = useState(1);
  const [policyId, setPolicyId] = useState(
    policyFromUrl && livePolicies.some((p) => p.id === policyFromUrl)
      ? policyFromUrl
      : livePolicies[0]?.id || ""
  );
  const [lpId, setLpId] = useState(guide ? "lp_demo" : "lp_npex");
  const [profileId, setProfileId] = useState(
    guide ? "missing_accredited" : "full_eu"
  );
  const [license, setLicense] = useState(null);
  const [result, setResult] = useState(null);
  const [wallet, setWallet] = useState("");
  const [bindMeta, setBindMeta] = useState({ viaConnect: false });
  const [toast, setToast] = useState(null);
  const [busy, setBusy] = useState(false);

  const policy = policies.find((p) => p.id === policyId);
  const profile = LP_PROFILES.find((p) => p.id === profileId);

  function flash(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  }

  function onIssue() {
    if (!profile) return;
    setBusy(true);
    setTimeout(() => {
      const lic = issueLicense({
        lpId,
        attributes: profile.attributes,
        subject: `investor_${Date.now().toString(36)}`,
      });
      setLicense(lic);
      setResult(null);
      setStep(3);
      setBusy(false);
      flash("LP license issued (policy adapter)");
    }, 450);
  }

  function onVerify() {
    if (!license || !policyId) return;
    setBusy(true);
    setTimeout(() => {
      const r = proveWithLicense({
        policyId,
        license,
        label: `Investor ${license.subject.slice(-5)}`,
      });
      setResult(r);
      setBusy(false);
      if (r.ok) {
        setStep(4);
        flash("Session cookie issued");
      } else {
        flash("SP denied — fix license profile or LP");
      }
    }, 500);
  }

  function onBind() {
    if (!result?.ok || !result.investor) return;
    if (!wallet) {
      flash("Connect a Dusk wallet (or paste an account id)");
      return;
    }
    const r = bindWallet(result.investor.id, wallet, bindMeta);
    if (!r.ok) {
      flash(r.error || "Bind failed");
      return;
    }
    flash(bindMeta.viaConnect ? "Bound via Dusk Connect" : "Bound (manual account)");
    setTimeout(() => setLoc("/gate?demo=1"), 700);
  }

  const preview = license && policy ? evaluatePolicy(policy, license) : null;

  return (
    <main className="main">
      <div className="page-head">
        <h1>Prove eligibility</h1>
        <p>
          Live beta: LP issues a policy-adapter license → SP verifies → session cookie →{" "}
          <strong>bind with Dusk Connect</strong>. Citadel ZK soft-connect is the grant M2 path — not
          claimed here.
        </p>
      </div>

      {guide && (
        <div className="callout" style={{ marginBottom: "1rem" }}>
          <strong>Guided path:</strong> Step 2 starts with a profile that{" "}
          <em>fails</em> accredited. Issue → verify (deny) → switch to “Full eligible” → re-issue →
          verify → bind → Transfer Gate.
        </div>
      )}

      <ol className="stage-rail" aria-label="Prove stages">
        {STEPS.map((s) => (
          <li key={s.id} className={step === s.id ? "on" : step > s.id ? "done" : ""}>
            <span className="sn">{s.id}</span>
            {s.label}
          </li>
        ))}
      </ol>

      <div className="desk-layout">
        <div className="panel">
          {step === 1 && (
            <div className="form-grid">
              <div className="panel-head" style={{ margin: "-1.2rem -1.2rem 0", border: "none" }}>
                <h2>1 · Choose policy + LP</h2>
                <span className="demo-tag">Live beta</span>
              </div>
              <div className="field">
                <label htmlFor="policy">Policy (Service Provider rules)</label>
                <select
                  id="policy"
                  value={policyId}
                  onChange={(e) => setPolicyId(e.target.value)}
                >
                  {livePolicies.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.asset}
                    </option>
                  ))}
                </select>
                {policy && (
                  <div className="hint">
                    Require all:{" "}
                    {policy.requireAll.map((id) => ATTRIBUTES.find((a) => a.id === id)?.label).join(", ")}
                    {policy.requireAny?.length
                      ? ` · one of: ${policy.requireAny.map((id) => ATTRIBUTES.find((a) => a.id === id)?.label).join(" / ")}`
                      : ""}
                  </div>
                )}
              </div>
              <div className="field">
                <label htmlFor="lp">License Provider</label>
                <select id="lp" value={lpId} onChange={(e) => setLpId(e.target.value)}>
                  {LICENSE_PROVIDERS.map((lp) => (
                    <option key={lp.id} value={lp.id}>
                      {lp.name} ({lp.trust})
                      {policy && !policy.trustedLps.includes(lp.id) ? " — NOT TRUSTED" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <button type="button" className="btn" onClick={() => setStep(2)} disabled={!policyId}>
                Continue to issue license
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="form-grid">
              <div className="panel-head" style={{ margin: "-1.2rem -1.2rem 0", border: "none" }}>
                <h2>2 · LP issues license</h2>
                <button type="button" className="btn sm ghost" onClick={() => setStep(1)}>
                  Back
                </button>
              </div>
              <p style={{ margin: 0, color: "var(--ink-soft)", fontSize: "0.9rem" }}>
                Pick what the LP verified off-chain. Attributes are sealed into a simulated signed
                license — you cannot tick them yourself at verify time.
              </p>
              <div className="field">
                <label>KYC outcome profile</label>
                <div className="opt-grid">
                  {LP_PROFILES.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className={`opt${profileId === p.id ? " on" : ""}`}
                      onClick={() => setProfileId(p.id)}
                    >
                      <span>
                        <strong>{p.label}</strong>
                        <span>{p.detail}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="chips">
                {(profile?.attributes || []).map((id) => (
                  <span className="chip" key={id}>
                    {ATTRIBUTES.find((a) => a.id === id)?.label || id}
                  </span>
                ))}
              </div>
              <button type="button" className="btn" onClick={onIssue} disabled={busy}>
                {busy ? "Signing…" : "Issue simulated license"}
              </button>
            </div>
          )}

          {step >= 3 && license && (
            <div className="form-grid">
              <div className="panel-head" style={{ margin: "-1.2rem -1.2rem 0", border: "none" }}>
                <h2>3 · SP verifies</h2>
                <span className="demo-tag">Sig check</span>
              </div>
              <div className="license-card">
                <div className="mono">id {license.id}</div>
                <div>
                  <strong>LP</strong>{" "}
                  {LICENSE_PROVIDERS.find((l) => l.id === license.lpId)?.name}
                </div>
                <div className="mono">sig {license.signature}</div>
                <div className="mono">
                  verifyLicense = {verifyLicense(license) ? "true" : "false"}
                </div>
                <div className="chips">
                  {license.attributes.map((id) => (
                    <span className="chip" key={id}>
                      {ATTRIBUTES.find((a) => a.id === id)?.label || id}
                    </span>
                  ))}
                </div>
              </div>

              {preview && !preview.ok && !result?.ok && (
                <div className="callout" style={{ background: "var(--rust-soft)" }}>
                  <strong>Would deny:</strong> {preview.reasons.join("; ")}
                </div>
              )}

              {result && !result.ok && (
                <div className="callout" style={{ background: "var(--rust-soft)" }}>
                  <strong>Denied.</strong> {(result.reasons || []).join("; ")}
                  <div style={{ marginTop: "0.65rem" }}>
                    <button
                      type="button"
                      className="btn sm"
                      onClick={() => {
                        setProfileId("full_eu");
                        setLpId(
                          policy?.trustedLps?.includes("lp_npex")
                            ? "lp_npex"
                            : policy?.trustedLps?.[0] || "lp_demo"
                        );
                        setLicense(null);
                        setResult(null);
                        setStep(2);
                      }}
                    >
                      Fix: use full eligible profile
                    </button>
                  </div>
                </div>
              )}

              {result?.ok && (
                <div className="callout" style={{ background: "var(--ok-soft)" }}>
                  <strong>Accepted.</strong> Cookie {result.cookieRef}. Attributes stay off-ledger.
                </div>
              )}

              {!result?.ok && (
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  <button type="button" className="btn" onClick={onVerify} disabled={busy}>
                    {busy ? "Verifying…" : "Run SP verify"}
                  </button>
                  <button
                    type="button"
                    className="btn ghost"
                    onClick={() => {
                      setLicense(null);
                      setResult(null);
                      setStep(2);
                    }}
                  >
                    Re-issue license
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 4 && result?.ok && (
            <div className="form-grid" style={{ borderTop: "1px solid var(--line-soft)" }}>
              <div className="panel-head" style={{ margin: "-1.2rem -1.2rem 0", border: "none" }}>
                <h2>4 · Bind with Dusk Connect</h2>
                <span className="demo-tag">Live</span>
              </div>
              <ConnectBind
                value={wallet}
                onChange={(v) => {
                  setWallet(v);
                  setBindMeta((m) => ({ ...m, viaConnect: false }));
                }}
                onConnected={(r) => {
                  setBindMeta({
                    viaConnect: true,
                    providerName: r.providerName,
                    chainId: r.chainId,
                  });
                }}
              />
              <button type="button" className="btn" onClick={onBind} disabled={!wallet}>
                Bind + open Transfer Gate
              </button>
            </div>
          )}
        </div>

        <aside className="panel">
          <div className="side-stat">
            <div className="label">Stage</div>
            <div className="value" style={{ fontSize: "1.2rem" }}>
              {step} / 4
            </div>
            <div className="hint">Connect bind · policy adapter</div>
          </div>
          <div style={{ padding: "1rem 1.15rem", fontSize: "0.88rem", color: "var(--ink-soft)" }}>
            Live today: Dusk Connect account bind + hosted desk sync. Prove uses a policy-adapter
            license (not Citadel ZK). M2 replaces the adapter with Moat/Citadel soft-connect.
          </div>
          <div style={{ padding: "0 1.15rem 1.15rem" }}>
            <Link href="/guide" className="btn ghost sm" style={{ width: "100%" }}>
              Open guided demo
            </Link>
          </div>
        </aside>
      </div>

      {toast && (
        <div className="toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </main>
  );
}
