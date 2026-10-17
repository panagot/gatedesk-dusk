/** Deterministic DEMO signature — not real cryptography. */

const LP_SECRETS = {
  lp_npex: "sim_secret_npex_v1",
  lp_quantoz: "sim_secret_quantoz_v1",
  lp_demo: "sim_secret_demo_v1",
};

function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

export function signLicense(payload, lpId) {
  const secret = LP_SECRETS[lpId] || "sim_secret_unknown";
  const body = JSON.stringify({
    lpId: payload.lpId,
    attributes: [...payload.attributes].sort(),
    issuedAt: payload.issuedAt,
    subject: payload.subject,
  });
  return `sim_sig_${hashStr(body + secret)}`;
}

export function verifyLicense(license) {
  if (!license?.signature || !license?.lpId) return false;
  const expected = signLicense(license, license.lpId);
  return expected === license.signature;
}

export function makeWallet(tag = "gate") {
  const h = hashStr(`${tag}_${Date.now()}_${Math.random()}`);
  return `pkDusk_${h}${hashStr(tag + h)}`.slice(0, 44);
}

export function shortWallet(w) {
  if (!w || w.length < 12) return w || "—";
  return `${w.slice(0, 10)}…${w.slice(-6)}`;
}
