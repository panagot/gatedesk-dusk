import { Link, Route, Switch, useLocation } from "wouter";
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

export default function App() {
  const [loc] = useLocation();

  return (
    <div className="shell">
      <header className="top">
        <Link href="/" className="brand">
          <img src="/favicon.svg" width={22} height={22} alt="" />
          <span>
            <strong>Gate Desk</strong>
            <em>Eligibility · Bind · Enforce</em>
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
        <Link href="/guide" className="btn sm">
          Guided demo
        </Link>
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

      <footer className="footer">
        <div>
          Gate Desk · Dusk grant kit · $8,000 · <span className="demo-tag">DEMO</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem" }}>
          <a href="https://www.dusk.network/" target="_blank" rel="noreferrer">
            dusk.network
          </a>
          <a
            href="https://docs.dusk.network/developer/contribute/grants/"
            target="_blank"
            rel="noreferrer"
          >
            Grants
          </a>
          <Link href="/spec">Spec</Link>
          <Link href="/ask">Ask</Link>
        </div>
      </footer>
    </div>
  );
}
