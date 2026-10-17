import { Link } from "wouter";
import { WORKFLOW } from "../data/seed.js";
import { useGate } from "../state.jsx";

export function Home() {
  const { policies, investors, audit, resetDemo } = useGate();
  const live = policies.filter((p) => p.status === "live").length;
  const bound = investors.filter((i) => i.status === "bound").length;

  return (
    <main className="main">
      <section className="hero">
        <div>
          <div className="hero-kicker">
            <span className="demo-tag">DEMO</span>
            Dusk · Citadel · FMI
          </div>
          <h1>Gate Desk</h1>
          <p className="tagline">Prove you may hold the asset — without putting PII on-chain.</p>
          <p className="lede">
            Investor eligibility studio for regulated digital assets on Dusk. Issuers set policy; a
            License Provider issues a simulated signed credential; Gate Desk verifies and binds a
            wallet; the Transfer Gate enforces allow / deny after revoke.
          </p>
          <div className="hero-actions">
            <Link href="/guide" className="btn">
              Start guided demo
            </Link>
            <Link href="/prove" className="btn ghost">
              Prove eligibility
            </Link>
            <Link href="/gate" className="btn ghost">
              Transfer Gate
            </Link>
          </div>
        </div>

        <aside className="hero-panel" aria-label="Workflow preview">
          <div className="hero-panel-head">
            <span>Onboarding flow</span>
            <span className="demo-tag">Simulated</span>
          </div>
          {WORKFLOW.map((s) => (
            <div className="flow-row" key={s.n}>
              <span className="n">{s.n}</span>
              <div>
                <strong>{s.title}</strong>
                <span>{s.body}</span>
              </div>
            </div>
          ))}
        </aside>
      </section>

      <div className="stat-strip">
        <div>
          <div className="label">Live policies</div>
          <div className="value">{live}</div>
        </div>
        <div>
          <div className="label">Bound holders</div>
          <div className="value">{bound}</div>
        </div>
        <div>
          <div className="label">Audit events</div>
          <div className="value">{audit.length}</div>
        </div>
        <div>
          <div className="label">Ask</div>
          <div className="value" style={{ fontSize: "1.25rem" }}>
            $8k
          </div>
        </div>
      </div>

      <section className="section">
        <h2>Why this exists</h2>
        <p className="sub">
          Dusk’s market workflow starts with issuer rules and investor onboarding — before trading
          or DvP. Citadel can prove a license without revealing attributes; Gate Desk is the
          issuer/venue studio: policy, simulated license, verify, bind, and a transfer gate that
          flips on revoke.
        </p>
        <div className="grid-3">
          <article className="feature">
            <h3>Policy first</h3>
            <p>Require accredited + KYC L2 + jurisdiction. Trust specific License Providers only.</p>
          </article>
          <article className="feature">
            <h3>Signed license (sim)</h3>
            <p>LP issues a credential with a DEMO signature — not self-ticked checkboxes at verify.</p>
          </article>
          <article className="feature">
            <h3>Gate enforces</h3>
            <p>Attempt transfer → ALLOW. Revoke → DENY. Audit records both.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <h2>DEMO boundaries</h2>
        <div className="callout">
          <strong>Honest scope:</strong> No live Citadel ZK, no mainnet txs, no real KYC. Signatures
          are local HMAC-style stubs. State persists in localStorage — use Reset on the Guide page
          if needed.
        </div>
        <div className="hero-actions" style={{ marginTop: "1rem" }}>
          <Link href="/spec" className="btn ghost">
            Integration spec
          </Link>
          <Link href="/ask" className="btn ghost">
            $8,000 ask
          </Link>
          <button
            type="button"
            className="btn ghost"
            onClick={() => {
              resetDemo();
              window.location.href = "/guide";
            }}
          >
            Reset demo
          </button>
        </div>
      </section>

      <div className="cta-band">
        <div>
          <h2>Reviewer path</h2>
          <p>Guide → deny then fix → bind → Transfer Gate allow/revoke → Audit → Ask.</p>
        </div>
        <div className="hero-actions">
          <Link href="/guide" className="btn">
            Guided demo
          </Link>
          <Link href="/ask" className="btn ghost">
            View ask
          </Link>
        </div>
      </div>
    </main>
  );
}
