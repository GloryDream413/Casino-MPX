import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setConnectedChainId,
  setHJackpotBalance,
  setHValutBalance,
  setSJackpotBalance,
  setSValutBalance,
  setVolumns,
} from "../store/actions/auth.actions";
import { BACKEND_API_URL } from "../config";
import { checkBalance } from "../contract/helpers";
import {  readValutBalance, readJackpotBalance  } from "../contract/HashConnectAPIProvider";

export const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalHbarVolumn = useSelector((state) => state.auth.totalHbarVolumn);
  const totalSolVolumn = useSelector((state) => state.auth.totalSolVolumn);
  const weeklyHbarVolumn = useSelector((state) => state.auth.weeklyHbarVolumn);
  const weeklySolVolumn = useSelector((state) => state.auth.weeklySolVolumn);
  const vaultHbarBalance = useSelector((state) => state.auth.vaultHbarBalance);
  const vaultSolBalance = useSelector((state) => state.auth.vaultSolBalance);
  const jackpotHbarBalance = useSelector(
    (state) => state.auth.jackpotHbarBalance
  );
  const jackpotSolBalance = useSelector(
    (state) => state.auth.jackpotSolBalance
  );

  useEffect(() => {
    dispatch(setConnectedChainId(""));
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
        console.log(" volumns ===> ", response.data.sums);
        let voulmns = response.data.sums;
        dispatch(setVolumns({ ...voulmns }));
      })
      .catch((error) => {
        console.log(error);
      });
    try {
   
      let valutH = await readValutBalance();
      dispatch(setHValutBalance(valutH));
     
      let hbarBal = await readJackpotBalance();
      dispatch(setHJackpotBalance(hbarBal));
    } catch (error) {}
  };

  return (
    <div className="mt-[100px]  ">
      <div className="flex justify-center text-center my-3">
        <h1 className="font-arial text-[36px] md:text-[56px] text-white max-w-[600px] font-bold">
          PMX Gaming, <br></br>your lucky spot.
        </h1>
      </div>
      <div className="flex flex-wrap justify-center ml-[125px] mt-10 md:mt-0">
        <div className="relative">
          <div className="flex flex-wrap justify-center ">
            <div className="relative m-1">
              <img src="/images/cardbg.png" className="max-w-[499px]" alt="" />
              <div className="absolute top-0 p-12 pt-8 w-[390px]">
                <h2 className="text-[36px] font-bold ml-2">Hedera Network</h2>
                <div className="text-xl ml-2">Click the logo to play game</div>
                <div className="flex justify-center items-center my-5">
                  <img
                    src="/images/coin1.png"
                    alt=""
                    className="cursor-pointer homeBtn"
                    onClick={() => {
                      dispatch(setConnectedChainId("hedera"));
                      navigate("/hedera");
                    }}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <div className="w-full flex justify-between">
                    <div className="w-5/12">Total Volume: </div>
                    <div className="w-5/12  text-end ">
                      {Number(totalHbarVolumn).toFixed(2)} HBAR{" "}
                    </div>
                  </div>
                  <div className="w-full flex justify-between">
                    <div className="w-5/12">Weekly Volume: </div>
                    <div className="w-5/12 text-end ">
                      {Number(weeklyHbarVolumn).toFixed(2)} HBAR{" "}
                    </div>
                  </div>
                  <div className="w-full flex justify-between">
                    <div className="w-5/12">Jackpot Today: </div>
                    <div className="w-5/12 text-end ">
                      {Number(jackpotHbarBalance).toFixed(2)} HBAR{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative m-1 -mt-24 md:mt-1">
              <img src="/images/cardbg.png" className="max-w-[499px]" alt="" />
              <div className="absolute top-0 p-12 pt-8 w-[390px]">
                <h2 className="text-[36px] font-bold ml-2">Solana Network</h2>
                <div className="text-xl ml-2">Click the logo to play game</div>
                <div className="flex justify-center items-center my-5">
                  <img
                    src="/images/coin2.png"
                    alt=""
                    className="cursor-pointer homeBtn"
                    onClick={() => {
                      dispatch(setConnectedChainId("solana"));
                      navigate("/solana");
                    }}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <div className="w-full flex justify-between">
                    <div className="w-5/12">Total Volume: </div>
                    <div className="w-5/12 text-end ">
                      {Number(totalSolVolumn).toFixed(2)} SOL{" "}
                    </div>
                  </div>
                  <div className="w-full flex justify-between">
                    <div className="w-5/12">Weekly Volume: </div>
                    <div className="w-5/12 text-end ">
                      {Number(weeklySolVolumn).toFixed(2)} SOL{" "}
                    </div>
                  </div>
                  <div className="w-full flex justify-between">
                    <div className="w-5/12">Jackpot Today: </div>
                    <div className="w-5/12 text-end ">
                      {Number(jackpotSolBalance).toFixed(2)} SOL{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
