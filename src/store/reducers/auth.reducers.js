import {
  SET_WALLET_ADDR,
  UPDATE_WALLET_STATUS,
  UPDATE_USER_BALANCE,
  SET_CHAIN_ID,
  CURRENT_USER,
  SET_PROVIDER,
  UPDATE_HEDERA_WALLET_STATUS,
  SET_HEDERA_ADDR,
  SET_TOP_HEDERA_PLAYERS,
  SET_TOP_SOLANA_PLAYERS,
  UPDATE_TOTAL_VOLUMNS,
  UPDATE_HBAR_VOLUMN_BALANCE,
  UPDATE_SOL_VOLUMN_BALANCE,
  UPDATE_HBAR_JACKPOT_BALANCE,
  UPDATE_SOL_JACKPOT_BALANCE,
  UPDATE_SOL_JACKPOT_HISTORY,
  UPDATE_HBAR_JACKPOT_HISTORY,
  UPDATE_LOSE_PLAY_INDEX,
  UPDATE_WIN_PLAY_INDEX,
  UPDATE_ACCOUNT_ID,
} from "../actions/action.types";

const auth = {
  currentWallet: "",
  currentChainId: "hedera",
  balance: 0,
  walletStatus: false,
  provider: null,
  hederaWalletStatus: false,
  hederaWallet: "",
  topHederaPlayers: [],
  topSolanaPlayers: [],
  totalHbarVolumn: 0,
  totalSolVolumn: 0,
  weeklyHbarVolumn: 0,
  weeklySolVolumn: 0,
  vaultHbarBalance: 0,
  vaultSolBalance: 0,
  jackpotHbarBalance: 0,
  jackpotSolBalance: 0,
  jackpotHbarHistory: [],
  jackpotSolHistory: [],
  winPlayIndex: 0,
  losePlayIndex: 0,
};

export function Auth(state = auth, action) {
  switch (action.type) {
    case UPDATE_WIN_PLAY_INDEX:
      return {
        ...state,
        winPlayIndex: action.payload,
      };
    case UPDATE_LOSE_PLAY_INDEX:
      return {
        ...state,
        losePlayIndex: action.payload,
      };
    case UPDATE_SOL_JACKPOT_HISTORY:
      console.log("jackpotSolanaHistory ===> ", action.payload);
      return {
        ...state,
        jackpotSolHistory: action.payload,
      };
    case UPDATE_HBAR_JACKPOT_HISTORY:
      console.log("jackpotHederaHistory ===> ", action.payload);
      return {
        ...state,
        jackpotHbarHistory: action.payload,
      };
    case UPDATE_SOL_JACKPOT_BALANCE:
      return {
        ...state,
        jackpotSolBalance: action.payload,
      };
    case UPDATE_HBAR_JACKPOT_BALANCE:
      return {
        ...state,
        jackpotHbarBalance: action.payload,
      };
    case UPDATE_SOL_VOLUMN_BALANCE:
      return {
        ...state,
        vaultSolBalance: action.payload,
      };
    case UPDATE_HBAR_VOLUMN_BALANCE:
      return {
        ...state,
        vaultHbarBalance: action.payload,
      };
    case UPDATE_TOTAL_VOLUMNS:
      return {
        ...state,
        totalHbarVolumn: action.payload.htotal,
        totalSolVolumn: action.payload.stotal,
        weeklyHbarVolumn: action.payload.hweek,
        weeklySolVolumn: action.payload.sweek,
      };
    case SET_TOP_HEDERA_PLAYERS:
      return {
        ...state,
        topHederaPlayers: action.payload,
      };
    case SET_TOP_SOLANA_PLAYERS:
      return {
        ...state,
        topSolanaPlayers: action.payload,
      };
    case SET_HEDERA_ADDR:
      return {
        ...state,
        hederaWallet: action.payload,
      };
    case UPDATE_HEDERA_WALLET_STATUS:
      return {
        ...state,
        hederaWalletStatus: action.payload,
      };
    case SET_WALLET_ADDR:
      return {
        ...state,
        currentWallet: action.payload,
      };
    case SET_CHAIN_ID:
      return {
        ...state,
        currentChainId: action.payload,
      };
    case UPDATE_USER_BALANCE:
      return { ...state, balance: action.payload };
    case UPDATE_WALLET_STATUS:
      return { ...state, walletStatus: action.payload };
    case SET_PROVIDER:
      return { ...state, provider: action.payload };
    default:
      return { ...state };
  }
}

export function GetCurrentUser(state, action) {
  if (action.type === CURRENT_USER) {
    return state.user;
  }
}
