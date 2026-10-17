import { useCallback, useEffect, useState } from "react";
import {
  connectDuskWallet,
  disconnectDuskWallet,
  getDuskWallet,
  getWalletInstallUrl,
  readyWallet,
  walletSnapshot,
} from "../lib/duskWallet.js";

export function useDuskConnect() {
  const [snap, setSnap] = useState(() => walletSnapshot(null));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsub = () => {};
    let cancelled = false;

    (async () => {
      try {
        const wallet = await readyWallet();
        if (cancelled || !wallet) return;
        setSnap(walletSnapshot(wallet));
        unsub = wallet.subscribe(() => setSnap(walletSnapshot(wallet)));
      } catch (e) {
        if (!cancelled) setError(e?.message || "Wallet init failed");
      }
    })();

    return () => {
      cancelled = true;
      unsub();
    };
  }, []);

  const connect = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      const result = await connectDuskWallet();
      setSnap(walletSnapshot(getDuskWallet()));
      return result;
    } catch (e) {
      const code = e?.code || (e?.message === "NO_PROVIDER" ? "NO_PROVIDER" : "CONNECT_FAILED");
      const msg =
        code === "NO_PROVIDER"
          ? "No Dusk wallet extension found. Install Dusk Wallet, then retry Connect."
          : e?.message || "Connect failed";
      setError(msg);
      throw Object.assign(e instanceof Error ? e : new Error(msg), { code, message: msg });
    } finally {
      setBusy(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    setBusy(true);
    try {
      await disconnectDuskWallet();
      setSnap(walletSnapshot(getDuskWallet()));
    } finally {
      setBusy(false);
    }
  }, []);

  return {
    ...snap,
    busy,
    error,
    connect,
    disconnect,
    installUrl: getWalletInstallUrl(),
  };
}
