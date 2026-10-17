export const ATTRIBUTES = [
  { id: "accredited", label: "Accredited investor", detail: "Meets local accredited / professional status" },
  { id: "eea_retail", label: "EEA retail eligible", detail: "Qualified under EEA retail distribution rules" },
  { id: "jurisdiction_nl", label: "Netherlands resident", detail: "Jurisdiction = NL" },
  { id: "jurisdiction_eu", label: "EU / EEA resident", detail: "Jurisdiction inside EEA" },
  { id: "kyc_l2", label: "KYC Level 2", detail: "ID + address verified by License Provider" },
  { id: "pep_clear", label: "PEP clear", detail: "Not a politically exposed person" },
];

export const LICENSE_PROVIDERS = [
  { id: "lp_npex", name: "NPEX Onboarding LP", trust: "Venue-trusted", region: "NL" },
  { id: "lp_quantoz", name: "Quantoz KYC Desk", trust: "EMI-aligned", region: "NL" },
  { id: "lp_demo", name: "DEMO License Provider", trust: "Sandbox only", region: "DEMO" },
];

/** Preset KYC outcomes an LP can "issue" — reviewer picks a profile instead of self-attesting. */
export const LP_PROFILES = [
  {
    id: "full_eu",
    label: "Full eligible (EU)",
    detail: "Accredited + KYC L2 + EU + PEP clear",
    attributes: ["accredited", "kyc_l2", "jurisdiction_eu", "pep_clear", "eea_retail"],
  },
  {
    id: "full_nl",
    label: "Full eligible (NL)",
    detail: "Accredited + KYC L2 + NL + PEP clear",
    attributes: ["accredited", "kyc_l2", "jurisdiction_nl", "pep_clear"],
  },
  {
    id: "missing_accredited",
    label: "Retail only — no accredited",
    detail: "Fails policies that require accredited",
    attributes: ["kyc_l2", "jurisdiction_eu", "pep_clear", "eea_retail"],
  },
  {
    id: "kyc_only",
    label: "KYC only",
    detail: "Minimal — often fails note / fund policies",
    attributes: ["kyc_l2"],
  },
];

export const INITIAL_POLICIES = [
  {
    id: "pol_note_a",
    name: "SME Note Series A",
    asset: "NOTE-A · EUR 2.4M",
    status: "live",
    requireAll: ["accredited", "kyc_l2", "pep_clear"],
    requireAny: ["jurisdiction_nl", "jurisdiction_eu"],
    trustedLps: ["lp_npex", "lp_demo"],
    transferMode: "allowlist",
    createdAt: "2026-10-02T10:00:00Z",
    holders: 2,
  },
  {
    id: "pol_fund_b",
    name: "Private Fund Unit B",
    asset: "PF-B · closed end",
    status: "live",
    requireAll: ["accredited", "kyc_l2", "jurisdiction_eu", "pep_clear"],
    requireAny: [],
    trustedLps: ["lp_npex", "lp_quantoz"],
    transferMode: "controlled",
    createdAt: "2026-09-18T14:20:00Z",
    holders: 1,
  },
  {
    id: "pol_eurq_settle",
    name: "EURQ Settlement Desk",
    asset: "Payment leg · EMT",
    status: "draft",
    requireAll: ["kyc_l2"],
    requireAny: ["jurisdiction_eu"],
    trustedLps: ["lp_quantoz", "lp_demo"],
    transferMode: "open_eligible",
    createdAt: "2026-10-14T09:00:00Z",
    holders: 0,
  },
];

export const INITIAL_INVESTORS = [
  {
    id: "inv_01",
    label: "Investor NL-2041",
    wallet: "pkDusk_7K2mNpQ9wR4vL8sT3yH6jF1cB5nA0uE2x9",
    attributes: ["accredited", "kyc_l2", "jurisdiction_nl", "pep_clear"],
    lpId: "lp_npex",
    status: "bound",
    policies: ["pol_note_a"],
    provedAt: "2026-10-15T11:22:00Z",
    cookieRef: "ckt_sim_7a91c2",
    licenseId: "lic_sim_01",
  },
  {
    id: "inv_02",
    label: "Investor DE-1188",
    wallet: "pkDusk_3Bb0QwE8nM2kR7pL5sT9yH1cF4nA6uD0x",
    attributes: ["accredited", "kyc_l2", "jurisdiction_eu", "pep_clear", "eea_retail"],
    lpId: "lp_quantoz",
    status: "bound",
    policies: ["pol_note_a", "pol_fund_b"],
    provedAt: "2026-10-12T16:05:00Z",
    cookieRef: "ckt_sim_12ef90",
    licenseId: "lic_sim_02",
  },
  {
    id: "inv_03",
    label: "Investor pending bind",
    wallet: null,
    attributes: ["accredited", "kyc_l2", "jurisdiction_eu", "pep_clear"],
    lpId: "lp_demo",
    status: "proved",
    policies: ["pol_note_a"],
    provedAt: "2026-10-16T08:40:00Z",
    cookieRef: "ckt_sim_aa0144",
    licenseId: "lic_sim_03",
  },
];

export const INITIAL_AUDIT = [
  {
    id: "aud_1",
    at: "2026-10-16T08:40:12Z",
    action: "prove",
    actor: "Investor pending bind",
    detail: "Simulated session cookie issued for SME Note Series A",
    ref: "ckt_sim_aa0144",
  },
  {
    id: "aud_2",
    at: "2026-10-15T11:22:40Z",
    action: "bind",
    actor: "Investor NL-2041",
    detail: "Wallet bound to NOTE-A policy (simulated)",
    ref: "tx_sim_91a2",
  },
  {
    id: "aud_3",
    at: "2026-10-15T11:21:05Z",
    action: "prove",
    actor: "Investor NL-2041",
    detail: "Simulated license verified · attributes not written on-chain",
    ref: "ckt_sim_7a91c2",
  },
  {
    id: "aud_4",
    at: "2026-10-14T09:00:00Z",
    action: "policy",
    actor: "Issuer desk",
    detail: "Draft policy EURQ Settlement Desk created",
    ref: "pol_eurq_settle",
  },
  {
    id: "aud_5",
    at: "2026-10-12T16:06:10Z",
    action: "allow",
    actor: "Investor DE-1188",
    detail: "Added to PF-B allowlist · transfer controls on (simulated)",
    ref: "tx_sim_44c1",
  },
];

export const WORKFLOW = [
  { n: "01", title: "Issuer sets policy", body: "Pick required attributes, trusted License Providers, and transfer mode for the asset." },
  { n: "02", title: "LP issues license", body: "A trusted License Provider issues a signed credential (simulated HMAC in this DEMO)." },
  { n: "03", title: "SP verifies + bind", body: "Gate Desk checks signature and policy, issues a session cookie, then binds a Dusk wallet." },
  { n: "04", title: "Transfer gate", body: "Attempt a transfer: allow only if bound and not revoked. Revoke flips the gate." },
];
