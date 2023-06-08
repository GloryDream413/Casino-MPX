export const BACKEND_API_URL = "https://pmxgaming.link/api";

export const CONTRACT_ID = "0.0.2121987";
export const TREASURY_ID = "0.0.2022071";
export const JACKPOT_ID = "0.0.2022444";

export const MIRROR_NODE_URL = "https://mainnet-public.mirrornode.hedera.com";

export const NETWORK_TYPE = "mainnet";
export const MIRROR_NET_URL = "https://mainnet-public.mirrornode.hedera.com";
export const GET_ACCOUNT_PREFIX = "/api/v1/accounts/";
export const IPFS_URL = "https://hashpack.b-cdn.net/ipfs/";
export const HBAR_DECIMAL = 100000000;

export const ADMIN_WALLET_ON_HEDERA = "0.0.2022071";

export const EARNING_RATE = {
  2: 1,
  4: 1.5,
  6: 3,
  12: 10,
};

export const ADMIN_WALLET_ON_SOLONA =
  "XGffmRzkDSFGiLGNRLLxsVepGAqSKPvMPJm6xYGavkm";
export const TREASURY_WALLET_KEY =
  "XGffmRzkDSFGiLGNRLLxsVepGAqSKPvMPJm6xYGavkm";

export const GLOBAL_STATE_SEED = "GLOBAL-STATE-SEED";
export const USER_STATE_SEED = "USER-STATE-SEED";
export const VAULT_SEED = "VAULT_SEED";
export const JACKPOT_SEED = "JACKPOT_SEED";

export const BOX_COUNT = [2, 4, 6, 12];
export const WIN_PERCENTAGE = [47, 23, 15, 7];
export const REWARD_MUTIPLIER = [10, 15, 30, 100];

export const BET_RANGE = {
  hedera: { min: 10, max: 500, step: 1 },
  solana: { min: 0.05, max: 2.0, step: 0.1 },
};
