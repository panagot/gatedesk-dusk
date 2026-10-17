import { Link } from "wouter";
import { WORKFLOW } from "../data/seed.js";
import { useGate } from "../state.jsx";

const COMPARE = [
  ["Eligibility", "Upload PDFs / share KYC dossier", "Prove license exists · attributes stay off-chain"],
  ["Wallet link", "Manual spreadsheet allowlists", "Session cookie binds to Dusk wallet"],
  ["Transfer control", "Custodian email chains", "Policy-enforced allowlist / controlled mode"],
  ["Disclosure", "Everything or nothing", "Selective disclosure to issuer / venue / auditor"],
  ["Settlement fit", "Identity bolted on after token", "Gate before asset + EURQ payment legs"],
];

export function Home() {
  const { policies, investors, audit } = useGate();
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
            Investor eligibility studio for regulated digital assets on Dusk. Issuers set policy;
            investors prove via Citadel; wallets bind; transfers stay gated. The missing front door
            before Dusk Trade, NPEX-style venues, and EURQ settlement.
          </p>
          <div className="hero-actions">
            <Link href="/policies" className="btn">
              Open policies
            </Link>
            <Link href="/prove" className="btn ghost">
              Prove eligibility
            </Link>
            <Link href="/ask" className="btn ghost">
              $8,000 ask
            </Link>
          </div>
        </div>

        <aside className="hero-panel" aria-label="Workflow preview">
          <div className="hero-panel-head">
            <span>Onboarding flow</span>
            <span className="demo-tag">Local DEMO</span>
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
          or DvP. Citadel can prove a license without revealing attributes, but there is no polished
          third-party desk for policies, prove, bind, and allowlist. Gate Desk is that surface.
        </p>
        <div className="grid-3">
          <article className="feature">
            <h3>Policy first</h3>
            <p>Require accredited + KYC L2 + jurisdiction. Trust specific License Providers only.</p>
          </article>
          <article className="feature">
            <h3>Prove, don’t dump PII</h3>
            <p>DEMO Citadel session cookie. Attributes stay off-chain unless selectively disclosed.</p>
          </article>
          <article className="feature">
            <h3>Bind then enforce</h3>
            <p>Eligible wallets enter the allowlist. Revoke and the audit trail records it.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <h2>How it works</h2>
        <p className="sub">Four steps from issuer policy to gated holder — aligned with Dusk FMI docs.</p>
        <div className="steps">
          {WORKFLOW.map((s) => (
            <article className="step" key={s.n}>
              <div className="n">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Vs bolted-on KYC</h2>
        <p className="sub">Regulated assets need eligibility in the lifecycle — not a PDF folder after mint.</p>
        <table className="compare">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Typical stack</th>
              <th>Gate Desk on Dusk</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE.map(([d, a, b]) => (
              <tr key={d}>
                <td>
                  <strong>{d}</strong>
                </td>
                <td>{a}</td>
                <td className="good">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="section">
        <h2>Universal App path</h2>
        <p className="sub">
          Soft-connect to Citadel 2 (license → ZK session → SP cookie) and Dusk Connect for wallet
          bind. Settlement stays on DuskDS; payment leg can target EURQ when the investor is gated.
          DEMO today is local state — Milestone 2 wires the protocol path.
        </p>
        <div className="callout">
          <strong>DEMO boundaries:</strong> No live Citadel proofs, no mainnet txs, no real KYC.
          Seed data + interactive policy / prove / bind / revoke for reviewers.
        </div>
        <div className="hero-actions" style={{ marginTop: "1rem" }}>
          <Link href="/spec" className="btn ghost">
            Read integration spec
          </Link>
        </div>
      </section>

      <div className="cta-band">
        <div>
          <h2>Ready for the grant desk?</h2>
          <p>Policies → Prove → Holders → Audit → $8,000 milestones. Same kit pattern as Vigil / Permit Desk.</p>
        </div>
        <div className="hero-actions">
          <Link href="/ask" className="btn">
            View ask
          </Link>
          <Link href="/prove" className="btn ghost">
            Try prove
          </Link>
        </div>
      </div>
    </main>
  );
}
