# Gate Desk

**Investor eligibility & wallet binding for [Dusk](https://www.dusk.network/) / [Citadel](https://docs.dusk.network/developer/digital-identity/protocol/).**  
Issuer policies → prove without PII on-chain → bind Dusk wallet → allowlist / revoke → audit.

> Prototype for [Dusk Grants](https://docs.dusk.network/developer/contribute/grants/) · ask **$8,000**  
> **$3,000** kickoff on demo acceptance · **$5,000** on Citadel + Dusk Connect soft-connect

---

## Why this idea

Dusk’s FMI workflow starts with eligibility and wallet binding — before trade or DvP. Citadel can prove a license exists without revealing attributes; **Gate Desk** is the missing issuer/venue studio. Complements Dusk Trade (still building); does not compete with closed bridge/DEX RFPs.

---

## Live demo

### https://gatedesk-navy.vercel.app/

Private repo: https://github.com/panagot/gatedesk-dusk

| Page | Purpose |
|------|---------|
| [/](https://gatedesk-navy.vercel.app/) | Thesis |
| [/guide](https://gatedesk-navy.vercel.app/guide) | Guided demo (deny → fix → gate) |
| [/policies](https://gatedesk-navy.vercel.app/policies) | Issuer eligibility rules |
| [/prove](https://gatedesk-navy.vercel.app/prove) | Staged LP license → SP verify → bind |
| [/holders](https://gatedesk-navy.vercel.app/holders) | Allowlist · revoke |
| [/gate](https://gatedesk-navy.vercel.app/gate) | Transfer allow / deny |
| [/audit](https://gatedesk-navy.vercel.app/audit) | Compliance trail |
| [/spec](https://gatedesk-navy.vercel.app/spec) | Citadel / Connect path |
| [/ask](https://gatedesk-navy.vercel.app/ask) | $8,000 milestones |

Local: `npm run dev` → http://localhost:5350/

---

## Grant scope ($8,000)

| Milestone | Amount | Deliverable |
|-----------|--------|-------------|
| **M1** | $3,000 | Kickoff after demo acceptance |
| **M2** | $5,000 | Citadel + Dusk Connect soft-connect + 1y maintenance plan |

---

## Stack

Vite · React 19 · wouter · Vercel

```bash
npm install && npm run dev   # :5350
```
