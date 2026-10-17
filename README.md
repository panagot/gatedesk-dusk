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

_Deploy URL after Vercel ship._

| Page | Purpose |
|------|---------|
| `/` | Thesis + workflow |
| `/policies` | Issuer eligibility rules |
| `/prove` | Investor DEMO proof + bind |
| `/holders` | Allowlist · revoke |
| `/audit` | Compliance trail |
| `/spec` | Citadel / Connect / EURQ path |
| `/ask` | $8,000 milestones |

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
