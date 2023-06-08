import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { NotificationManager } from "react-notifications";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import HashPackConnectModal from "./HashPackConnectModal";
import { useLocation } from "react-router-dom";
import twitterSVG from "../assets/twitter-svgrepo-com.svg";
import discordSVG from "../assets/discord-icon-svgrepo-com.svg";
import {
  setConnectedChainId,
  setConnectedWalletAddress,
  setWalletProvider,
  setWalletStatus,
} from "../store/actions/auth.actions";
import { hc } from "../contract/HashConnectAPIProvider";
import { ADMIN_WALLET_ON_SOLONA, ADMIN_WALLET_ON_HEDERA } from "../config";

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const Header = () => {
  const [walletConnectModalViewFlag, setWalletConnectModalViewFlag] =
    useState(false);
  const [showWalletBtn, setShowWalletBtn] = useState(true);
  const DEFAULT_BUTSTR = "CONNECT WALLET";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chain = useSelector((state) => state.auth.currentChainId);
  const connected = useSelector((state) => state.auth.walletStatus);
  const connectedHedera = useSelector((state) => state.auth.hederaWalletStatus);
  const walletAddr = useSelector((state) => state.auth.currentWallet);
  const hederaWalletAddr = useSelector((state) => state.auth.hederaWallet);
  const strLen = 10;
  const location = useLocation();
  const [showAdminMenu, setShowAdminMenu] = useState("");

  useEffect(() => {
    if (
      location.pathname.toString().includes("leaderboard") === true &&
      location.pathname.toString().includes("help") === true
    ) {
      setShowWalletBtn(false);
    } else {
      setShowWalletBtn(true);
    }
  }, [location]);

  useEffect(() => {
    if (
      (hederaWalletAddr === ADMIN_WALLET_ON_HEDERA && chain === "hedera") ||
      (walletAddr === ADMIN_WALLET_ON_SOLONA && chain === "solana")
    ) {
      setShowAdminMenu(true);
    } else {
      setShowAdminMenu(false);
    }
  }, [hederaWalletAddr, chain, walletAddr]);

  const onClickConnectHashPack = () => {
   
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

  useEffect(() => {
    dispatch(setWalletProvider(null));
    dispatch(setConnectedWalletAddress(""));
    dispatch(setWalletStatus(false));
  }, []);

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
      <div className="header flex justify-center items-center fix absolute bg-gradient-to-r left-0 right-0 from-[rgb(0,0,0)] via-[rgb(0,159,157)] to-[rgb(0,0,0)] z-50">
        <div className="container flex justify-between items-center">
          <div className="flex items-center ">
            <img
              src="/images/logo.png"
              alt="logo"
              className="ml-1 md:ml-6 cursor-pointer  w-[90px] h-[90px]"
              onClick={() => {
                navigate("/");
              }}
            />
            <a
              href="https://twitter.com/syndicatespanda"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={twitterSVG}
                className="hidden sm:block w-[32px] h-[32px] ml-3 md:ml-6 cursor-pointer"
                alt="twitter"
              />
            </a>
            <a
              href="https://discord.gg/vkMctx3PEd"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={discordSVG}
                className="hidden sm:block w-[32px] h-[32px] ml-3 md:ml-6 cursor-pointer"
                alt="twitter"
              />
            </a>
          </div>
          <div className="hidden md:block  justify-between mx-5 md:!flex">
            <button
              className="uppercase text-white font-500"
              onClick={() => navigate("/stats")}
            >
              Stats
            </button>            
            <button
              className="uppercase md:ml-10 text-white font-500"
              onClick={() => navigate("/leaderboard")}
            >
              Leaderboard
            </button>
            <button
              className="mx-5 md:mx-10 uppercase text-white font-500"
              onClick={() => navigate("/help")}
            >
              how to play
            </button>
            {showAdminMenu === true && (
              <button
                className="mx-5 md:mx-10 uppercase text-white font-500"
                onClick={() => navigate("/admin")}
              >
                admin
              </button>
            )}
            {showWalletBtn === true && (
              <>
                {chain === "solana" && (
                  <Button
                    className="connectBtn h-10"
                    label={
                      connected
                        ? shortWalletAddr(walletAddr, strLen)
                        : DEFAULT_BUTSTR
                    }
                    onClick={() => {
                      connected
                        ? onClickDisconnectWallet()
                        : onClickConnectWallet();
                    }}
                  />
                )}
                {chain === "hedera" && (
                  <Button
                    className="connectBtn h-10"
                    label={
                      connectedHedera
                        ? shortWalletAddr(hederaWalletAddr, strLen)
                        : DEFAULT_BUTSTR
                    }
                    onClick={async () => {
                      if(connectedHedera == false) 
                      {
                        // hc.connectToLocalWallet()
                      }
                      else {
                        // await hc.disconnect(hc.hcData.topic);
                      }
                    }}
                  />
                )}
              </>
            )}
          </div>
        </div>

        <div className=" md:hidden sm:absolute sm:top-0 justify-between mx-5 flex items-center">
          <div className="flex flex-col mr-2">
          <button
            className="uppercase text-white font-500"
            onClick={() => navigate("/stats")}
          >
            Stats
          </button>
          <button
            className="uppercase text-white font-500"
            onClick={() => navigate("/leaderboard")}
          >
            Leaders
          </button>
          <button
            className="mx-5 md:mx-10 uppercase text-white font-500"
            onClick={() => navigate("/help")}
          >
            help
          </button>
          </div>
          {showAdminMenu === true && (
            <button
              className="mx-5 md:mx-10 uppercase text-white font-500"
              onClick={() => navigate("/admin")}
            >
              admin
            </button>
          )}
          {showWalletBtn === true && (
            <>
              {/* {chain === "solana" && (
                <Button
                  className="connectBtn h-10 leading-5"
                  label={
                    connected
                      ? shortWalletAddr(walletAddr, strLen)
                      : DEFAULT_BUTSTR
                  }
                  onClick={() => {
                    connected
                      ? onClickDisconnectWallet()
                      : onClickConnectWallet();
                  }}
                />
              )} */}
              
                <Button
                  className="connectBtn h-10 leading-5"
                  label={
                    connectedHedera
                      ? shortWalletAddr(hederaWalletAddr, strLen)
                      : DEFAULT_BUTSTR
                  }
                  onClick={async () => { 
                    if(connectedHedera == false) 
                    {
                      // hc.connectToLocalWallet()
                    }
                      else {
                        // await hc.disconnect(hc.hcData.topic);
                      }
                    }
                  }
                />
              
            </>
          )}
        </div>
      </div>

    </>
  );
};

export default Header;
