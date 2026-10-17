import { Link, Route, Switch, useLocation } from "wouter";
import { Logo } from "./components/Logo.jsx";
import { SiteChat } from "./components/SiteChat.jsx";
import { Tip } from "./components/Tooltip.jsx";
import { useGate } from "./state.jsx";
import { Home } from "./views/Home.jsx";
import { Policies } from "./views/Policies.jsx";
import { Prove } from "./views/Prove.jsx";
import { Holders } from "./views/Holders.jsx";
import { Gate } from "./views/Gate.jsx";
import { Guide } from "./views/Guide.jsx";
import { Audit } from "./views/Audit.jsx";
import { Spec } from "./views/Spec.jsx";
import { Ask } from "./views/Ask.jsx";

const NAV = [
  ["/guide", "Guide"],
  ["/policies", "Policies"],
  ["/prove", "Prove"],
  ["/holders", "Holders"],
  ["/gate", "Gate"],
  ["/audit", "Audit"],
  ["/ask", "Ask"],
];

function SyncPill() {
  const { sync } = useGate();
  const label =
    sync === "hosted" ? "Hosted" : sync === "loading" ? "Sync…" : sync === "error" ? "Sync err" : "Local";
  return (
    <span className="demo-tag" title="Shared hosted desk sync">
      {label}
    </span>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-grid">
        <div>
          <div className="brand-mark">Gate Desk</div>
          <p>
            Live-beta eligibility desk for Dusk FMI flows. Connect-bound holders, hosted audit,
            Citadel soft-connect as the finish milestone.
          </p>
        </div>
        <div>
          <h4>Product</h4>
          <ul>
            <li>
              <Link href="/guide">Guided beta</Link>
            </li>
            <li>
              <Link href="/prove">Prove + Connect</Link>
            </li>
            <li>
              <Link href="/gate">Transfer Gate</Link>
            </li>
            <li>
              <Link href="/audit">Audit</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Grant</h4>
          <ul>
            <li>
              <Link href="/ask">$4,000 ask</Link>
            </li>
            <li>
              <Link href="/spec">Integration spec</Link>
            </li>
            <li>
              <a href="https://docs.dusk.network/developer/contribute/grants/" target="_blank" rel="noreferrer">
                Dusk Grants
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Stack</h4>
          <ul>
            <li>
              <a href="https://docs.dusk.network/developer/integrations/dusk-connect/" target="_blank" rel="noreferrer">
                Dusk Connect
              </a>
            </li>
            <li>
              <a href="https://www.dusk.network/" target="_blank" rel="noreferrer">
                dusk.network
              </a>
            </li>
            <li>
              <span>
                Hosted desk{" "}
                <Tip label="Shared Supabase row for policies, holders, transfers, and audit across reviewers." />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="site-footer-bottom">
        <span>Apache 2.0 · Live beta · Kickoff $1.5k · Finish $2.5k</span>
        <span>panagiotispollis@gmail.com</span>
      </div>
    </footer>
  );
}

export default function App() {
  const [loc] = useLocation();

  return (
    <div className="shell">
      <header className="top">
        <Link href="/" className="brand">
          <Logo size={34} />
          <span>
            <strong>Gate Desk</strong>
            <em>Investor eligibility on Dusk</em>
          </span>
        </Link>
        <nav className="nav" aria-label="Primary">
          {NAV.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={loc === href || loc.startsWith(href + "/") ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="top-actions">
          <SyncPill />
          <Link href="/guide" className="btn sm">
            Guided beta
          </Link>
        </div>
      </header>

      <nav className="mobile-nav" aria-label="Mobile">
        <Link href="/" aria-current={loc === "/" ? "page" : undefined}>
          Home
        </Link>
        {NAV.map(([href, label]) => (
          <Link key={href} href={href} aria-current={loc === href ? "page" : undefined}>
            {label}
          </Link>
        ))}
      </nav>

      <Switch>
        <Route path="/" component={Home} />
        <Route path="/guide" component={Guide} />
        <Route path="/policies" component={Policies} />
        <Route path="/prove" component={Prove} />
        <Route path="/holders" component={Holders} />
        <Route path="/gate" component={Gate} />
        <Route path="/audit" component={Audit} />
        <Route path="/spec" component={Spec} />
        <Route path="/ask" component={Ask} />
        <Route>
          <main className="main">
            <p style={{ color: "var(--mute)" }}>Page not found.</p>
            <Link href="/" className="btn ghost sm">
              Home
            </Link>
          </main>
        </Route>
      </Switch>

      <SiteFooter />
      <SiteChat />
    </div>
  );
}
