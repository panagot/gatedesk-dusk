import { useDuskConnect } from "../hooks/useDuskConnect.js";
import { shortWallet } from "../lib/simCrypto.js";

/**
 * Live-beta wallet bind via Dusk Connect.
 * Falls back to a clearly labeled local key only when no extension is present.
 */
export function ConnectBind({ value, onChange, onConnected }) {
  const dusk = useDuskConnect();

  async function onConnect() {
    try {
      const r = await dusk.connect();
      onChange(r.account);
      onConnected?.(r);
    } catch {
      /* error surfaced via dusk.error */
    }
  }

  return (
    <div className="form-grid" style={{ gap: "0.75rem" }}>
      <div className="field">
        <label htmlFor="wallet">Dusk account (Connect)</label>
        <input
          id="wallet"
          className="mono"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Connect a wallet or paste account id"
        />
        <div className="hint">
          {dusk.connected && dusk.account
            ? `Connected · ${dusk.providerName || "wallet"} · ${shortWallet(dusk.account)}`
            : dusk.providers?.length
              ? `${dusk.providers.length} wallet provider(s) discovered`
              : "Looking for Dusk Wallet extension…"}
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <button type="button" className="btn" onClick={onConnect} disabled={dusk.busy}>
          {dusk.busy ? "Connecting…" : dusk.connected ? "Reconnect" : "Connect Dusk wallet"}
        </button>
        {dusk.connected && (
          <button type="button" className="btn ghost" onClick={() => dusk.disconnect()} disabled={dusk.busy}>
            Disconnect
          </button>
        )}
        <a className="btn ghost" href={dusk.installUrl} target="_blank" rel="noreferrer">
          Install / docs
        </a>
      </div>

      {dusk.error && (
        <div className="callout" style={{ background: "var(--rust-soft)" }}>
          <strong>{dusk.error}</strong>
          <div style={{ marginTop: "0.35rem", fontSize: "0.88rem" }}>
            Without an extension you can still paste a testnet account id for desk testing — label it
            honestly as unbound-to-extension.
          </div>
        </div>
      )}
    </div>
  );
}
