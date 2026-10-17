# Dusk Grants — Gate Desk (draft answers)

Fill the official grants form after drafting offline. Update live URL after deploy.

---

**Project name:** Gate Desk

**One-liner:** Investor eligibility studio for Dusk — prove Citadel credentials without putting PII on-chain, bind wallets, enforce allowlists, audit everything.

**Email:** panagiotispollis@gmail.com

**Stage:** MVP / Alpha (working DEMO)

**Grant size requested:** $8,000  
- M1 $3,000 — demo acceptance (this kit live)  
- M2 $5,000 — Citadel + Dusk Connect soft-connect + one-year maintenance plan

**Strategic alignment:** Advances Dusk as FMI for RWA by shipping the missing onboarding surface (issuer policy → investor prove → wallet bind) that Dusk Trade and NPEX-style venues need before trading and EURQ settlement.

**Technical approach:**  
Vite/React DEMO today with local policy/prove/bind/revoke state. Soft-connect path documented to Citadel 2 (LP license → ZK session → SP cookie) and Dusk Connect for wallet discovery. Open source Apache 2.0. No live ZK in M1; M2 wires protocol handlers on testnet.

**Team experience:** Independent builder shipping grant kits with live demos + private repos + milestone asks (Prom Vigil, Rain AgentMark, Zeta Permit Desk). Invoice-capable sole trader / KYB-ready.

**Quantifiable deliverables:**  
- Policies published, prove success/deny rates, bound wallets, revoke events  
- Public DEMO + docs driving developer engagement around Citadel  
- Maintenance commits for 12 months post-M2

**Open source:** Apache 2.0 (majority of deliverables)

**KYB:** Yes — individual able to issue invoices for milestone payments

**Live demo:** _(VERCEL_URL)_  
**Repo:** _(GITHUB_URL)_ (private — invite reviewers on request)

**Docs:** `/spec` on the live demo · this APPLICATION.md

**Why not Trade / DEX / bridge:** Gate Desk is eligibility-only. Trade is Dusk’s product layer; bridge/DEX RFPs already selected historically. We fill the Citadel UX gap.
