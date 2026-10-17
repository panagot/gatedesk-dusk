import { Link } from "wouter";

export function Architecture() {
  return (
    <main className="main">
      <div className="page-head">
        <h1>Architecture</h1>
        <p>
          Technical diagram for Gate Desk live beta and the Citadel soft-connect finish path. Share
          this page as the grant diagram link.
        </p>
      </div>

      <div className="callout" style={{ marginBottom: "1.25rem" }}>
        <strong>Public link:</strong>{" "}
        <a href="https://gatedesk-navy.vercel.app/architecture">
          https://gatedesk-navy.vercel.app/architecture
        </a>
        {" · "}
        <Link href="/spec">Integration spec</Link>
      </div>

      <div className="panel" style={{ padding: "1.25rem 1rem", overflowX: "auto" }}>
        <svg
          viewBox="0 0 920 620"
          width="100%"
          style={{ minWidth: 640, maxWidth: 920, display: "block", margin: "0 auto" }}
          role="img"
          aria-label="Gate Desk architecture diagram"
        >
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#0c3d38" />
            </marker>
          </defs>

          <rect width="920" height="620" fill="#fffcf8" />
          <text x="32" y="36" fill="#0c3d38" fontFamily="Georgia, serif" fontSize="22" fontWeight="600">
            Gate Desk · architecture
          </text>
          <text x="32" y="58" fill="#7a857f" fontFamily="system-ui, sans-serif" fontSize="12">
            Live beta (solid) · Finish / Citadel soft-connect (dashed)
          </text>

          {/* Actors */}
          <g>
            <rect x="32" y="90" width="140" height="64" rx="10" fill="#fff" stroke="#e4e0d8" />
            <text x="102" y="118" textAnchor="middle" fill="#0c3d38" fontSize="13" fontWeight="600" fontFamily="system-ui">
              Issuer
            </text>
            <text x="102" y="136" textAnchor="middle" fill="#7a857f" fontSize="11" fontFamily="system-ui">
              Policy desk
            </text>

            <rect x="32" y="180" width="140" height="64" rx="10" fill="#fff" stroke="#e4e0d8" />
            <text x="102" y="208" textAnchor="middle" fill="#0c3d38" fontSize="13" fontWeight="600" fontFamily="system-ui">
              License Provider
            </text>
            <text x="102" y="226" textAnchor="middle" fill="#7a857f" fontSize="11" fontFamily="system-ui">
              KYC / credential
            </text>

            <rect x="32" y="270" width="140" height="64" rx="10" fill="#fff" stroke="#e4e0d8" />
            <text x="102" y="298" textAnchor="middle" fill="#0c3d38" fontSize="13" fontWeight="600" fontFamily="system-ui">
              Investor
            </text>
            <text x="102" y="316" textAnchor="middle" fill="#7a857f" fontSize="11" fontFamily="system-ui">
              Prove + bind
            </text>
          </g>

          {/* Gate Desk core */}
          <rect x="240" y="90" width="420" height="320" rx="14" fill="#e4f0ed" stroke="#0c3d38" strokeWidth="1.5" />
          <text x="450" y="118" textAnchor="middle" fill="#0c3d38" fontSize="15" fontWeight="700" fontFamily="system-ui">
            Gate Desk (Service Provider)
          </text>

          <rect x="268" y="140" width="160" height="56" rx="8" fill="#fff" stroke="#2a6b62" />
          <text x="348" y="165" textAnchor="middle" fill="#0c3d38" fontSize="12" fontWeight="600" fontFamily="system-ui">
            1 · Policy engine
          </text>
          <text x="348" y="182" textAnchor="middle" fill="#7a857f" fontSize="10" fontFamily="system-ui">
            attrs · trusted LPs
          </text>

          <rect x="472" y="140" width="160" height="56" rx="8" fill="#fff" stroke="#2a6b62" />
          <text x="552" y="165" textAnchor="middle" fill="#0c3d38" fontSize="12" fontWeight="600" fontFamily="system-ui">
            2 · License verify
          </text>
          <text x="552" y="182" textAnchor="middle" fill="#7a857f" fontSize="10" fontFamily="system-ui">
            adapter → Citadel
          </text>

          <rect x="268" y="220" width="160" height="56" rx="8" fill="#fff" stroke="#2a6b62" />
          <text x="348" y="245" textAnchor="middle" fill="#0c3d38" fontSize="12" fontWeight="600" fontFamily="system-ui">
            3 · Session cookie
          </text>
          <text x="348" y="262" textAnchor="middle" fill="#7a857f" fontSize="10" fontFamily="system-ui">
            prove accept / deny
          </text>

          <rect x="472" y="220" width="160" height="56" rx="8" fill="#fff" stroke="#2a6b62" />
          <text x="552" y="245" textAnchor="middle" fill="#0c3d38" fontSize="12" fontWeight="600" fontFamily="system-ui">
            4 · Connect bind
          </text>
          <text x="552" y="262" textAnchor="middle" fill="#7a857f" fontSize="10" fontFamily="system-ui">
            @dusk/connect
          </text>

          <rect x="268" y="300" width="364" height="72" rx="8" fill="#0c3d38" />
          <text x="450" y="332" textAnchor="middle" fill="#f7faf8" fontSize="13" fontWeight="600" fontFamily="system-ui">
            5 · Transfer Gate
          </text>
          <text x="450" y="352" textAnchor="middle" fill="#a8d4c8" fontSize="11" fontFamily="system-ui">
            ALLOW if bound · DENY if revoked · audit log
          </text>

          {/* Hosted store */}
          <rect x="720" y="140" width="168" height="120" rx="10" fill="#fff" stroke="#e4e0d8" />
          <text x="804" y="175" textAnchor="middle" fill="#0c3d38" fontSize="13" fontWeight="600" fontFamily="system-ui">
            Hosted desk
          </text>
          <text x="804" y="196" textAnchor="middle" fill="#7a857f" fontSize="11" fontFamily="system-ui">
            Supabase
          </text>
          <text x="804" y="216" textAnchor="middle" fill="#7a857f" fontSize="10" fontFamily="system-ui">
            policies · holders
          </text>
          <text x="804" y="232" textAnchor="middle" fill="#7a857f" fontSize="10" fontFamily="system-ui">
            transfers · audit
          </text>

          {/* Dusk stack */}
          <rect x="240" y="450" width="200" height="72" rx="10" fill="#fff" stroke="#0c3d38" strokeDasharray="5 4" />
          <text x="340" y="480" textAnchor="middle" fill="#0c3d38" fontSize="12" fontWeight="600" fontFamily="system-ui">
            Citadel / Moat
          </text>
          <text x="340" y="500" textAnchor="middle" fill="#7a857f" fontSize="10" fontFamily="system-ui">
            Finish: ZK session path
          </text>

          <rect x="470" y="450" width="190" height="72" rx="10" fill="#fff" stroke="#2a6b62" />
          <text x="565" y="480" textAnchor="middle" fill="#0c3d38" fontSize="12" fontWeight="600" fontFamily="system-ui">
            Dusk Connect
          </text>
          <text x="565" y="500" textAnchor="middle" fill="#7a857f" fontSize="10" fontFamily="system-ui">
            Live: wallet bind
          </text>

          <rect x="690" y="450" width="198" height="72" rx="10" fill="#fff" stroke="#0c3d38" strokeDasharray="5 4" />
          <text x="789" y="480" textAnchor="middle" fill="#0c3d38" fontSize="12" fontWeight="600" fontFamily="system-ui">
            DuskVM / DuskEVM
          </text>
          <text x="789" y="500" textAnchor="middle" fill="#7a857f" fontSize="10" fontFamily="system-ui">
            Finish: gate hook stub
          </text>

          {/* arrows */}
          <line x1="172" y1="122" x2="240" y2="160" stroke="#0c3d38" strokeWidth="1.4" markerEnd="url(#arrow)" />
          <line x1="172" y1="212" x2="268" y2="168" stroke="#0c3d38" strokeWidth="1.4" markerEnd="url(#arrow)" />
          <line x1="172" y1="302" x2="268" y2="248" stroke="#0c3d38" strokeWidth="1.4" markerEnd="url(#arrow)" />
          <line x1="660" y1="200" x2="720" y2="200" stroke="#0c3d38" strokeWidth="1.4" markerEnd="url(#arrow)" />
          <line x1="450" y1="372" x2="450" y2="450" stroke="#0c3d38" strokeWidth="1.4" strokeDasharray="5 4" markerEnd="url(#arrow)" />
          <line x1="552" y1="276" x2="565" y2="450" stroke="#2a6b62" strokeWidth="1.4" markerEnd="url(#arrow)" />
          <line x1="520" y1="372" x2="789" y2="450" stroke="#0c3d38" strokeWidth="1.2" strokeDasharray="5 4" markerEnd="url(#arrow)" />

          <text x="32" y="560" fill="#7a857f" fontSize="11" fontFamily="system-ui">
            Stack: Vite · React · @dusk/connect · Supabase · Vercel · Apache 2.0
          </text>
          <text x="32" y="580" fill="#7a857f" fontSize="11" fontFamily="system-ui">
            Demo https://gatedesk-navy.vercel.app/ · Repo https://github.com/panagot/gatedesk-dusk
          </text>
        </svg>
      </div>

      <section className="section">
        <h2>Legend</h2>
        <ul className="plain-list">
          <li>
            <strong>Solid boxes / arrows</strong> — live beta today (policy, adapter verify, Connect,
            hosted desk, Transfer Gate).
          </li>
          <li>
            <strong>Dashed boxes / arrows</strong> — Finish milestone ($2,500): Citadel/Moat session
            path and optional on-chain gate hook.
          </li>
        </ul>
        <div className="hero-actions">
          <Link href="/spec" className="btn ghost">
            Spec text
          </Link>
          <a
            className="btn ghost"
            href="https://github.com/panagot/gatedesk-dusk"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </section>
    </main>
  );
}
