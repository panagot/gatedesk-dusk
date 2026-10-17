/** Pure SVG charts — no chart library. */

export function PipelineInfographic() {
  const steps = [
    { n: "1", t: "Policy", d: "Issuer rules" },
    { n: "2", t: "License", d: "LP adapter" },
    { n: "3", t: "Verify", d: "SP cookie" },
    { n: "4", t: "Connect", d: "Dusk account" },
    { n: "5", t: "Gate", d: "Allow / deny" },
  ];
  return (
    <div className="pipe" aria-label="Eligibility pipeline">
      {steps.map((s) => (
        <div className="pipe-step" key={s.n}>
          <div className="pipe-node">
            <span className="pipe-n">{s.n}</span>
            <strong>{s.t}</strong>
            <em>{s.d}</em>
          </div>
        </div>
      ))}
    </div>
  );
}

export function FunnelChart({ policies = 0, proved = 0, bound = 0, revoked = 0 }) {
  const rows = [
    { label: "Live policies", v: policies, c: "var(--ink)" },
    { label: "Proved sessions", v: proved, c: "var(--steel)" },
    { label: "Bound holders", v: bound, c: "var(--ok)" },
    { label: "Revoked", v: revoked, c: "var(--rust)" },
  ];
  const max = Math.max(...rows.map((r) => r.v), 1);
  return (
    <div className="chart-block">
      <div className="chart-head">
        <h3>Desk funnel</h3>
        <span className="mono-label">live counts</span>
      </div>
      <svg viewBox="0 0 320 168" className="chart-svg" role="img" aria-label="Funnel bar chart">
        {rows.map((r, i) => {
          const y = 18 + i * 38;
          const w = 40 + (r.v / max) * 220;
          return (
            <g key={r.label}>
              <text x="0" y={y + 4} className="chart-label">
                {r.label}
              </text>
              <rect x="110" y={y - 10} width={w} height="18" rx="2" fill={r.c} opacity="0.88" />
              <text x={118 + w} y={y + 4} className="chart-val">
                {r.v}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function GateFlipChart({ transfers = [] }) {
  const recent = transfers.slice(0, 12).reverse();
  const w = 320;
  const h = 120;
  const pad = 16;
  if (!recent.length) {
    return (
      <div className="chart-block">
        <div className="chart-head">
          <h3>Gate outcomes</h3>
          <span className="mono-label">no attempts yet</span>
        </div>
        <p className="chart-empty">Run Transfer Gate to plot ALLOW / DENY sequence.</p>
      </div>
    );
  }
  const pts = recent.map((t, i) => {
    const x = pad + (i / Math.max(recent.length - 1, 1)) * (w - pad * 2);
    const y = t.ok ? h * 0.28 : h * 0.72;
    return { x, y, ok: t.ok };
  });
  const path = pts.map((p, i) => `${i ? "L" : "M"}${p.x},${p.y}`).join(" ");
  const allow = transfers.filter((t) => t.ok).length;
  const deny = transfers.length - allow;
  return (
    <div className="chart-block">
      <div className="chart-head">
        <h3>Gate flip trail</h3>
        <span className="mono-label">
          {allow} allow · {deny} deny
        </span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="chart-svg" role="img" aria-label="Allow deny trail">
        <line x1={pad} y1={h * 0.28} x2={w - pad} y2={h * 0.28} className="chart-guide" />
        <line x1={pad} y1={h * 0.72} x2={w - pad} y2={h * 0.72} className="chart-guide" />
        <text x={pad} y={h * 0.28 - 6} className="chart-label">
          ALLOW
        </text>
        <text x={pad} y={h * 0.72 + 14} className="chart-label">
          DENY
        </text>
        <path d={path} fill="none" stroke="var(--ink)" strokeWidth="1.5" />
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill={p.ok ? "var(--ok)" : "var(--rust)"} />
        ))}
      </svg>
    </div>
  );
}

export function AttrCoverageMatrix({ policies = [], attributes = [] }) {
  const live = policies.filter((p) => p.status === "live");
  if (!live.length) return null;
  return (
    <div className="chart-block matrix-wrap">
      <div className="chart-head">
        <h3>Attribute coverage</h3>
        <span className="mono-label">policy × claim</span>
      </div>
      <div className="matrix" role="table" aria-label="Attribute coverage matrix">
        <div className="matrix-row matrix-head" role="row">
          <div role="columnheader">Attribute</div>
          {live.map((p) => (
            <div key={p.id} role="columnheader" title={p.name}>
              {p.name.slice(0, 10)}
            </div>
          ))}
        </div>
        {attributes.map((a) => (
          <div className="matrix-row" role="row" key={a.id}>
            <div role="rowheader">{a.label}</div>
            {live.map((p) => {
              const req =
                p.requireAll?.includes(a.id) || p.requireAny?.includes(a.id);
              return (
                <div
                  key={p.id}
                  role="cell"
                  className={req ? "cell-on" : "cell-off"}
                  title={req ? "Required" : "Not required"}
                >
                  {req ? "●" : "·"}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AuditBars({ audit = [] }) {
  const keys = ["license", "prove", "deny", "bind", "allow", "revoke", "policy"];
  const counts = Object.fromEntries(keys.map((k) => [k, 0]));
  audit.forEach((e) => {
    if (counts[e.action] !== undefined) counts[e.action] += 1;
  });
  const max = Math.max(...Object.values(counts), 1);
  return (
    <div className="chart-block">
      <div className="chart-head">
        <h3>Audit mix</h3>
        <span className="mono-label">{audit.length} events</span>
      </div>
      <div className="bar-stack">
        {keys.map((k) => (
          <div className="bar-row" key={k}>
            <span className="mono-label">{k}</span>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{ width: `${(counts[k] / max) * 100}%` }}
                data-action={k}
              />
            </div>
            <span className="chart-val">{counts[k]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatusDonut({ investors = [] }) {
  const bound = investors.filter((i) => i.status === "bound").length;
  const proved = investors.filter((i) => i.status === "proved").length;
  const revoked = investors.filter((i) => i.status === "revoked").length;
  const total = Math.max(bound + proved + revoked, 1);
  const r = 36;
  const c = 2 * Math.PI * r;
  const segs = [
    { n: bound, color: "var(--ok)" },
    { n: proved, color: "var(--steel)" },
    { n: revoked, color: "var(--rust)" },
  ];
  let offset = 0;
  return (
    <div className="chart-block donut-block">
      <div className="chart-head">
        <h3>Holder status</h3>
        <span className="mono-label">{investors.length} total</span>
      </div>
      <div className="donut-row">
        <svg viewBox="0 0 100 100" className="donut-svg" aria-hidden="true">
          {segs.map((s, i) => {
            const len = (s.n / total) * c;
            const el = (
              <circle
                key={i}
                cx="50"
                cy="50"
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth="12"
                strokeDasharray={`${len} ${c - len}`}
                strokeDashoffset={-offset}
                transform="rotate(-90 50 50)"
              />
            );
            offset += len;
            return el;
          })}
        </svg>
        <ul className="donut-legend">
          <li>
            <i style={{ background: "var(--ok)" }} /> Bound {bound}
          </li>
          <li>
            <i style={{ background: "var(--steel)" }} /> Proved {proved}
          </li>
          <li>
            <i style={{ background: "var(--rust)" }} /> Revoked {revoked}
          </li>
        </ul>
      </div>
    </div>
  );
}
