import { createDuskWallet, DUSK_CHAIN_PRESETS } from "@dusk/connect";

const WALLET_INSTALL =
  "https://docs.dusk.network/developer/integrations/dusk-connect/";

let singleton = null;

export function getWalletInstallUrl() {
  return WALLET_INSTALL;
}

export function getDuskWallet() {
  if (typeof window === "undefined") return null;
  if (!singleton) {
    singleton = createDuskWallet({
      preferredProviderId: null,
      waitForProvider: true,
      providerWaitOptions: { timeoutMs: 2500 },
      rememberLastUsedProvider: true,
    });
  }
  return singleton;
}

export async function readyWallet() {
  const wallet = getDuskWallet();
  if (!wallet) return null;
  await wallet.ready();
  return wallet;
}

export function walletSnapshot(wallet) {
  if (!wallet) {
    return {
      ready: false,
      providers: [],
      connected: false,
      account: null,
      profileId: null,
      chainId: null,
      providerName: null,
    };
  }
  const s = wallet.state;
  return {
    ready: true,
    providers: s.availableProviders || [],
    connected: Boolean(s.selectedAddress || s.selectedProfile),
    account: s.selectedAddress || s.selectedProfile?.account || null,
    profileId: s.selectedProfile?.profileId || null,
    chainId: s.chainId || null,
    providerName: wallet.providerInfo?.name || null,
  };
}

export async function connectDuskWallet() {
  const wallet = await readyWallet();
  if (!wallet) throw new Error("Wallet SDK unavailable");

  const providers = wallet.providers?.length
    ? wallet.providers
    : await wallet.discoverProviders({ timeoutMs: 2000 });

  if (!providers?.length && !wallet.provider) {
    const err = new Error("NO_PROVIDER");
    err.code = "NO_PROVIDER";
    throw err;
  }

  if (!wallet.provider && providers?.length) {
    await wallet.selectProvider(providers[0].uuid);
  }

  try {
    if (typeof wallet.switchChain === "function") {
      await wallet.switchChain({ chainId: DUSK_CHAIN_PRESETS.testnet });
    }
  } catch {
    /* wallet may already be on testnet or refuse switch */
  }

  const profiles = await wallet.connect({
    label: "Gate Desk",
    reason: "Bind this Dusk account as an eligible holder",
  });
  const profile = profiles?.[0] || wallet.state.selectedProfile;
  const account = profile?.account || wallet.state.selectedAddress;
  if (!account) throw new Error("Wallet connected but no account returned");
  return {
    account,
    profileId: profile?.profileId || null,
    chainId: wallet.state.chainId || DUSK_CHAIN_PRESETS.testnet,
    providerName: wallet.providerInfo?.name || "Dusk wallet",
  };
}

export async function disconnectDuskWallet() {
  const wallet = getDuskWallet();
  if (!wallet) return;
  try {
    await wallet.disconnect();
  } catch {
    /* ignore */
  }
}
