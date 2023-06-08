import {
  SET_CHAIN_ID,
  UPDATE_USER_BALANCE,
  UPDATE_WALLET_STATUS,
  SET_WALLET_ADDR,
  SET_PROVIDER,
  UPDATE_HEDERA_WALLET_STATUS,
  SET_HEDERA_ADDR,
  SET_TOP_HEDERA_PLAYERS,
  SET_TOP_SOLANA_PLAYERS,
  UPDATE_TOTAL_VOLUMNS,
  UPDATE_SOL_VOLUMN_BALANCE,
  UPDATE_HBAR_VOLUMN_BALANCE,
  UPDATE_HBAR_JACKPOT_BALANCE,
  UPDATE_SOL_JACKPOT_BALANCE,
  UPDATE_HBAR_JACKPOT_HISTORY,
  UPDATE_SOL_JACKPOT_HISTORY,
  UPDATE_WIN_PLAY_INDEX,
  UPDATE_LOSE_PLAY_INDEX,
  UPDATE_CONNECTION_STATUS,
  UPDATE_ACCOUNT_ID,
} from "./action.types";
import axios from "axios";
import { BACKEND_API_URL } from "../../config";

export const recordPlayHistory = (params) => {
  axios
    .post(`${BACKEND_API_URL}/PlayHistory/create`, {
      ...params,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getTopUsers = (chainId = "solana", limit = 10, skip = 0) => {
  axios
    .post(`${BACKEND_API_URL}/PlayHistory/getBylimit`, {
      limit,
      skip,
      chainId: chainId,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setConnectedWalletAddress = (address) => (dispatch) => {
  dispatch({
    type: SET_WALLET_ADDR,
    payload: address,
  });
};

export const setConnectedChainId = (chainId) => (dispatch) => {
  dispatch({
    type: SET_CHAIN_ID,
    payload: chainId,
  });
};

export const updateBalanceOfUser = (balance) => (dispatch) => {
  dispatch({
    type: UPDATE_USER_BALANCE,
    payload: balance,
  });
};

export const setWalletStatus = (status) => (dispatch) => {
  dispatch({
    type: UPDATE_WALLET_STATUS,
    payload: status,
  });
};

export const setWalletProvider = (status) => (dispatch) => {
  dispatch({
    type: SET_PROVIDER,
    payload: status,
  });
};

export const setConnectedHederaWalletAddress = (address) => (dispatch) => {
  dispatch({
    type: SET_HEDERA_ADDR,
    payload: address,
  });
};

export const setHederaWalletStatus = (status) => (dispatch) => {
  dispatch({
    type: UPDATE_HEDERA_WALLET_STATUS,
    payload: status,
  });
};

export const setHederaTopPlyaers = (players) => (dispatch) => {
  dispatch({
    type: SET_TOP_HEDERA_PLAYERS,
    payload: players,
  });
};

export const setSolanaTopPlayers = (players) => (dispatch) => {
  dispatch({
    type: SET_TOP_SOLANA_PLAYERS,
    payload: players,
  });
};

export const setVolumns = (volumns) => (dispatch) => {
  dispatch({
    type: UPDATE_TOTAL_VOLUMNS,
    payload: volumns,
  });
};

export const setHValutBalance = (bal) => (dispatch) => {
  dispatch({
    type: UPDATE_HBAR_VOLUMN_BALANCE,
    payload: bal,
  });
};

export const setSValutBalance = (bal) => (dispatch) => {
  dispatch({
    type: UPDATE_SOL_VOLUMN_BALANCE,
    payload: bal,
  });
};

export const setHJackpotBalance = (bal) => (dispatch) => {
  dispatch({
    type: UPDATE_HBAR_JACKPOT_BALANCE,
    payload: bal,
  });
};

export const setSJackpotBalance = (bal) => (dispatch) => {
  dispatch({
    type: UPDATE_SOL_JACKPOT_BALANCE,
    payload: bal,
  });
};

export const setHJackpotHistory = (histories) => (dispatch) => {
  console.log("jackpotHederaHistory ===> ", histories);
  dispatch({
    type: UPDATE_HBAR_JACKPOT_HISTORY,
    payload: histories,
  });
};

export const setSJackpotHistory = (histories) => (dispatch) => {
  console.log("jackpotSolanaHistory ===> ", histories);
  dispatch({
    type: UPDATE_SOL_JACKPOT_HISTORY,
    payload: histories,
  });
};

export const setWinPlayIndex = (index) => (dispatch) => {
  dispatch({
    type: UPDATE_WIN_PLAY_INDEX,
    payload: index,
  });
};

export const setLosePlayIndex = (index) => (dispatch) => {
  dispatch({
    type: UPDATE_LOSE_PLAY_INDEX,
    payload: index,
  });
};
