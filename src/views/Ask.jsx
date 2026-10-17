import { Link } from "wouter";

export function Ask() {
  return (
    <main className="main">
      <div className="page-head">
        <h1>$8,000 · Development Subsidy</h1>
        <p>
          Milestone grant for Gate Desk on Dusk — investor eligibility studio for Citadel +
          regulated asset workflows.
        </p>
      </div>

      <div className="ask-grid">
        <div className="panel">
          <div className="panel-head">
            <h2>Milestones</h2>
            <span className="demo-tag">Ask</span>
          </div>
          <div className="milestone">
            <div className="amt">M1 · $3,000</div>
            <h3>Demo acceptance + public repo</h3>
            <p>
              Accept this interactive DEMO (Guide → Prove → Gate → Audit). Open-source Apache 2.0
              on GitHub, LICENSE committed, invoice for kickoff. Acceptance = reviewer completes
              deny→fix→bind→revoke gate flip.
            </p>
          </div>
          <div className="milestone">
            <div className="amt">M2 · $5,000</div>
            <h3>Citadel soft-connect + Dusk Connect</h3>
            <p>
              Replace simulated HMAC with Citadel session path on testnet (or documented adapter
              when JS SDK lands); Dusk Connect wallet bind; transfer-gate hook stub; unit tests;
              one-year maintenance plan. Done when: prove against a deployed/test Citadel contract
              or official mock, Connect bind works in browser, CI green.
            </p>
          </div>
          <div className="milestone">
            <div className="amt">Total · $8,000</div>
            <h3>~4–5 weeks solo</h3>
            <p>
              Metrics: guided-demo completion, prove deny/allow rates, gate flip demos, public
              stars/forks, Citadel/Connect issues filed upstream.
            </p>
          </div>
          <div style={{ padding: "1.1rem 1.2rem" }}>
            <Link href="/guide" className="btn">
              Run guided demo
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
            <div className="label">Strategic fit</div>
            <div className="value" style={{ fontSize: "1.1rem" }}>
              FMI / RWA
            </div>
            <div className="hint">Onboarding · Citadel</div>
          </div>
          <div className="side-stat">
            <div className="label">Stage</div>
            <div className="value" style={{ fontSize: "1.1rem" }}>
              MVP / Alpha
            </div>
            <div className="hint">Simulated DEMO</div>
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
        <h2>Impact on Dusk</h2>
        <p className="sub">
          Makes Citadel’s “prove, don’t reveal” clickable for issuers and venues. Shows a transfer
          gate that reacts to revoke — the enforcement story reviewers ask for — without shipping a
          competing Trade or DEX.
        </p>
      </section>

      <section className="section">
        <h2>FAQ</h2>
        <div className="panel faq" style={{ padding: "0 1.15rem" }}>
          <details open>
            <summary>Is the proof real ZK?</summary>
            <p>
              No. This DEMO uses a local simulated signature. M2 targets Citadel’s real session
              path. Labels say “simulated” throughout.
            </p>
          </details>
          <details>
            <summary>Why not Dusk Trade?</summary>
            <p>
              Trade is Dusk’s full product. Gate Desk is the eligibility wedge only — smaller scope,
              clearer demo, Citadel-first.
            </p>
          </details>
          <details>
            <summary>Open source / KYB?</summary>
            <p>
              Apache 2.0 LICENSE in repo. Sole builder can invoice milestones. Repo can be public on
              M1 acceptance.
            </p>
          </details>
        </div>
      </section>
    </main>
  );
}
