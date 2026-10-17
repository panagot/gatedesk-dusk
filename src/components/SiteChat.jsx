import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

const FAQ = [
  {
    q: ["connect", "wallet", "extension"],
    a: "Prove → step 4 → Connect Dusk wallet. Install the Dusk Wallet extension if none is discovered. You can paste a testnet account id for desk testing.",
    href: "/prove",
  },
  {
    q: ["citadel", "zk", "proof"],
    a: "Live beta uses a policy-adapter license, not Citadel ZK. Soft-connect to Moat/Citadel is the $2,500 finish milestone.",
    href: "/ask",
  },
  {
    q: ["gate", "revoke", "transfer", "deny", "allow"],
    a: "Open Transfer Gate, attempt a transfer (ALLOW), then Revoke + re-test (DENY). That flip is the enforcement story.",
    href: "/gate",
  },
  {
    q: ["grant", "ask", "money", "price", "cost", "4000", "1500"],
    a: "Ask is $4,000: $1,500 kickoff on live-beta acceptance, $2,500 when Citadel soft-connect is finished.",
    href: "/ask",
  },
  {
    q: ["hosted", "supabase", "sync", "storage"],
    a: "Desk state syncs to a shared Supabase row so reviewers share policies, holders, and audit — not private localStorage.",
    href: "/audit",
  },
  {
    q: ["guide", "demo", "start", "review"],
    a: "Use Guided beta: Reset → deny path → fix → Connect bind → Gate flip → Audit.",
    href: "/guide",
  },
];

function reply(text) {
  const t = text.toLowerCase();
  for (const row of FAQ) {
    if (row.q.some((k) => t.includes(k))) return row;
  }
  return {
    a: "Try asking about Connect, the Transfer Gate, Citadel vs adapter, hosted sync, or the $4k ask. Or open the guided beta.",
    href: "/guide",
  };
}

export function SiteChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([
    {
      role: "bot",
      text: "Gate Desk assistant. Ask about Connect bind, gate flips, hosted sync, or the grant ask.",
    },
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  function send(e) {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    const hit = reply(text);
    setMsgs((m) => [
      ...m,
      { role: "user", text },
      { role: "bot", text: hit.a, href: hit.href },
    ]);
    setInput("");
  }

  return (
    <div className={`desk-chat ${open ? "open" : ""}`}>
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Gate Desk assistant">
          <header className="chat-head">
            <div>
              <strong>Desk assistant</strong>
              <span>Rule FAQ · not an LLM</span>
            </div>
            <button type="button" className="chat-x" onClick={() => setOpen(false)} aria-label="Close">
              ×
            </button>
          </header>
          <div className="chat-msgs">
            {msgs.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.role}`}>
                <p>{m.text}</p>
                {m.href && (
                  <Link href={m.href} onClick={() => setOpen(false)}>
                    Open {m.href}
                  </Link>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form className="chat-form" onSubmit={send}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Connect, gate, ask…"
              aria-label="Message"
            />
            <button type="submit" className="btn sm">
              Send
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        className="chat-fab"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close assistant" : "Open assistant"}
      >
        {open ? "Close" : "Ask"}
      </button>
    </div>
  );
}
