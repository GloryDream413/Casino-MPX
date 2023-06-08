import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Box from "../components/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Backdrop, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NotificationManager } from "react-notifications";
import useWindowSize from "react-use/lib/useWindowSize";
import Slider from "@mui/material/Slider";
import Confetti from "react-confetti";
import { coinFlip, isInitialized } from "../contract/helpers";
import { showToast } from "../contract/utils";
import {
  BOX_COUNT,
  REWARD_MUTIPLIER,
  BET_RANGE,
  EARNING_RATE,
} from "../config";
import { useSelector, useDispatch } from "react-redux";
import {
  setConnectedChainId,
  recordPlayHistory,
  setWinPlayIndex,
  setLosePlayIndex,
} from "../store/actions/auth.actions";
import { toast } from "react-toastify";
import LoseSound from "../components/loseSound";
import LoseSound2 from "../components/loseSound2";
import LoseSound3 from "../components/loseSound3";
import LoseSound4 from "../components/loseSound4";

import WinSound from "../components/winSound";
import WinSound2 from "../components/winSound2";
import WinSound3 from "../components/winSound3";
import WinSound4 from "../components/winSound4";

import {playBetting} from "../contract/HashConnectAPIProvider";

const mintTheme = createTheme({
  palette: {
    primary: {
      main: "#ff9a3d",
    },
  },
});

const loadmapTheme = createTheme({
  palette: {
    primary: {
      main: "#ff9a3d",
    },
  },
});

const PrettoSlider = styled(Slider)({
  color: "#f7d93e",
  height: 4,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#f7d93e",
    border: "2px solid #df7a1d",
    borderRadius: "0",
    transform: "translate(-50%, -50%) rotate(45deg)",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#f7d93e",
    transformOrigin: "bottom left",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(0%, -90%) rotate(270deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const Play = () => {
  const [stage, setStage] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [numberOfBoxs, setNumberOfBoxs] = useState(2);
  const [userSelectedIdx, setUserSelectedIndex] = useState(-1);
  const [wonIndex, setWonIndex] = useState(0);
  const [pastSeletedIndex, setPastSelectedIndex] = useState(-1);
  const [winnerpopup, setWinnerPopup] = useState(false);
  const [lostpopup, setLostPopup] = useState(false);
  const [boxStatusArray, setBoxStatusArray] = useState([0, 0]);
  const [working, setWorking] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const [isShowingResult, setIsShowingResult] = useState(false);
  const connected = useSelector((state) => state.auth.walletStatus);
  const currentWallet = useSelector((state) => state.auth.currentWallet);
  const hederaWallet = useSelector((state) => state.auth.hederaWallet);
  const hederaConnected = useSelector((state) => state.auth.hederaWalletStatus);
  const chain = useSelector((state) => state.auth.currentChainId);
  const losePlayIndex = useSelector((state) => state.auth.losePlayIndex);
  const winPlayIndex = useSelector((state) => state.auth.winPlayIndex);
  const provider = useSelector((state) => state.auth.provider);
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  const [count, setCount] = useState(5);
  const [winPlay, setWinPlay] = useState(false);
  const [losePlay, setLosePlay] = useState(false);
  const [win2Play, setWin2Play] = useState(false);
  const [lose2Play, setLose2Play] = useState(false);
  const [win3Play, setWin3Play] = useState(false);
  const [lose3Play, setLose3Play] = useState(false);
  const [win4Play, setWin4Play] = useState(false);
  const [lose4Play, setLose4Play] = useState(false);

  const handleChange = (event, newValue) => {
    setCount(newValue);
  };

  useEffect(() => {
    console.log("---------------", params.chain);
    if (params.chain == "solana" || params.chain == "hedera") {
      dispatch(setConnectedChainId(params.chain));
      setDepositAmount(BET_RANGE[params.chain]?.min || 0);
    }
  }, [params]);

  const onChangeNumberOfBoxs = (boxCount, index) => {
    setUserSelectedIndex(-1);
    setNumberOfBoxs(boxCount);
    console.log("numberofboxs ==> ", boxCount);
    let boxStatusArr = [];
    for (let idx = 0; idx < boxCount; idx++) boxStatusArr.push(0);
    setBoxStatusArray(boxStatusArr);
    setStage(index);
  };

  const handleSelectABox = async (boxIndex) => {
    if (depositAmount == 0) {
      NotificationManager.error("Deposit Amount is 0");
      return;
    }
    if (
      (chain === "solana" && connected === false) ||
      (chain === "hedera" && hederaConnected === false)
    ) {
      NotificationManager.error("Wallet should be connected");
      return;
    }
    if (chain === "solana") {
      let is_initialized = await isInitialized(provider);
      if (!is_initialized) {
        NotificationManager.error("It is not initialized yet.");
        return;
      }
    }
    setUserSelectedIndex(boxIndex);
    console.log("51-----------------");
    //trigger transaction here
    let gameResult = false;
    setWorking(true);
    if (chain === "hedera") {
      console.log(depositAmount, numberOfBoxs, boxIndex);
      try {
        gameResult = await playBetting(depositAmount, numberOfBoxs, boxIndex);
        if (gameResult !== true && gameResult !== false) {
          toast.warn("Network error.");
          resetGame();
          return;
        }
      } catch (error) {
        console.log(error);
        toast.warn("Network error.");
        resetGame();
        return;
      }
    } else {
      try {
        gameResult = await coinFlip(provider, stage, depositAmount);
      } catch (error) {
        console.log(error);
        toast.warn("Network error.");
        resetGame();
        return;
      }
    }
    if (gameResult === false) {
      if (losePlayIndex % 4 === 0) setLosePlay(true);
      if (losePlayIndex % 4 === 1) setLose2Play(true);
      if (losePlayIndex % 4 === 2) setLose3Play(true);
      if (losePlayIndex % 4 === 3) setLose4Play(true);
      if (losePlayIndex >= 9007199254740990)
        dispatch(setLosePlayIndex(Number(0)));
      else dispatch(setLosePlayIndex(Number(losePlayIndex) + Number(1)));
      let candidates = [];
      for (let idx = 0; idx < BOX_COUNT[stage]; idx++) {
        if (idx !== boxIndex) candidates.push(idx);
      }
      let idx2 = Date.now() % candidates.length;
      setWorking(false);
      setLostPopup(true);
      setPastSelectedIndex(boxIndex);
      setUserSelectedIndex(-1);
      setWonIndex(candidates[idx2]);
      setIsShowingResult(true);
      recordPlayHistory({
        player: chain === "solana" ? currentWallet : hederaWallet,
        chainId: chain,
        depositAmount: depositAmount,
        winOrLose: false,
        resultAmount: 0,
        boxes: numberOfBoxs
      });
      NotificationManager.info(
        `You lost ${depositAmount} ${chain === "solana" ? "SOL" : "HBAR"}`,
        "Lose!",
        3000,
        () => {
          resetGame();
        }
      );
      setTimeout(() => {
        resetGame();
      }, 3000);
    } else if (gameResult === true) {
      if (winPlayIndex % 4 === 0) setWinPlay(true);
      if (winPlayIndex % 4 === 1) setWin2Play(true);
      if (winPlayIndex % 4 === 2) setWin3Play(true);
      if (winPlayIndex % 4 === 3) setWin4Play(true);
      if (losePlayIndex >= 9007199254740990)
        dispatch(setWinPlayIndex(Number(0)));
      else dispatch(setWinPlayIndex(Number(winPlayIndex) + Number(1)));
      setWorking(false);
      setWinnerPopup(true);
      setPastSelectedIndex(boxIndex);
      setUserSelectedIndex(-1);
      setWonIndex(boxIndex);
      setIsShowingResult(true);
      recordPlayHistory({
        player: chain === "solana" ? currentWallet : hederaWallet,
        chainId: chain,
        depositAmount: depositAmount,
        winOrLose: true,
        boxes: numberOfBoxs,
        resultAmount:
          depositAmount >= 0
            ? depositAmount * EARNING_RATE[numberOfBoxs] * 0.965
            : 0,
      });
      NotificationManager.info(
        `You earned ${
          depositAmount >= 0
            ? Number(
                depositAmount * EARNING_RATE[numberOfBoxs] * 0.965
              ).toFixed(3)
            : "0"
        } ${chain === "solana" ? "SOL" : "HBAR"}`,
        "Win!",
        5000,
        () => {
          resetGame();
        }
      );
      setTimeout(() => {
        resetGame();
      }, 5000);
    } else {
      setWorking(false);
      NotificationManager.error(
        `Transaction is rejected by user`,
        "Warn!",
        3000,
        () => {
          resetGame();
        }
      );
      setTimeout(() => {
        resetGame();
      }, 3000);
    }
  };

  const resetGame = () => {
    setUserSelectedIndex(-1);
    setWinnerPopup(false);
    setLostPopup(false);
    setDepositAmount(BET_RANGE[chain].min);
    setIsShowingResult(false);
    setWorking(false);
  };

  return (
    <div className="mt-[100px] ">
      <div className="flex flex-col justify-center items-center text-center ">
        <h1 className="font-arial text-[56px] md:text-[76px] text-[#f7d93e] max-w-[600px] font-bold">
          Mystery Box
        </h1>
        <div className="w-full md:w-[450px] pb-10 flex gap-1 md:gap-2 justify-center cursor-pointer">
          <button
            className={`optionbutton ${
              numberOfBoxs === 2 ? "selected" : ""
            } px-3 md:px-6 py-2 md:py-2 text-lg text-bold`}
            onClick={() => onChangeNumberOfBoxs(2, 0)}
          >
            2 Boxes
          </button>
          <button
            className={`optionbutton ${
              numberOfBoxs === 4 ? "selected" : ""
            } px-3 md:px-6 py-2 md:py-2 text-lg text-bold`}
            onClick={() => onChangeNumberOfBoxs(4, 1)}
          >
            4 Boxes
          </button>
          <button
            className={`optionbutton ${
              numberOfBoxs === 6 ? "selected" : ""
            } px-3 md:px-6 py-2 md:py-2 text-lg text-bold`}
            onClick={() => onChangeNumberOfBoxs(6, 2)}
          >
            6 Boxes
          </button>
          <button
            className={`optionbutton ${
              numberOfBoxs === 12 ? "selected" : ""
            } px-3 md:px-6 py-2 md:py-2 text-lg text-bold`}
            onClick={() => onChangeNumberOfBoxs(12, 3)}
          >
            12 Boxes
          </button>
        </div>
        <div className="w-full md:w-[450px] pb-10 flex flex-col align-middle items-center justify-center">
          <span className="text-white bold text-center">
            {depositAmount} {chain === "solana" ? "SOL" : "HBAR"}
          </span>
          <div className="mt-2 flex gap-4 w-10/12 justify-center">
            <div className="text-white">{BET_RANGE[chain]?.min || 0}</div>
            <ThemeProvider theme={loadmapTheme}>
              <PrettoSlider
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={3}
                min={BET_RANGE[chain]?.min || 0}
                max={BET_RANGE[chain]?.max || 0}
                step={chain === "solana" ? 0.1 : 1}
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />
            </ThemeProvider>
            <div className="text-white">{BET_RANGE[chain]?.max || 0}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div
          className={`grid md:w-[60%] m-auto grid-cols-1  ${
            numberOfBoxs <= 4
              ? "md:grid-cols-2"
              : numberOfBoxs > 6
              ? "md:grid-cols-4"
              : "md:grid-cols-3"
          } `}
        >
          {boxStatusArray &&
            boxStatusArray.length > 0 &&
            boxStatusArray.map((item, index) => (
              <div className="relative " key={index}>
                <Box
                  status={
                    winnerpopup === true
                      ? index === wonIndex
                        ? 2
                        : 0
                      : lostpopup === true
                      ? index === pastSeletedIndex
                        ? 3
                        : 0
                      : userSelectedIdx === index
                      ? 1
                      : 0
                  }
                  numberOfBoxs={numberOfBoxs}
                  index={index + 1}
                  onClick={() => {
                    handleSelectABox(index);
                  }}
                />
              </div>
            ))}
        </div>
      </div>
      {winnerpopup === true && <Confetti width={width} height={height} />}

      <div style={{ display: "none" }}>
        {losePlay ? <LoseSound /> : null}
        {losePlay ? setTimeout(() => setLosePlay(false), 3500) : null}
        {winPlay ? <WinSound /> : null}
        {winPlay ? setTimeout(() => setWinPlay(false), 3500) : null}

        {lose2Play ? <LoseSound2 /> : null}
        {lose2Play ? setTimeout(() => setLose2Play(false), 3500) : null}
        {win2Play ? <WinSound2 /> : null}
        {win2Play ? setTimeout(() => setWin2Play(false), 3500) : null}

        {lose3Play ? <LoseSound3 /> : null}
        {lose3Play ? setTimeout(() => setLose3Play(false), 3500) : null}
        {win3Play ? <WinSound3 /> : null}
        {win3Play ? setTimeout(() => setWin3Play(false), 3500) : null}

        {lose4Play ? <LoseSound4 /> : null}
        {lose4Play ? setTimeout(() => setLose4Play(false), 3500) : null}
        {win4Play ? <WinSound4 /> : null}
        {win4Play ? setTimeout(() => setWin4Play(false), 3500) : null}
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={working}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Play;
