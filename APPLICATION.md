# Dusk Grants (Thesan) — Gate Desk · paste answers

**Form:** https://qfisyyuui1g.typeform.com/to/uAucnWFJ  
**Docs:** https://docs.dusk.network/developer/contribute/grants/

Draft offline, then paste. Fields marked **YOU** need your personal data.

---

## Identity / org (YOU)

| Field | Suggested |
|-------|-----------|
| Project name | Gate Desk |
| Team name | Independent builder (panagot) |
| Legal name of company | **YOU** — if sole trader: your full legal name + “(individual / invoice-capable)” |
| Registered address | **YOU** |
| Email | panagiotispollis@gmail.com (or **YOU** if different) |
| GitHub | https://github.com/panagot |
| Website / demo | https://gatedesk-navy.vercel.app/ |
| Repo | https://github.com/panagot/gatedesk-dusk |

---

## One-liner / summary

Live-beta investor eligibility desk for Dusk: issuer policy → license adapter → Dusk Connect bind → transfer gate that denies after revoke. Hosted shared desk. Citadel/Moat soft-connect is the funded finish milestone.

---

## Stage

Live beta — Dusk Connect bind + hosted Supabase desk are live. Prove uses a policy-adapter license today (not Citadel ZK). Soft-connect to Citadel/Moat is the finish deliverable.

---

## Grant size requested: **$4,000**

**Kickoff — $1,500 (~1–1.5 weeks, 1 FTE solo)**  
Invoice to begin. Acceptance: reviewer completes Guided beta (deny → fix → Connect bind → gate allow/revoke flip) on the hosted desk; public Apache 2.0 repo with LICENSE.

**Finish — $2,500 (~2–2.5 weeks, 1 FTE solo)**  
Citadel/Moat soft-connect on testnet (or official JS adapter when available): prove uses protocol session instead of HMAC policy adapter; Connect bind still works; transfer-gate hook stub; tests/CI note; **12-month maintenance plan** (dependency updates, Connect/Citadel adapter fixes, issue triage). Paid when Connect bind + Citadel session path work in browser.

Total: $4,000. Under $20k — focused FMI onboarding wedge, not a full Trade/DEX.

---

## Strategic alignment (FMI / RWA)

Dusk’s market flow needs issuer policy and investor eligibility before Trade / EURQ settlement. Gate Desk is that eligibility studio: complements Dusk Trade, does not re-pitch closed bridge/DEX RFPs. Uses Dusk Connect today and targets Citadel for “prove without revealing PII.”

---

## Technical approach

- Vite + React live beta at https://gatedesk-navy.vercel.app/
- `@dusk/connect` wallet discovery / account bind
- Supabase-hosted shared desk (policies, holders, transfers, audit)
- Staged prove: LP license (policy adapter) → SP verify → session cookie → Connect bind
- Transfer Gate: ALLOW / DENY after revoke
- Soft-connect path documented to Citadel 2 / Moat SDK
- License: Apache 2.0

---

## Technical specifications (core components)

1. **Policy desk** — issuer rules (attributes, trusted LPs, transfer mode)  
2. **License adapter** — LP issues signed credential (HMAC stub → Citadel session in Finish)  
3. **Prove flow** — SP verifies signature + policy; issues session cookie  
4. **Dusk Connect bind** — real account from wallet extension when present  
5. **Transfer Gate** — allowlist enforcement; revoke flips to DENY  
6. **Hosted audit** — shared event log for reviewers  
7. **Finish:** Moat/Citadel soft-connect replaces adapter; optional on-chain gate hook stub  

---

## Quantifiable deliverables

- Guided-beta completion by reviewer  
- Connect bind success (extension or documented install path)  
- Gate flip demos (ALLOW → revoke → DENY)  
- Public GitHub stars/forks / issues filed upstream on Connect/Citadel  
- Finish: Citadel session path live in browser + 12-month maintenance note  

Business impact (under $20k scope): faster FMI onboarding demos for issuers/venues; developer engagement via open Apache 2.0 eligibility reference — not a TVL claim.

---

## Team / experience

Independent builder (panagot). Invoice-capable for KYB/milestones. Prior grant-kit / product demos on GitHub: https://github.com/panagot — including Gate Desk live beta.

---

## Open source

Apache 2.0 — LICENSE in https://github.com/panagot/gatedesk-dusk  

---

## Long-term / maintenance (in Finish milestone)

12 months: keep Connect SDK current, soft-connect Citadel/Moat adapters as APIs stabilize, triage issues, dependency/security updates. Path to sustainability: embed Gate Desk as eligibility UX beside Dusk Trade / venue onboarding; collaborate with Dusk on Citadel SP profiles.

---

## Links (copy)

- Demo: https://gatedesk-navy.vercel.app/  
- Repo: https://github.com/panagot/gatedesk-dusk  
- Local: http://localhost:5350/  
- Form: https://qfisyyuui1g.typeform.com/to/uAucnWFJ  
