import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useGate } from "../state.jsx";

const STEPS = [
  {
    n: "1",
    title: "Start prove with a failing profile",
    body: "Guided Prove opens with “Retail only — no accredited”. Issue the license and run SP verify — expect DENY.",
    href: "/prove?guide=1&policy=pol_note_a",
    cta: "Open Prove (deny path)",
  },
  {
    n: "2",
    title: "Fix and re-verify",
    body: "Use “Fix: use full eligible profile”, re-issue, verify again — expect ACCEPT and a session cookie.",
    href: "/prove?guide=1&policy=pol_note_a",
    cta: "Back to Prove",
  },
  {
    n: "3",
    title: "Bind wallet",
    body: "Complete step 4 on Prove. You will be sent to the Transfer Gate.",
    href: "/prove?guide=1",
    cta: "Prove → bind",
  },
  {
    n: "4",
    title: "Transfer Gate: allow then revoke",
    body: "Attempt transfer (ALLOW). Then Revoke + re-test (DENY). That flip is the core demo.",
    href: "/gate?demo=1",
    cta: "Open Transfer Gate",
  },
  {
    n: "5",
    title: "Audit trail",
    body: "Confirm license, deny, prove, bind, allow, revoke, deny events are listed.",
    href: "/audit",
    cta: "Open Audit",
  },
];

export function Guide() {
  const { resetDemo } = useGate();
  const [, setLoc] = useLocation();
  const [toast, setToast] = useState(null);

  return (
    <main className="main">
      <div className="page-head">
        <h1>Guided demo</h1>
        <p>
          Five-minute reviewer path. All steps are simulated — no live Citadel or chain. Use Reset
          if state from a previous session is messy.
        </p>
      </div>

      <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            resetDemo();
            setToast("Demo state reset");
            setTimeout(() => {
              setToast(null);
              setLoc("/prove?guide=1&policy=pol_note_a");
            }, 400);
          }}
        >
          Reset + start
        </button>
        <Link href="/ask" className="btn ghost">
          Grant ask
        </Link>
      </div>

      <div className="steps" style={{ gridTemplateColumns: "1fr" }}>
        {STEPS.map((s) => (
          <article className="step" key={s.n} style={{ display: "grid", gap: "0.65rem" }}>
            <div>
              <div className="n">Step {s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
            <div>
              <Link href={s.href} className="btn sm">
                {s.cta}
              </Link>
            </div>
          </article>
        ))}
      </div>

      {toast && (
        <div className="toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </main>
  );
}
