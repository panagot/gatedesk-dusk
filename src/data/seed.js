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

export const INITIAL_POLICIES = [
  {
    id: "pol_note_a",
    name: "SME Note Series A",
    asset: "NOTE-A · €2.4M",
    status: "live",
    requireAll: ["accredited", "kyc_l2", "pep_clear"],
    requireAny: ["jurisdiction_nl", "jurisdiction_eu"],
    trustedLps: ["lp_npex", "lp_demo"],
    transferMode: "allowlist",
    createdAt: "2026-10-02T10:00:00Z",
    holders: 18,
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
    holders: 42,
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
    label: "Investor · NL-2041",
    wallet: "dusk1q…8f2a",
    attributes: ["accredited", "kyc_l2", "jurisdiction_nl", "pep_clear"],
    lpId: "lp_npex",
    status: "bound",
    policies: ["pol_note_a"],
    provedAt: "2026-10-15T11:22:00Z",
    cookieRef: "ckt_7a91…c2",
  },
  {
    id: "inv_02",
    label: "Investor · DE-1188",
    wallet: "dusk1q…3bb0",
    attributes: ["accredited", "kyc_l2", "jurisdiction_eu", "pep_clear", "eea_retail"],
    lpId: "lp_quantoz",
    status: "bound",
    policies: ["pol_note_a", "pol_fund_b"],
    provedAt: "2026-10-12T16:05:00Z",
    cookieRef: "ckt_12ef…90",
  },
  {
    id: "inv_03",
    label: "Investor · pending",
    wallet: null,
    attributes: ["kyc_l2", "jurisdiction_eu"],
    lpId: "lp_demo",
    status: "proved",
    policies: [],
    provedAt: "2026-10-16T08:40:00Z",
    cookieRef: "ckt_aa01…44",
  },
];

export const INITIAL_AUDIT = [
  {
    id: "aud_1",
    at: "2026-10-16T08:40:12Z",
    action: "prove",
    actor: "Investor · pending",
    detail: "Citadel session cookie issued · DEMO LP",
    ref: "ckt_aa01…44",
  },
  {
    id: "aud_2",
    at: "2026-10-15T11:22:40Z",
    action: "bind",
    actor: "Investor · NL-2041",
    detail: "Wallet dusk1q…8f2a bound to NOTE-A policy",
    ref: "tx_demo_91a2",
  },
  {
    id: "aud_3",
    at: "2026-10-15T11:21:05Z",
    action: "prove",
    actor: "Investor · NL-2041",
    detail: "ZK proof verified · attributes not revealed on-chain",
    ref: "ckt_7a91…c2",
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
    actor: "Investor · DE-1188",
    detail: "Added to PF-B allowlist · transfer controls on",
    ref: "tx_demo_44c1",
  },
];

export const WORKFLOW = [
  { n: "01", title: "Issuer sets policy", body: "Pick required attributes, trusted License Providers, and transfer mode for the asset." },
  { n: "02", title: "Investor proves", body: "Citadel ZK session shows a valid license exists — attributes stay off-chain unless disclosed." },
  { n: "03", title: "Bind wallet", body: "Eligible session binds to a Dusk wallet. Holder rights follow the wallet, not a leaked identity." },
  { n: "04", title: "Enforce & audit", body: "Allowlist / controlled transfers gate the asset. Every prove, bind, and revoke is logged." },
];
