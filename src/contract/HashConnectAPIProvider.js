import { HashConnect, HashConnectTypes, MessageTypes } from "hashconnect";
import React, { useMemo } from "react";
import {
  Hbar,
  ContractExecuteTransaction,
  ContractFunctionParameters,
} from "@hashgraph/sdk";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  TREASURY_ID,
  JACKPOT_ID,
  MIRROR_NODE_URL,
  CONTRACT_ID,
  HBAR_DECIMAL,
  GET_ACCOUNT_PREFIX,
  BACKEND_API_URL,
} from "../config";
import {
  setConnectedHederaWalletAddress,
  setHederaWalletStatus,
} from "../store/actions/auth.actions";

import { store } from "../store";

const env = "mainnet";

export const hc = new HashConnect();

const getPairingData = () => {
  if (hc.hcData.pairingData.length > 0) {
    return hc.hcData.pairingData[hc.hcData.pairingData.length - 1];
  }
};

export const hcInitPromise = new Promise(async (resolve) => {
  const appMetadata = {
    name: "PMX Gaming",
    description: "",
    icon: window.location.origin + "/logo.png",
    url: window.location.origin,
  };
  const initResult = await hc.init(appMetadata, env, true);
  resolve(initResult);
});

export const getProvider = async () => {
  await hcInitPromise;
  const accId = getPairingData()?.accountIds[0];
  const topic = getPairingData()?.topic;
  if (!accId || !topic) {
    throw new Error("No paired account");
  }

  const provider = hc.getProvider(env, topic, accId);
  return provider;
};

export const getSigner = async () => {
  const provider = await getProvider();
  const signer = hc.getSigner(provider);
  return signer;
};

export const HashConnectClient = () => {
  const dispatch = useDispatch();
  const syncWithHashConnect = useMemo(() => {
    return () => {
      const accId = getPairingData()?.accountIds[0];
      if (accId) {
        dispatch(setConnectedHederaWalletAddress(accId));
        dispatch(setHederaWalletStatus(true));
      } else {
        dispatch(setConnectedHederaWalletAddress(""));
        dispatch(setHederaWalletStatus(false));
      }
    };
  }, [dispatch]);

  syncWithHashConnect();
  hcInitPromise.then(() => {
    syncWithHashConnect();
  });
  hc.pairingEvent.on(() => {
    syncWithHashConnect();
  });
  hc.connectionStatusChangeEvent.on(() => {
    syncWithHashConnect();
  });
  return null;
};

export const setGameParams = async (
  treasuryId,
  jackpotId,
  treasuryPercentage,
  jackpotPercentage
) => {
  const transaction = new ContractExecuteTransaction()
    .setContractId(CONTRACT_ID)
    .setGas(1000000)
    .setTransactionMemo("PMX Gaming")
    .setFunction(
      "setGameParams",
      new ContractFunctionParameters()
        .addAddress(treasuryId.toSolidityAddress())
        .addAddress(jackpotId.toSolidityAddress())
        .addUint32(treasuryPercentage)
        .addUint32(jackpotPercentage)
        .addUint32Array([2, 4, 6, 12])
        .addUint32Array([1000, 1500, 3000, 10000])
    );

  const provider = await getProvider();
  const _signer = hc.getSigner(provider);

  const txFreeze = await transaction.freezeWithSigner(_signer);
  if (!txFreeze) return false;
  const txSign = await txFreeze.signWithSigner(_signer);
  if (!txSign) return false;
  const txSubmit = await txSign.executeWithSigner(_signer);
  if (!txSubmit) return false;

  const txRx = await provider.getTransactionReceipt(txSubmit.transactionId);

  console.log(
    "Crystal setGameParams() log >>>>> The transaction txResponse is ",
    txRx
  );
  if (txRx.status._code === 22) return true;
  return false;
};

export const depositForRewards = async (depositAmount) => {
  const transaction = new ContractExecuteTransaction()
    .setContractId(CONTRACT_ID)
    .setGas(1000000)
    .setFunction("depositForRewards")
    .setTransactionMemo("PMX Gaming")
    .setPayableAmount(new Hbar(depositAmount));

  const provider = await getProvider();
  const _signer = hc.getSigner(provider);
  const txFreeze = await transaction.freezeWithSigner(_signer);
  if (!txFreeze) return false;
  const txSign = await txFreeze.signWithSigner(_signer);
  if (!txSign) return false;
  const txSubmit = await txSign.executeWithSigner(_signer);
  if (!txSubmit) return false;
  const txRx = await provider.getTransactionReceipt(txSubmit.transactionId);

  console.log(
    "Crystal depositForRewards() log >>>>> The transaction txResponse is ",
    txRx
  );
  if (txRx.status._code === 22) return true;
  return false;
};

export const playBetting = async (bettingAmount, boxCount, selectedIndex) => {
  try {
    if (bettingAmount <= 0) {
      console.log("Invalid bettings amount.");
      return null;
    }
    const transaction = new ContractExecuteTransaction()
      .setContractId(CONTRACT_ID)
      .setGas(1000000)
      .setTransactionMemo("PMX Gaming")
      .setPayableAmount(new Hbar(bettingAmount))
      .setFunction(
        "playBetting",
        new ContractFunctionParameters()
          .addUint256(boxCount)
          .addUint256(selectedIndex)
      );

    const provider = await getProvider();
    const _signer = hc.getSigner(provider);

    const txFreeze = await transaction.freezeWithSigner(_signer);
    if (!txFreeze) return null;
    const txSign = await txFreeze.signWithSigner(_signer);
    if (!txSign) return null;
    const txSubmit = await txSign.executeWithSigner(_signer);
    if (!txSubmit) return null;

    const txRx = await provider.getTransactionReceipt(txSubmit.transactionId);

    console.log(
      "Crystal playBetting() log >>>>> The transaction txResponse is ",
      txRx
    );
    let gameResult = null;

    console.log("txRx ===> ", txRx);

    if (txRx.status._code === 22) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await axios
        .post(`${BACKEND_API_URL}/PlayHistory/askwinning`, {
          account: store.getState().auth.hederaWallet,
        })
        .then((response) => {
          console.log(response);
          if (response.data.code === 0) gameResult = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("aaaaaaaaaa   : ", txRx.status);
      return null;
    }
    console.log("gameResult ===> ", gameResult);
    return gameResult;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const readUserBalance = async (userWalletId) => {
  try {
    const userBalance = await axios(
      `${MIRROR_NODE_URL}${GET_ACCOUNT_PREFIX}${userWalletId}`
    );
    return userBalance.data.balance.balance / 100000000 || 0;
  } catch (error) {
    console.log("readUserBalance() : ", error);
    return 0;
  }
};

export const readJackpotBalance = async () => {
  try {
    const userBalance = await axios(
      `${MIRROR_NODE_URL}${GET_ACCOUNT_PREFIX}${JACKPOT_ID}`
    );
    return userBalance.data.balance.balance / 100000000 || 0;
  } catch (error) {
    console.log("readJackpotBalance() : ", error);
    return 0;
  }
};

export const readValutBalance = async () => {
  try {
    const vaultBal = await axios(
      `${MIRROR_NODE_URL}${GET_ACCOUNT_PREFIX}${CONTRACT_ID}`
    );
    console.log("readValutBalance() : ", vaultBal);
    return vaultBal.data.balance.balance / 100000000 || 0;
  } catch (error) {
    console.log("readValutBalance() : ", error);
    return 0;
  }
};

export const readGameBalances = async () => {
  let promiseArray = [];
  promiseArray.push(
    axios(`${MIRROR_NODE_URL}${GET_ACCOUNT_PREFIX}${CONTRACT_ID}`)
  );
  promiseArray.push(
    axios(`${MIRROR_NODE_URL}${GET_ACCOUNT_PREFIX}${TREASURY_ID}`)
  );
  promiseArray.push(
    axios(`${MIRROR_NODE_URL}${GET_ACCOUNT_PREFIX}${CONTRACT_ID}`)
  );
  let resultArray = [];
  await Promise.all(promiseArray)
    .then((values) => {
      resultArray.push(values[0].data.balance.balance / HBAR_DECIMAL);
      resultArray.push(values[1].data.balance.balance / HBAR_DECIMAL);
      resultArray.push(values[2].data.balance.balance / HBAR_DECIMAL);
    })
    .catch((error) => {
      console.log("readGameBalances() : ", error);
    });
  return resultArray;
};
