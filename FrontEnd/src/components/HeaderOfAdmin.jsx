import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { NotificationManager } from "react-notifications";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import HashPackConnectModal from "./HashPackConnectModal";
import { useLocation } from "react-router-dom";

import {
  setConnectedChainId,
  setConnectedWalletAddress,
  setWalletProvider,
  setWalletStatus,
} from "../store/actions/auth.actions";

import { ADMIN_WALLET, ADMIN_WALLET_ON_SOLONA } from "../config";

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const HeaderOfAdmin = () => {
  const [walletConnectModalViewFlag, setWalletConnectModalViewFlag] =
    useState(false);

  const [chain, setChain] = useState("");
  const [showWalletBtn, setShowWalletBtn] = useState(false);
  const DEFAULT_BUTSTR = "CONNECT WALLET";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const connected = useSelector((state) => state.auth.walletStatus);
  const connectedHedera = useSelector((state) => state.auth.hederaWalletStatus);
  const walletAddr = useSelector((state) => state.auth.currentWallet);
  const hederaWalletAddr = useSelector((state) => state.auth.hederaWallet);
  const connectChainId = useSelector((state) => state.auth.currentChainId);
  const strLen = 10;
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.toString().includes("home") === false) {
      setShowWalletBtn(true);
    }
  }, [location]);

  useEffect(() => {
    if (connectChainId) {
      if (connectChainId === "hedera" || connectChainId === "solana") {
        setChain(connectChainId);
      }
    } else {
      navigate("/");
    }
  }, [connectChainId]);

  const onClickConnectHashPack = () => {
  
  };

  const onChangeChain = (e) => {
    let value = e.target.value;
    console.log("value   ======> ", value);
    dispatch(setConnectedChainId(value));
    setChain(value);
  };

  const onClickWalletConnectModalClose = () => {
    setWalletConnectModalViewFlag(false);
  };

  const onClickDisconnectHashPack = () => {
    setWalletConnectModalViewFlag(false);
  };

  const onClickCopyPairingStr = () => {
    navigator.clipboard.writeText(hederaWalletAddr);
  };

  const shortWalletAddr = (addr, len) => {
    let res =
      addr.slice(0, (len * 3) / 4) +
      "..." +
      addr.slice(addr.length - len / 4, addr.length);
    return res;
  };

  const onClickConnectWallet = async () => {
    console.log("solana wallet log - 1");
    // await window.solana.connect();
    if (window.solana) {
      const provider = window.solana;
      try {
        await provider.connect();
        const publicKey = provider.publicKey.toString();
        console.log(`Connected to wallet ${publicKey}`);
        dispatch(setWalletProvider(provider));
        dispatch(setConnectedWalletAddress(publicKey));
        dispatch(setWalletStatus(true));
        if (publicKey == ADMIN_WALLET_ON_SOLONA) {
          navigate("/admin");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      NotificationManager.error(
        "Please install phantom wallet extension first. from chrome web store."
      );
      await sleep(1000 * 2);
      window.open("https://www.phantom.app", "_blank");
    }
  };

  const onClickDisconnectWallet = async () => {
    console.log("solana wallet disconnect log - 1");
    // await window.solana.connect();
    if (window.solana) {
      const provider = window.solana;
      try {
        await provider.disconnect();
        dispatch(setWalletProvider(null));
        dispatch(setConnectedWalletAddress(""));
        dispatch(setWalletStatus(false));
      } catch (error) {
        console.error(error);
      }
    } else {
      NotificationManager.error(
        "Please install phantom wallet extension first. from chrome web store."
      );
      await sleep(1000 * 2);
      window.open("https://www.phantom.app", "_blank");
    }
  };

  return (
    <>
      <div className="header pt-10 flex flex-wrap justify-between items-center">
        <img
          src="/images/logo.png"
          alt="logo"
          className="ml-1 md:ml-6 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
        <div className="hidden md:block  justify-between mx-5 md:!flex">
          <FormControl className="text-white">
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={onChangeChain}
              value={chain}
            >
              <FormControlLabel
                value="hedera"
                control={
                  <Radio
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "#9ffdaf",
                      },
                    }}
                  />
                }
                label="Hedera"
              />
              <FormControlLabel
                value="solana"
                control={
                  <Radio
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "#9ffdaf",
                      },
                    }}
                  />
                }
                label="Solana"
              />
            </RadioGroup>
          </FormControl>
          <div className="min-w-[250px] justify-start">
            <Button
              className="connectBtn h-10 leading-5"
              label={
                chain === "solana"
                  ? connected
                    ? shortWalletAddr(walletAddr, strLen)
                    : DEFAULT_BUTSTR
                  : connectedHedera
                  ? shortWalletAddr(hederaWalletAddr, strLen)
                  : DEFAULT_BUTSTR
              }
              onClick={() => {
                chain === "solana"
                  ? connected
                    ? onClickDisconnectWallet()
                    : onClickConnectWallet()
                  : setWalletConnectModalViewFlag(true);
              }}
            />
          </div>
        </div>
      </div>

      <div className=" md:hidden  justify-between mx-5 flex">
        <FormControl className="text-white">
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={onChangeChain}
            value={chain}
          >
            <FormControlLabel
              value="hedera"
              control={
                <Radio
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "#9ffdaf",
                    },
                  }}
                />
              }
              label="Hedera"
            />
            <FormControlLabel
              value="solana"
              control={
                <Radio
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "#9ffdaf",
                    },
                  }}
                />
              }
              label="Solana"
            />
          </RadioGroup>
        </FormControl>
        <div className="min-w-[250px] justify-start">
          <Button
            className="connectBtn h-10 leading-5"
            label={
              chain === "solana"
                ? connected
                  ? shortWalletAddr(walletAddr, strLen)
                  : DEFAULT_BUTSTR
                : connectedHedera
                ? shortWalletAddr(hederaWalletAddr, strLen)
                : DEFAULT_BUTSTR
            }
            onClick={() => {
              chain === "solana"
                ? connected
                  ? onClickDisconnectWallet()
                  : onClickConnectWallet()
                : setWalletConnectModalViewFlag(true);
            }}
          />
        </div>
      </div>

    </>
  );
};

export default HeaderOfAdmin;
