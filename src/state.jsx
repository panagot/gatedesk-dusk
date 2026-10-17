import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ATTRIBUTES, INITIAL_AUDIT, INITIAL_INVESTORS, INITIAL_POLICIES } from "./data/seed.js";
import { makeWallet, shortWallet, signLicense, verifyLicense } from "./lib/simCrypto.js";

const Ctx = createContext(null);
const STORAGE_KEY = "gatedesk_demo_v2";

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}`;
}

function shortRef(prefix) {
  return `${prefix}_sim_${Math.random().toString(16).slice(2, 8)}`;
}

function attrLabel(id) {
  if (id === "trusted_lp") return "trusted License Provider";
  return ATTRIBUTES.find((a) => a.id === id)?.label || id;
}

function loadStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function evaluatePolicy(policy, license) {
  const reasons = [];
  if (!policy) return { ok: false, reasons: ["Unknown policy"] };
  if (!license || !verifyLicense(license)) {
    return { ok: false, reasons: ["License signature invalid or missing"] };
  }
  if (!policy.trustedLps.includes(license.lpId)) {
    reasons.push(`LP not trusted for this policy (${license.lpId})`);
  }
  const missingAll = policy.requireAll.filter((x) => !license.attributes.includes(x));
  if (missingAll.length) {
    reasons.push(`Missing required: ${missingAll.map(attrLabel).join(", ")}`);
  }
  if (policy.requireAny?.length) {
    const anyOk = policy.requireAny.some((x) => license.attributes.includes(x));
    if (!anyOk) {
      reasons.push(
        `Need one of: ${policy.requireAny.map(attrLabel).join(" OR ")}`
      );
    }
  }
  return { ok: reasons.length === 0, reasons };
}

export function Provider({ children }) {
  const stored = typeof window !== "undefined" ? loadStored() : null;
  const [policies, setPolicies] = useState(stored?.policies || INITIAL_POLICIES);
  const [investors, setInvestors] = useState(stored?.investors || INITIAL_INVESTORS);
  const [audit, setAudit] = useState(stored?.audit || INITIAL_AUDIT);
  const [licenses, setLicenses] = useState(stored?.licenses || []);
  const [transfers, setTransfers] = useState(stored?.transfers || []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ policies, investors, audit, licenses, transfers })
    );
  }, [policies, investors, audit, licenses, transfers]);

  const api = useMemo(
    () => ({
      policies,
      investors,
      audit,
      licenses,
      transfers,
      resetDemo() {
        localStorage.removeItem(STORAGE_KEY);
        setPolicies(INITIAL_POLICIES);
        setInvestors(INITIAL_INVESTORS);
        setAudit(INITIAL_AUDIT);
        setLicenses([]);
        setTransfers([]);
      },
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
      publishDraft(policyId) {
        const now = new Date().toISOString();
        setPolicies((ps) =>
          ps.map((p) => (p.id === policyId ? { ...p, status: "live" } : p))
        );
        setAudit((a) => [
          {
            id: uid("aud"),
            at: now,
            action: "policy",
            actor: "Issuer desk",
            detail: `Draft published · ${policyId}`,
            ref: policyId,
          },
          ...a,
        ]);
      },
      issueLicense({ lpId, attributes, subject }) {
        const now = new Date().toISOString();
        const payload = {
          id: uid("lic"),
          lpId,
          attributes: [...attributes],
          subject: subject || `subj_${Math.random().toString(36).slice(2, 7)}`,
          issuedAt: now,
        };
        const signature = signLicense(payload, lpId);
        const license = { ...payload, signature, simulated: true };
        setLicenses((list) => [license, ...list]);
        setAudit((a) => [
          {
            id: uid("aud"),
            at: now,
            action: "license",
            actor: lpId,
            detail: `Simulated LP license issued · ${attributes.length} attributes · sig ${signature.slice(-8)}`,
            ref: license.id,
          },
          ...a,
        ]);
        return license;
      },
      proveWithLicense({ policyId, license, label }) {
        const now = new Date().toISOString();
        const policy = policies.find((p) => p.id === policyId);
        const evalResult = evaluatePolicy(policy, license);
        if (!evalResult.ok) {
          setAudit((a) => [
            {
              id: uid("aud"),
              at: now,
              action: "deny",
              actor: label || "Investor",
              detail: `Simulated SP deny · ${evalResult.reasons.join("; ")}`,
              ref: license?.id || "n/a",
            },
            ...a,
          ]);
          return { ok: false, reasons: evalResult.reasons };
        }
        const cookieRef = shortRef("ckt");
        const inv = {
          id: uid("inv"),
          label: label || `Investor ${cookieRef.slice(-6)}`,
          wallet: null,
          attributes: [...license.attributes],
          lpId: license.lpId,
          status: "proved",
          policies: [policyId],
          provedAt: now,
          cookieRef,
          licenseId: license.id,
        };
        setInvestors((list) => [inv, ...list]);
        setAudit((a) => [
          {
            id: uid("aud"),
            at: now,
            action: "prove",
            actor: inv.label,
            detail: `Simulated session cookie for ${policy.name} · license sig checked · attrs off-ledger`,
            ref: cookieRef,
          },
          ...a,
        ]);
        return { ok: true, investor: inv, cookieRef };
      },
      bindWallet(investorId, wallet) {
        const now = new Date().toISOString();
        const w = wallet || makeWallet(investorId);
        const existing = investors.find(
          (i) => i.wallet === w && i.id !== investorId && i.status === "bound"
        );
        if (existing) {
          return { ok: false, error: `Wallet already bound to ${existing.label}` };
        }
        const prev = investors.find((i) => i.id === investorId);
        if (!prev || prev.status === "revoked") {
          return { ok: false, error: "Cannot bind revoked or missing investor" };
        }
        const wasBound = prev.status === "bound";
        const ref = shortRef("tx");
        setInvestors((list) =>
          list.map((x) => (x.id !== investorId ? x : { ...x, wallet: w, status: "bound" }))
        );
        if (!wasBound) {
          setPolicies((ps) =>
            ps.map((p) =>
              prev.policies.includes(p.id) ? { ...p, holders: p.holders + 1 } : p
            )
          );
        }
        setAudit((a) => [
          {
            id: uid("aud"),
            at: now,
            action: "bind",
            actor: prev.label,
            detail: `Wallet ${shortWallet(w)} bound · eligible holder (simulated)`,
            ref,
          },
          ...a,
        ]);
        return { ok: true, wallet: w };
      },
      revokeInvestor(investorId) {
        const now = new Date().toISOString();
        const prev = investors.find((i) => i.id === investorId);
        if (!prev || prev.status === "revoked") return;
        const wasBound = prev.status === "bound";
        setInvestors((list) =>
          list.map((x) =>
            x.id !== investorId
              ? x
              : { ...x, status: "revoked", revokedAt: now }
          )
        );
        if (wasBound) {
          setPolicies((ps) =>
            ps.map((p) =>
              prev.policies.includes(p.id)
                ? { ...p, holders: Math.max(0, p.holders - 1) }
                : p
            )
          );
        }
        setAudit((a) => [
          {
            id: uid("aud"),
            at: now,
            action: "revoke",
            actor: prev.label,
            detail: "Eligibility revoked · transfer gate will deny (simulated)",
            ref: prev.cookieRef,
          },
          ...a,
        ]);
      },
      checkTransfer({ policyId, wallet, amount }) {
        const policy = policies.find((p) => p.id === policyId);
        if (!policy) return { ok: false, reason: "Unknown policy" };
        if (policy.status !== "live") {
          return { ok: false, reason: "Policy not live" };
        }
        const holder = investors.find(
          (i) => i.wallet === wallet && i.policies.includes(policyId)
        );
        if (!holder) {
          return { ok: false, reason: "Wallet not on this policy register" };
        }
        if (holder.status === "revoked") {
          return { ok: false, reason: "Holder revoked — transfers denied" };
        }
        if (holder.status !== "bound") {
          return { ok: false, reason: "Wallet not bound (proved only)" };
        }
        return {
          ok: true,
          reason: `Allowed under ${policy.transferMode} mode · ${amount || "1"} unit (simulated)`,
        };
      },
      attemptTransfer({ policyId, wallet, amount }) {
        const now = new Date().toISOString();
        const policy = policies.find((p) => p.id === policyId);
        let result = { ok: false, reason: "Unknown policy" };
        if (policy) {
          if (policy.status !== "live") {
            result = { ok: false, reason: "Policy not live" };
          } else {
            const holder = investors.find(
              (i) => i.wallet === wallet && i.policies.includes(policyId)
            );
            if (!holder) {
              result = { ok: false, reason: "Wallet not on this policy register" };
            } else if (holder.status === "revoked") {
              result = { ok: false, reason: "Holder revoked — transfers denied" };
            } else if (holder.status !== "bound") {
              result = { ok: false, reason: "Wallet not bound (proved only)" };
            } else {
              result = {
                ok: true,
                reason: `Allowed under ${policy.transferMode} mode · ${amount || "1"} unit (simulated)`,
              };
            }
          }
        }
        const ref = shortRef("xfer");
        const row = {
          id: uid("xfer"),
          at: now,
          policyId,
          wallet,
          amount: amount || "1",
          ok: result.ok,
          reason: result.reason,
          ref,
        };
        setTransfers((t) => [row, ...t]);
        setAudit((a) => [
          {
            id: uid("aud"),
            at: now,
            action: result.ok ? "allow" : "deny",
            actor: shortWallet(wallet),
            detail: `Transfer gate ${result.ok ? "ALLOW" : "DENY"} · ${result.reason}`,
            ref,
          },
          ...a,
        ]);
        return row;
      },
      evaluatePolicy,
      attrLabel,
      makeWallet,
      shortWallet,
    }),
    [policies, investors, audit, licenses, transfers]
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useGate() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useGate outside Provider");
  return v;
}
