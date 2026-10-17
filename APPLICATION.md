# Dusk Grants — Gate Desk (draft answers)

Draft offline, then paste into the official form.

---

**Project name:** Gate Desk

**One-liner:** Live-beta investor eligibility desk for Dusk — policy → license adapter → Dusk Connect bind → transfer gate; Citadel soft-connect is the funded finish.

**Email:** panagiotispollis@gmail.com

**Stage:** Live beta (Dusk Connect + hosted desk; Citadel prove = policy adapter until Moat soft-connect)

**Grant size requested:** $4,000  
- **Kickoff $1,500 (~1–1.5 weeks)** — Live beta acceptance: Connect bind path + hosted desk + public Apache 2.0 repo; invoice to begin. Solo FTE.  
- **Finish $2,500 (~2–2.5 weeks)** — Citadel/Moat soft-connect on testnet (or official adapter), prove uses protocol session (not HMAC adapter), transfer-gate hook stub, tests/CI, **12-month maintenance plan** for the repo (deps, Connect/Citadel adapter updates, issue triage). Paid when Connect bind + Citadel session path work in browser.

**Strategic alignment:** FMI onboarding gap — issuer policy and investor eligibility before Trade / EURQ settlement. Complements Dusk Trade.

**Technical approach:**  
Vite/React live beta with `@dusk/connect`, Supabase-hosted desk, staged prove (policy adapter today), Transfer Gate, reviewer metrics UI. Soft-connect to Citadel 2 / Moat. Apache 2.0.

**Team:** Independent builder; invoice-capable. Contact: panagiotispollis@gmail.com

**Quantifiable deliverables:** Guided-beta completion, Connect bind rate, deny/allow gate flips, public repo, finish milestone = Citadel session path.

**Open source:** Apache 2.0 (LICENSE in repo)

**Live demo:** https://gatedesk-navy.vercel.app/  
**Repo:** https://github.com/panagot/gatedesk-dusk  
**Local:** http://localhost:5350/
