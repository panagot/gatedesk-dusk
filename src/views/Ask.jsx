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
            <h3>Kickoff on demo acceptance</h3>
            <p>
              This live kit: Policies, Prove, Holders, Audit, Spec. Private GitHub + Vercel. KYB /
              invoice-ready sole builder.
            </p>
          </div>
          <div className="milestone">
            <div className="amt">M2 · $5,000</div>
            <h3>Citadel + Dusk Connect soft-connect</h3>
            <p>
              Wire prove/bind to Citadel session path and Dusk Connect wallet discovery; public
              polish; one-year maintenance plan for repos.
            </p>
          </div>
          <div className="milestone">
            <div className="amt">Total · $8,000</div>
            <h3>Under $20k threshold</h3>
            <p>
              Quantifiable: policies, prove success rate, bound wallets, audit completeness —
              without needing institutional TVL claims on day one.
            </p>
          </div>
          <div style={{ padding: "1.1rem 1.2rem" }}>
            <Link href="/policies" className="btn">
              Try policies
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
            <div className="hint">Onboarding · Citadel · Trade adjacent</div>
          </div>
          <div className="side-stat">
            <div className="label">Stage</div>
            <div className="value" style={{ fontSize: "1.1rem" }}>
              MVP / Alpha
            </div>
            <div className="hint">Working DEMO</div>
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
          Makes Citadel’s “prove, don’t reveal” usable for issuers and venues waiting on Dusk Trade.
          Increases developer engagement around identity + wallet bind; prepares gated holders for
          EURQ settlement legs with NPEX / Quantoz-style workflows — without shipping another DEX.
        </p>
      </section>

      <section className="section">
        <h2>FAQ</h2>
        <div className="panel faq" style={{ padding: "0 1.15rem" }}>
          <details open>
            <summary>Why not build Dusk Trade itself?</summary>
            <p>
              Trade is Dusk’s product. Gate Desk is the eligibility wedge: smaller scope, clearer
              demo, Citadel-first. It can feed Trade later.
            </p>
          </details>
          <details>
            <summary>Is this real KYC?</summary>
            <p>
              No. DEMO claims attributes locally. M2 targets Citadel proofs; actual LP KYC stays
              with licensed providers.
            </p>
          </details>
          <details>
            <summary>KYB ready?</summary>
            <p>
              Sole builder can invoice for milestone payments. Open-source Apache 2.0 on the private
              repo to be opened or dual-licensed as required.
            </p>
          </details>
          <details>
            <summary>Maintenance?</summary>
            <p>
              Final milestone includes a one-year maintenance plan for delivered repositories, per
              Dusk grant requirements.
            </p>
          </details>
        </div>
      </section>
    </main>
  );
}
