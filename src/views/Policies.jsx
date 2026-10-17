import { useState } from "react";
import { Link } from "wouter";
import { ATTRIBUTES, LICENSE_PROVIDERS } from "../data/seed.js";
import { useGate } from "../state.jsx";

const MODES = [
  { id: "allowlist", label: "Allowlist", hint: "Only bound wallets may hold" },
  { id: "controlled", label: "Controlled", hint: "Transfers need issuer check" },
  { id: "open_eligible", label: "Open eligible", hint: "Any proved wallet may enter" },
];

export function Policies() {
  const { policies, publishPolicy, publishDraft } = useGate();
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [name, setName] = useState("New SME Note");
  const [asset, setAsset] = useState("NOTE-X · demo");
  const [requireAll, setRequireAll] = useState(["accredited", "kyc_l2"]);
  const [trustedLps, setTrustedLps] = useState(["lp_demo"]);
  const [transferMode, setTransferMode] = useState("allowlist");

  function toggle(list, setList, id) {
    setList((xs) => (xs.includes(id) ? xs.filter((x) => x !== id) : [...xs, id]));
  }

  function submit(e) {
    e.preventDefault();
    if (!requireAll.length || !trustedLps.length) {
      setToast("Need at least one attribute and one LP");
      setTimeout(() => setToast(null), 2200);
      return;
    }
    publishPolicy({ name, asset, requireAll, requireAny: [], trustedLps, transferMode });
    setOpen(false);
    setToast("Policy published");
    setTimeout(() => setToast(null), 2200);
  }

  return (
    <main className="main">
      <div className="page-head">
        <h1>Policies</h1>
        <p>
          Issuer-side eligibility rules for a tokenized asset. Trusted License Providers + required
          attributes + transfer mode. DEMO local state.
        </p>
      </div>

      <div className="desk-layout">
        <div className="panel">
          <div className="panel-head">
            <h2>Asset policies</h2>
            <button type="button" className="btn sm" onClick={() => setOpen((v) => !v)}>
              {open ? "Close form" : "New policy"}
            </button>
          </div>

          {open && (
            <form className="form-grid" onSubmit={submit} style={{ borderBottom: "1px solid var(--line-soft)" }}>
              <div className="field">
                <label htmlFor="pname">Policy name</label>
                <input id="pname" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="field">
                <label htmlFor="asset">Asset label</label>
                <input id="asset" value={asset} onChange={(e) => setAsset(e.target.value)} />
              </div>
              <div className="field">
                <label>Require all attributes</label>
                <div className="opt-grid">
                  {ATTRIBUTES.map((a) => {
                    const on = requireAll.includes(a.id);
                    return (
                      <label key={a.id} className={`opt${on ? " on" : ""}`}>
                        <input
                          type="checkbox"
                          checked={on}
                          onChange={() => toggle(requireAll, setRequireAll, a.id)}
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
              <div className="field">
                <label>Trusted License Providers</label>
                <div className="opt-grid">
                  {LICENSE_PROVIDERS.map((lp) => {
                    const on = trustedLps.includes(lp.id);
                    return (
                      <label key={lp.id} className={`opt${on ? " on" : ""}`}>
                        <input
                          type="checkbox"
                          checked={on}
                          onChange={() => toggle(trustedLps, setTrustedLps, lp.id)}
                        />
                        <span>
                          <strong>{lp.name}</strong>
                          <span>
                            {lp.trust} · {lp.region}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="field">
                <label>Transfer mode</label>
                <div className="opt-grid" style={{ gridTemplateColumns: "1fr" }}>
                  {MODES.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      className={`opt${transferMode === m.id ? " on" : ""}`}
                      onClick={() => setTransferMode(m.id)}
                    >
                      <span>
                        <strong>{m.label}</strong>
                        <span>{m.hint}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" className="btn">
                Publish policy
              </button>
            </form>
          )}

          {policies.map((p) => (
            <article className="card-row" key={p.id}>
              <div>
                <div style={{ display: "flex", gap: "0.45rem", alignItems: "center" }}>
                  <h3>{p.name}</h3>
                  <span className={`pill ${p.status}`}>{p.status}</span>
                </div>
                <div className="mono">
                  {p.asset} · {p.id} · mode={p.transferMode} · {p.holders} holders
                </div>
                <div className="chips">
                  {p.requireAll.map((id) => (
                    <span className="chip" key={id}>
                      {ATTRIBUTES.find((a) => a.id === id)?.label || id}
                    </span>
                  ))}
                </div>
                <div className="mono">
                  LPs:{" "}
                  {p.trustedLps
                    .map((id) => LICENSE_PROVIDERS.find((l) => l.id === id)?.name || id)
                    .join(" · ")}
                </div>
              </div>
              <div className="actions">
                {p.status === "draft" && (
                  <button
                    type="button"
                    className="btn sm"
                    onClick={() => {
                      publishDraft(p.id);
                      setToast("Draft published live");
                      setTimeout(() => setToast(null), 2000);
                    }}
                  >
                    Publish draft
                  </button>
                )}
                <Link href={`/prove?policy=${p.id}`} className="btn sm ghost">
                  Prove against
                </Link>
              </div>
            </article>
          ))}
        </div>

        <aside className="panel">
          <div className="side-stat">
            <div className="label">Policies</div>
            <div className="value">{policies.length}</div>
            <div className="hint">Issuer rulesets</div>
          </div>
          <div className="side-stat">
            <div className="label">Live</div>
            <div className="value">{policies.filter((p) => p.status === "live").length}</div>
            <div className="hint">Accepting proofs</div>
          </div>
          <div className="side-stat">
            <div className="label">Stack</div>
            <div className="value" style={{ fontSize: "1.05rem" }}>
              Citadel
            </div>
            <div className="hint">SP policy · LP trust</div>
          </div>
          <div style={{ padding: "1rem 1.15rem" }}>
            <div className="callout" style={{ background: "var(--steel-soft)" }}>
              Policies map to Citadel Service Provider profiles: which LPs, which attributes /
              predicates, cookie reuse rules.
            </div>
          </div>
        </aside>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}
