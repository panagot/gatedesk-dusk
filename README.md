# Gate Desk

**Live-beta investor eligibility desk for [Dusk](https://www.dusk.network/).**  
Issuer policies → policy-adapter license → **Dusk Connect** bind → transfer gate → hosted audit.

> [Dusk Grants](https://docs.dusk.network/developer/contribute/grants/) · ask **$8,000**  
> **M1 $3,000** live beta acceptance · **M2 $5,000** Citadel/Moat soft-connect

---

## Live today

- `@dusk/connect` wallet discovery + account bind
- Shared desk on Supabase (not localStorage-only)
- Transfer Gate allow / deny after revoke
- Honest labels: prove is a **policy adapter** until Citadel soft-connect (M2)

---

## Demo

### https://gatedesk-navy.vercel.app/

Repo: https://github.com/panagot/gatedesk-dusk

| Page | Purpose |
|------|---------|
| [/](https://gatedesk-navy.vercel.app/) | Thesis |
| [/guide](https://gatedesk-navy.vercel.app/guide) | Guided beta |
| [/prove](https://gatedesk-navy.vercel.app/prove) | License → verify → **Connect bind** |
| [/gate](https://gatedesk-navy.vercel.app/gate) | Transfer allow / deny |
| [/ask](https://gatedesk-navy.vercel.app/ask) | $8,000 milestones |

```bash
cp .env.example .env   # set VITE_SUPABASE_* 
npm install && npm run dev   # http://localhost:5350/
```

---

## Stack

Vite · React 19 · wouter · `@dusk/connect` · Supabase · Vercel
