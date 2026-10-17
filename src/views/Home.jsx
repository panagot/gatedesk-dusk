import { Link } from "wouter";
import {
  FunnelChart,
  GateFlipChart,
  PipelineInfographic,
} from "../components/Charts.jsx";
import { Tip } from "../components/Tooltip.jsx";
import { useGate } from "../state.jsx";

export function Home() {
  const { policies, investors, audit, transfers, resetDemo, sync } = useGate();
  const live = policies.filter((p) => p.status === "live").length;
  const bound = investors.filter((i) => i.status === "bound").length;
  const proved = investors.filter((i) => i.status === "proved").length;
  const revoked = investors.filter((i) => i.status === "revoked").length;
  const allow = transfers.filter((t) => t.ok).length;
  const deny = transfers.length - allow;

  return (
    <main className="main">
      <section className="hero-solo">
        <p className="eyebrow">
          Live beta on Dusk
          <span className="dot" aria-hidden="true" />
          Desk sync: {sync}
        </p>
        <h1>Gate Desk</h1>
        <p className="hero-lead">
          Prove an investor may hold the asset, bind a Dusk account, then enforce allow or deny —
          without putting PII on-chain.
        </p>
        <div className="hero-actions">
          <Link href="/guide" className="btn">
            Start guided beta
          </Link>
          <Link href="/prove" className="btn ghost">
            Prove + Connect
          </Link>
        </div>
        <p className="hero-note">
          Connect bind is live. Citadel ZK is the finish milestone — not claimed here.{" "}
          <Tip label="Kickoff $1,500 · Finish $2,500 for Moat/Citadel soft-connect." />
        </p>
      </section>

      <section className="band">
        <div className="band-head">
          <h2>How eligibility moves</h2>
          <p>Five steps from issuer policy to transfer enforcement.</p>
        </div>
        <PipelineInfographic />
      </section>

      <section className="metrics-inline" aria-label="Live desk metrics">
        <div>
          <strong>{live}</strong>
          <span>live policies</span>
        </div>
        <div>
          <strong>{bound}</strong>
          <span>bound holders</span>
        </div>
        <div>
          <strong>
            {allow}/{Math.max(transfers.length, 0)}
          </strong>
          <span>allows / attempts</span>
        </div>
        <div>
          <strong>{audit.length}</strong>
          <span>audit events</span>
        </div>
      </section>

      <section className="band band-soft">
        <div className="band-head">
          <h2>Desk signals</h2>
          <p>
            Funnel and gate trail update from the shared hosted desk.{" "}
            <Tip label="Run Prove → Connect → Gate to populate these charts." />
          </p>
        </div>
        <div className="charts-row">
          <FunnelChart policies={live} proved={proved} bound={bound} revoked={revoked} />
          <GateFlipChart transfers={transfers} />
        </div>
        {transfers.length === 0 && (
          <p className="band-cta">
            No gate attempts yet ·{" "}
            <Link href="/gate">open Transfer Gate</Link>
            {deny > 0 ? ` · ${deny} denies logged` : ""}
          </p>
        )}
      </section>

      <section className="split-why">
        <div>
          <h2>Built for FMI onboarding</h2>
          <p>
            Issuers need policy and eligibility before Trade. Gate Desk is that wedge: Connect today,
            Citadel soft-connect when the finish tranche ships.
          </p>
          <ul className="plain-list">
            <li>Policy desk with attribute coverage</li>
            <li>Dusk Connect account bind</li>
            <li>Transfer gate that flips on revoke</li>
          </ul>
          <div className="hero-actions">
            <Link href="/ask" className="btn ghost">
              $4,000 ask
            </Link>
            <Link href="/spec" className="btn ghost">
              Spec
            </Link>
          </div>
        </div>
        <aside className="quiet-panel">
          <h3>Reviewer path</h3>
          <ol>
            <li>Guide — deny, then fix</li>
            <li>Connect bind</li>
            <li>Gate allow → revoke → deny</li>
            <li>Audit trail</li>
          </ol>
          <Link href="/guide" className="btn sm">
            Open guide
          </Link>
          <button
            type="button"
            className="text-btn"
            onClick={() => {
              resetDemo();
              window.location.href = "/guide";
            }}
          >
            Reset shared desk
          </button>
        </aside>
      </section>
    </main>
  );
}
