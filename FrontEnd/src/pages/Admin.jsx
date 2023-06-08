import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HeaderOfAdmin from "../components/HeaderOfAdmin";
import Button from "../components/Button";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";

import {
  BOX_COUNT,
  WIN_PERCENTAGE,
  REWARD_MUTIPLIER,
  BACKEND_API_URL,
} from "../config";
import {
  setConnectedChainId,
  setConnectedHederaWalletAddress,
  setConnectedWalletAddress,
  setHederaWalletStatus,
  setHJackpotBalance,
  setHJackpotHistory,
  setHValutBalance,
  setSJackpotBalance,
  setSJackpotHistory,
  setSValutBalance,
  setVolumns,
  setWalletProvider,
  setWalletStatus,
} from "../store/actions/auth.actions";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    setGameParams,
    depositForRewards,
    readValutBalance,
    readJackpotBalance
} from "../contract/HashConnectAPIProvider";

const Admin = () => {
  const navigate = useNavigate("/");
  const dispatch = useDispatch();
  const [depositAmount, setDepositAmount] = useState(0);
  // const [toAddr, setToAddr] = useState("");
  const [treasury, setTreasury] = useState("");
  const [jackpot, setJackpot] = useState("");
  const [treasuryPercentage, setTreasuryPercent] = useState(3.5);
  const [jackpotPercentage, setJackpotPercent] = useState(5);
  // const [box2Percentage, setBox2Percent] = useState(100);
  // const [box4Percentage, setBox4Percent] = useState(150);
  // const [box6Percentage, setBox6Percent] = useState(300);
  // const [box12Percentage, setBox12Percent] = useState(1000);
  const provider = useSelector((state) => state.auth.provider);
  const chain = useSelector((state) => state.auth.currentChainId);
  const vaultHbarBalance = useSelector((state) => state.auth.vaultHbarBalance);
  const vaultSolBalance = useSelector((state) => state.auth.vaultSolBalance);
  const jackpotHbarBalance = useSelector(
    (state) => state.auth.jackpotHbarBalance
  );
  const jackpotSolBalance = useSelector(
    (state) => state.auth.jackpotSolBalance
  );
  const jackpotHederaHistory = useSelector(
    (state) => state.auth.jackpotHbarHistory
  );
  const jackpotSolanaHistory = useSelector(
    (state) => state.auth.jackpotSolHistory
  );

  useEffect(() => {
    if (chain === "solana" || chain === "hedera") {
    } else {
      dispatch(setWalletProvider(null));
      dispatch(setConnectedWalletAddress(""));
      dispatch(setWalletStatus(false));
      dispatch(setConnectedHederaWalletAddress(""));
      dispatch(setHederaWalletStatus(false));
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getVolumnsFromDB();
    // let timerId = setInterval(() => {
    //   getVolumnsFromDB();
    // }, 3000);
    // return () => {
    //   if (timerId > 0) clearInterval(timerId);
    // };
  }, [dispatch]);

  const getVolumnsFromDB = async () => {
    axios
      .get(`${BACKEND_API_URL}/PlayHistory/volumns`)
      .then((response) => {
        let voulmns = response.data.sums;
        dispatch(setVolumns({ ...voulmns }));
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .post(`${BACKEND_API_URL}/JackpotHistory/getByLimit`, {
        limit: 3,
        chainId: "hedera",
      })
      .then((response) => {
        let history = response.data.data;
        dispatch(setHJackpotHistory([...history]));
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .post(`${BACKEND_API_URL}/JackpotHistory/getByLimit`, {
        limit: 3,
        chainId: "solana",
      })
      .then((response) => {
        let history = response.data.data;
        dispatch(setSJackpotHistory([...history]));
      })
      .catch((error) => {
        console.log(error);
      });
   
    try {
      let valutH = await readValutBalance();
      dispatch(setHValutBalance(valutH));
      let hbarBal = await readJackpotBalance();
      dispatch(setHJackpotBalance(hbarBal));
    } catch (error) {
      console.log(error);
    }
  };

  const onClickInitialize = async () => {
    if (!provider) {
      NotificationManager.error("Wallet should be connected");
      return;
    }
   
  };

  const onClickDepositReward = async () => {
    if (depositAmount == 0) {
      NotificationManager.error("Deposit Amount is 0");
      return;
    }
    if (!provider) {
      NotificationManager.error("Wallet should be connected");
      return;
    }
   
    if (chain === "hedera") {
      await depositForRewards(depositAmount);
    }
  };

  const onClickSendFromJackpot = async () => {
    // if (!isValidAddress(toAddr)) {
    //   NotificationManager.error(
    //     "Invalid address. Please check destination address again"
    //   );
    //   return;
    // }

    // if (chain === "solana") {
    //   if (!provider) {
    //     NotificationManager.error("Wallet should be connected");
    //     return;
    //   }
    //   let is_initialized = await isInitialized(provider);
    //   if (!is_initialized) {
    //     NotificationManager.error("It is not initialized yet.");
    //     return;
    //   }
    //   let toAddr = await getRandomParticipant(provider);
    //   let rewards = await sendFromJackpot(provider, toAddr);
    //   if (rewards == 0) {
    //     NotificationManager.error("Jackpot is empty");
    //   } else if (rewards != null) {
    //     axios
    //       .post(`${BACKEND_API_URL}/JackpotHistory/create`, {
    //         paidPlayer: toAddr,
    //         amount: rewards,
    //         chainId: chain,
    //       })
    //       .then((resp) => {
    //         if (resp.data.code === 0) {
    //           NotificationManager.info(
    //             `You've sent ${rewards} SOL to ${toAddr} from Jackpot`
    //           );
    //         } else {
    //           NotificationManager.error("Network error");
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         NotificationManager.error("Network error");
    //       });
    //   }
    // }
    // if (chain === "hedera") {
      //read hbar balance of jackpot
      let jackpotBal = await readJackpotBalance();
      if (jackpotBal < 1)
        return toast.warning("Insufficient Hbars on Jackpot.");
      else {
        axios
          .post(`${BACKEND_API_URL}/PlayHistory/payFromJackpot`)
          .then((response) => {
            if (response.data.code === 0) {
              toast.info(
                `You've sent ${
                  response.data.data.player || ""
                } HBars from Jackpot `
              );
            } else {
              toast.error("Network error");
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error("Network error");
          });
      }
    // }
  };

  const onClickUpdateConfig = async () => {
    
    if (treasuryPercentage == 0) {
      NotificationManager.error("Treasury percentage is 0");
      return;
    }
    if (jackpotPercentage == 0) {
      NotificationManager.error("Jackpot percentage is 0");
      return;
    }
    if (!provider) {
      NotificationManager.error("Wallet should be connected");
      return;
    }
    if (chain === "solana") {
      let treasuryPro = Math.ceil(treasuryPercentage * 1000);
      let jackpotPro = Math.floor((treasuryPro * jackpotPercentage) / 100);
      treasuryPro -= jackpotPro;
      
    }
    if (chain === "hedera") {
      await setGameParams(
        treasury,
        jackpot,
        treasuryPercentage * 10,
        jackpotPercentage * 10
      );
    }
  };

  return (
    <div className="mt-[100px] container ">
      <div className="overflow-x-auto text-white flex flex-col items-center justify-center">
        {/* <div className="flex justify-center my-10">
            <Button label={"Initialize"} onClick={() => onClickInitialize()} />
          </div> */}
        <div className="w-full md:w-8/12 border-2 rounded-xl border-white  mt-10 py-10 flex flex-col items-center text-xl">
          {chain === "hedera" && (
            <div className="w-full px-2 md:w-6/12 flex justify-between">
              <div className="w-5/12">Hedera Vault Balance: </div>
              <div className="w-5/12 text-end ">
                {Number(vaultHbarBalance).toFixed(2)} HBAR{" "}
              </div>
            </div>
          )}
          {chain === "solana" && (
            <div className="w-full px-2 md:w-6/12 flex justify-between">
              <div className="w-5/12">Solana Vault Balance: </div>
              <div className="w-5/12 text-end ">
                {Number(vaultSolBalance).toFixed(2)} SOL{" "}
              </div>
            </div>
          )}
          {chain === "hedera" && (
            <>
              <div className="w-full pt-10 px-2 md:w-6/12 flex justify-between">
                <div className="w-5/12">Hedera Jackpot Today: </div>
                <div className="w-5/12 text-end ">
                  {Number(jackpotHbarBalance).toFixed(2)} HBAR{" "}
                </div>
              </div>
              <div className="w-full px-2 md:w-6/12 flex justify-between">
                <div className="w-full">3 days Jackpot payment history: </div>
              </div>
              <div className="overflow-x-auto text-white block sm:flex justify-center  md:w-full w-[100vw]">
                <table className="table-auto border-spacing-x-5 border-spacing-y-2  ">
                  <thead>
                    <tr className=" ">
                      <th className="text-center  p-1 md:p-3">Player</th>
                      <th className="text-center  p-1 md:p-3">Chain</th>
                      <th className="text-center  p-1 md:p-3">Amount(HBAR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jackpotHederaHistory &&
                      jackpotHederaHistory.length > 0 &&
                      jackpotHederaHistory.map(
                        (item, index) =>
                          item._id !== "" && (
                            <tr className=" " key={index}>
                              <td className="text-center  p-1 md:p-3">
                                {item.paidPlayer}
                              </td>
                              <td className="text-center  p-1 md:p-3">
                                Hedera
                              </td>
                              <td className="text-center  p-1 md:p-3">
                                {Number(item.amount).toFixed(2)}
                              </td>
                            </tr>
                          )
                      )}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {chain === "solana" && (
            <>
              <div className="w-full pt-10 px-2 md:w-6/12 flex justify-between">
                <div className="w-5/12">Solana Jackpot Today: </div>
                <div className="w-5/12 text-end ">
                  {Number(jackpotSolBalance).toFixed(2)} SOL{" "}
                </div>
              </div>
              <div className="w-full px-2 md:w-6/12 flex justify-between">
                <div className="w-full">3 days Jackpot payment history: </div>
              </div>
              <div className="overflow-x-auto text-white block sm:flex justify-center  md:w-full w-[100vw]">
                <table className="table-auto border-spacing-x-5 border-spacing-y-2  ">
                  <thead>
                    <tr className=" ">
                      <th className="text-center  p-1 md:p-3">Player</th>
                      <th className="text-center  p-1 md:p-3">Chain</th>
                      <th className="text-center  p-1 md:p-3">Amount(SOL)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jackpotSolanaHistory &&
                      jackpotSolanaHistory.length > 0 &&
                      jackpotSolanaHistory.map(
                        (item, index) =>
                          item._id !== "" && (
                            <tr className=" " key={index}>
                              <td className="text-center  p-1 md:p-3">
                                {item.paidPlayer.substring(0, 16) +
                                  "..." +
                                  item.paidPlayer.substring(
                                    item.paidPlayer.length - 16,
                                    item.paidPlayer.length
                                  )}
                              </td>
                              <td className="text-center  p-1 md:p-3">
                                Solana
                              </td>
                              <td className="text-center  p-1 md:p-3">
                                {Number(item.amount).toFixed(2)}
                              </td>
                            </tr>
                          )
                      )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
        <div className="w-full md:w-8/12 border-2 rounded-xl border-white  flex justify-center my-10 py-10 flex-wrap">
          <div className="relative w-full md:w-[300px] pb-10 mx-6 flex flex-col align-middle">
            <span className="text-white bold text-center">
              Treasury address
            </span>
            <input
              className="w-[300px] p-2 text-gray-100 bg-transparent border-2 border-[#bcc42a] text-center text-xl  rounded-[10px] shadow-sm outline-none appearance-none"
              value={treasury}
              onChange={(e) => setTreasury(e.target.value)}
            ></input>
          </div>
          <div className="relative w-full md:w-[300px] pb-10 mx-6 flex flex-col align-middle">
            <span className="text-white bold text-center">Jackpot address</span>
            <input
              className="w-[300px] p-2 text-gray-100 bg-transparent border-2 border-[#bcc42a] text-center text-xl  rounded-[10px] shadow-sm outline-none appearance-none"
              value={jackpot}
              onChange={(e) => setJackpot(e.target.value)}
            ></input>
          </div>
          <div className="relative w-full md:w-[300px] pb-10 mx-6 flex flex-col align-middle">
            <span className="text-white bold text-center">
              Treasury percentage(%)
            </span>
            <input
              className="w-[300px] p-2 text-gray-100 bg-transparent border-2 border-[#bcc42a] text-center text-xl  rounded-[10px] shadow-sm outline-none appearance-none"
              value={treasuryPercentage}
              min={1}
              max={100}
              step={0.1}
              onChange={(e) => setTreasuryPercent(e.target.value)}
            ></input>
          </div>
          {chain === "hedera" && (
            <div className="relative w-full md:w-[300px] pb-10 mx-6 flex flex-col align-middle">
              <span className="text-white bold text-center">
                Jackpot percentage to treasury(%)
              </span>
              <input
                className="w-[300px] p-2 text-gray-100 bg-transparent border-2 border-[#bcc42a] text-center text-xl  rounded-[10px] shadow-sm outline-none appearance-none"
                value={jackpotPercentage}
                min={1}
                max={100}
                step={0.1}
                onChange={(e) => setJackpotPercent(e.target.value)}
              ></input>
            </div>
          )}
          {/* <div className="relative w-full md:w-[300px] pb-10 mx-6 flex flex-col align-middle">
              <span className="text-white bold text-center">
                Rewards in 2 Boxs mode (%)
              </span>
              <input
                className="w-[300px] p-2 text-gray-100 bg-transparent border-2 border-[#bcc42a] text-center text-xl  rounded-[10px] shadow-sm outline-none appearance-none"
                value={box2Percentage}
                min={1}
                max={100}
                step={0.1}
                onChange={(e) => setBox2Percent(e.target.value)}
              ></input>
            </div>
            <div className="relative w-full md:w-[300px] pb-10 mx-6 flex flex-col align-middle">
              <span className="text-white bold text-center">
                Rewards in 4 Boxs mode (%)
              </span>
              <input
                className="w-[300px] p-2 text-gray-100 bg-transparent border-2 border-[#bcc42a] text-center text-xl  rounded-[10px] shadow-sm outline-none appearance-none"
                value={box4Percentage}
                min={1}
                max={100}
                step={0.1}
                onChange={(e) => setBox4Percent(e.target.value)}
              ></input>
            </div>
            <div className="relative w-full md:w-[300px] pb-10 mx-6 flex flex-col align-middle">
              <span className="text-white bold text-center">
                Rewards in 6 Boxs mode (%)
              </span>
              <input
                className="w-[300px] p-2 text-gray-100 bg-transparent border-2 border-[#bcc42a] text-center text-xl  rounded-[10px] shadow-sm outline-none appearance-none"
                value={box6Percentage}
                min={1}
                max={100}
                step={0.1}
                onChange={(e) => setBox6Percent(e.target.value)}
              ></input>
            </div>
            <div className="relative w-full md:w-[300px] pb-10 mx-6 flex flex-col align-middle">
              <span className="text-white bold text-center">
                Rewards in 12 Boxs mode (%)
              </span>
              <input
                className="w-[300px] p-2 text-gray-100 bg-transparent border-2 border-[#bcc42a] text-center text-xl  rounded-[10px] shadow-sm outline-none appearance-none"
                value={box12Percentage}
                min={1}
                max={100}
                step={0.1}
                onChange={(e) => setBox12Percent(e.target.value)}
              ></input>
            </div> */}
          <div className="w-full flex justify-center pb-3">
            <Button
              label={"Apply Game Parameters"}
              onClick={onClickUpdateConfig}
              className="connectBtn"
            />
          </div>
        </div>
        <div className="w-full md:w-8/12  border-2 rounded-xl border-white  flex justify-center mb-10 py-10 items-center">
          <div className="text-white bold text-center">
            Click this button to pay HBAR/SOL in jackpot to a random player.
          </div>
          <Button
            className="ml-10 connectBtn"
            label={"Empty Jackpot"}
            onClick={() => {
              onClickSendFromJackpot();
            }}
          />
        </div>
        <div className="w-full md:w-8/12  border-2 rounded-xl border-white  flex justify-center py-10 items-center gap-3">
          <span className="text-white bold text-center">
            How many HBAR/SOl will you deposit for reward?
          </span>
          <input
            className="w-[300px] p-2 text-gray-100 bg-transparent border-2 border-[#bcc42a] text-center text-xl  rounded-[10px] shadow-sm outline-none appearance-none"
            value={depositAmount}
            min={1}
            max={100}
            step={0.1}
            onChange={(e) => setDepositAmount(e.target.value)}
          ></input>
          <Button
            label={"Deposit"}
            onClick={() => {
              onClickDepositReward();
            }}
            className="connectBtn"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
