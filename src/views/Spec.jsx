import { Link } from "wouter";

export function Spec() {
  return (
    <main className="main">
      <div className="page-head">
        <h1>Integration spec</h1>
        <p>
          Live beta wires Dusk Connect + hosted desk today. Finish soft-connects Citadel / Moat for
          the prove session path. Diagram:{" "}
          <Link href="/architecture">/architecture</Link>.
        </p>
      </div>

      <div className="stat-strip" style={{ marginTop: 0, marginBottom: "1.5rem" }}>
        <div>
          <div className="label">Identity</div>
          <div className="value" style={{ fontSize: "1.15rem" }}>
            Citadel 2
          </div>
        </div>
        <div>
          <div className="label">Wallet</div>
          <div className="value" style={{ fontSize: "1.15rem" }}>
            Connect
          </div>
        </div>
        <div>
          <div className="label">Settlement</div>
          <div className="value" style={{ fontSize: "1.15rem" }}>
            DuskDS
          </div>
        </div>
        <div>
          <div className="label">Payment</div>
          <div className="value" style={{ fontSize: "1.15rem" }}>
            EURQ path
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="spec-block">
          <h3>Why Gate Desk (not Dusk Trade)</h3>
          <p style={{ margin: 0, color: "var(--ink-soft)", fontSize: "0.92rem" }}>
            Dusk Trade is the full product layer (onboarding → trade → settle). Gate Desk is the
            focused eligibility studio issuers and venues can embed or run beside Trade: Citadel SP
            policy UX, prove flow, wallet bind, allowlist, audit. Complements Trade; does not
            replace it.
          </p>
        </div>

        <div className="spec-block">
          <h3>Lifecycle (live beta today)</h3>
          <pre>{`publishPolicy(...) → Policy
issueLicense(lpId, attrs) → License + policy-adapter sig
proveWithLicense(policyId, license) → Cookie | Deny
  → verifyLicense(sig) + policy attrs (not Citadel ZK yet)
bind via @dusk/connect → Holder (real account when extension present)
attemptTransfer(policyId, wallet) → ALLOW | DENY  (hosted desk)
revoke(holderId) → next attemptTransfer DENY

M2: replace adapter with Citadel/Moat session`}</pre>
        </div>

        <div className="spec-block">
          <h3>Citadel alignment</h3>
          <p style={{ margin: 0, color: "var(--ink-soft)", fontSize: "0.92rem" }}>
            Maps to Citadel 2: License Provider issues encrypted license → user proves registered
            license without revealing which → Service Provider (Gate Desk) applies policy to the
            session cookie. JS SDK noted as forthcoming in Dusk docs — M2 soft-connect target.
          </p>
        </div>

        <div className="spec-block">
          <h3>FMI / RWA impact</h3>
          <p style={{ margin: 0, color: "var(--ink-soft)", fontSize: "0.92rem" }}>
            Unblocks issuer/venue onboarding volume (NPEX-style investor base), reduces leaked PII
            on public explorers, and prepares gated holders for asset + EURQ payment legs. Metrics:
            policies published, successful proves, bound wallets, revoke rate.
          </p>
        </div>

        <div className="spec-block">
          <h3>Out of scope (this DEMO)</h3>
          <p style={{ margin: 0, color: "var(--ink-soft)", fontSize: "0.92rem" }}>
            No real ZK circuits, no LP KYC backend, no mainnet Citadel contract, no live Dusk
            Connect. See <Link href="/ask">Ask</Link> for milestones and KYB readiness.
          </p>
        </div>
      </div>
    </main>
  );
}
