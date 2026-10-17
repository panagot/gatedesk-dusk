import { createContext, useContext, useMemo, useState } from "react";
import { INITIAL_AUDIT, INITIAL_INVESTORS, INITIAL_POLICIES } from "./data/seed.js";

const Ctx = createContext(null);

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}`;
}

function shortRef(prefix) {
  return `${prefix}_${Math.random().toString(16).slice(2, 6)}…${Math.random().toString(16).slice(2, 4)}`;
}

export function Provider({ children }) {
  const [policies, setPolicies] = useState(INITIAL_POLICIES);
  const [investors, setInvestors] = useState(INITIAL_INVESTORS);
  const [audit, setAudit] = useState(INITIAL_AUDIT);

  const api = useMemo(
    () => ({
      policies,
      investors,
      audit,
      publishPolicy(draft) {
        const id = uid("pol");
        const now = new Date().toISOString();
        const policy = {
          id,
          name: draft.name,
          asset: draft.asset || "Untitled asset",
          status: "live",
          requireAll: draft.requireAll,
          requireAny: draft.requireAny || [],
          trustedLps: draft.trustedLps,
          transferMode: draft.transferMode,
          createdAt: now,
          holders: 0,
        };
        setPolicies((p) => [policy, ...p]);
        setAudit((a) => [
          {
            id: uid("aud"),
            at: now,
            action: "policy",
            actor: "Issuer desk",
            detail: `Policy published · ${policy.name}`,
            ref: id,
          },
          ...a,
        ]);
        return policy;
      },
      proveEligibility({ policyId, lpId, attributes, label }) {
        const now = new Date().toISOString();
        const policy = policies.find((p) => p.id === policyId);
        if (!policy) throw new Error("Unknown policy");
        const missing = policy.requireAll.filter((x) => !attributes.includes(x));
        if (missing.length) {
          return { ok: false, missing };
        }
        if (policy.requireAny.length) {
          const anyOk = policy.requireAny.some((x) => attributes.includes(x));
          if (!anyOk) return { ok: false, missing: policy.requireAny };
        }
        if (!policy.trustedLps.includes(lpId)) {
          return { ok: false, missing: ["trusted_lp"] };
        }
        const cookieRef = shortRef("ckt");
        const inv = {
          id: uid("inv"),
          label: label || `Investor · ${cookieRef.slice(-4)}`,
          wallet: null,
          attributes,
          lpId,
          status: "proved",
          policies: [policyId],
          provedAt: now,
          cookieRef,
        };
        setInvestors((list) => [inv, ...list]);
        setAudit((a) => [
          {
            id: uid("aud"),
            at: now,
            action: "prove",
            actor: inv.label,
            detail: `ZK session verified for ${policy.name} · attributes not on-chain`,
            ref: cookieRef,
          },
          ...a,
        ]);
        return { ok: true, investor: inv };
      },
      bindWallet(investorId, wallet) {
        const now = new Date().toISOString();
        const ref = shortRef("tx");
        let target = null;
        setInvestors((list) =>
          list.map((x) => {
            if (x.id !== investorId) return x;
            target = { ...x, wallet, status: "bound" };
            return target;
          })
        );
        if (target) {
          setPolicies((ps) =>
            ps.map((p) =>
              target.policies.includes(p.id) ? { ...p, holders: p.holders + 1 } : p
            )
          );
          setAudit((a) => [
            {
              id: uid("aud"),
              at: now,
              action: "bind",
              actor: target.label,
              detail: `Wallet ${wallet} bound · eligible holder`,
              ref,
            },
            ...a,
          ]);
        }
      },
      revokeInvestor(investorId) {
        const now = new Date().toISOString();
        let target = null;
        setInvestors((list) =>
          list.map((x) => {
            if (x.id !== investorId) return x;
            target = { ...x, status: "revoked" };
            return target;
          })
        );
        if (target) {
          setAudit((a) => [
            {
              id: uid("aud"),
              at: now,
              action: "revoke",
              actor: target.label,
              detail: "Eligibility revoked · transfers denied",
              ref: target.cookieRef,
            },
            ...a,
          ]);
        }
      },
    }),
    [policies, investors, audit]
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useGate() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useGate outside Provider");
  return v;
}
