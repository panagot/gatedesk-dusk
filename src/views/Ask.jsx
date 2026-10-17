import { Link } from "wouter";
import { Tip } from "../components/Tooltip.jsx";

export function Ask() {
  return (
    <main className="main">
      <div className="page-head">
        <h1>
          $4,000 · Development Subsidy{" "}
          <Tip label="Smaller ask, sharper delivery: live Connect beta now; Citadel soft-connect as finish." />
        </h1>
        <p>
          Kickoff funds the live beta reviewers can exercise today. Finish funds Citadel/Moat
          soft-connect so prove stops using the policy adapter.
        </p>
      </div>

      <div className="ask-grid">
        <div className="panel">
          <div className="panel-head">
            <h2>Milestones</h2>
            <span className="demo-tag">Ask</span>
          </div>
          <div className="milestone">
            <div className="amt">Kickoff · $1,500</div>
            <h3>Begin — live beta acceptance</h3>
            <p>
              Invoice to start. Acceptance = reviewer completes Guide (deny→fix→Connect bind→gate
              flip) on the hosted desk. Public Apache 2.0 repo + LICENSE.
            </p>
          </div>
          <div className="milestone">
            <div className="amt">Finish · $2,500</div>
            <h3>Done — Citadel soft-connect</h3>
            <p>
              Paid when prove uses a Citadel/Moat protocol session (not HMAC adapter), Connect bind
              still works, transfer-gate hook stub + short tests/CI note. Total grant $4,000.
            </p>
          </div>
          <div className="milestone">
            <div className="amt">Total · $4,000</div>
            <h3>~3–4 weeks solo</h3>
            <p>
              Metrics: guided-beta completion, Connect bind rate, gate flip demos, finish = session
              path live in browser.
            </p>
          </div>
          <div style={{ padding: "1.1rem 1.2rem" }}>
            <Link href="/guide" className="btn">
              Run guided beta
            </Link>
          </div>
        </div>

        <aside className="panel">
          <div className="side-stat">
            <div className="label">Grant type</div>
            <div className="value" style={{ fontSize: "1.1rem" }}>
              Dev subsidy
            </div>
            <div className="hint">Open source · Apache 2.0</div>
          </div>
          <div className="side-stat">
            <div className="label">Kickoff</div>
            <div className="value" style={{ fontSize: "1.35rem" }}>
              $1,500
            </div>
            <div className="hint">To begin</div>
          </div>
          <div className="side-stat">
            <div className="label">Finish</div>
            <div className="value" style={{ fontSize: "1.35rem" }}>
              $2,500
            </div>
            <div className="hint">Once soft-connect ships</div>
          </div>
          <div className="side-stat">
            <div className="label">Contact</div>
            <div className="value" style={{ fontSize: "0.95rem" }}>
              panagiotispollis@gmail.com
            </div>
          </div>
        </aside>
      </div>

      <section className="section">
        <h2>Why this split</h2>
        <p className="sub">
          Kickoff pays for a usable Connect-bound desk. Finish pays only when Citadel is soft-wired —
          no claiming ZK before it exists in-browser.
        </p>
      </section>

      <section className="section">
        <h2>FAQ</h2>
        <div className="panel faq" style={{ padding: "0 1.15rem" }}>
          <details open>
            <summary>Is prove Citadel ZK today?</summary>
            <p>No — policy adapter. Finish milestone replaces it with Moat/Citadel session path.</p>
          </details>
          <details>
            <summary>What is live at kickoff?</summary>
            <p>Dusk Connect bind, hosted Supabase desk, Transfer Gate allow/deny, guided reviewer UI.</p>
          </details>
          <details>
            <summary>Open source / KYB?</summary>
            <p>Apache 2.0 LICENSE in repo. Sole builder can invoice each tranche.</p>
          </details>
        </div>
      </section>
    </main>
  );
}
