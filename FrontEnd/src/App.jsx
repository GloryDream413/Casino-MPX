import Home from "./pages/Home";
import Play from "./pages/Play";
import HowToPlay from "./pages/HowToPlay";
import LeaderBoard from "./pages/LeaderBoard";
import Stats from "./pages/Stats";
import Admin from "./pages/Admin";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { BACKEND_API_URL } from "./config";
import { useDispatch } from "react-redux";
import {
  setHederaTopPlyaers,
  setSolanaTopPlayers,
} from "./store/actions/auth.actions";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import BgSound from "./components/BgSound";

function App() {
  const dispatch = useDispatch();
  const [bgPlay, setBgPlay] = useState(false);

  useEffect(() => {
    localStorage.removeItem("hashConnectData");
    setBgPlay(true);
  }, []);

  const readDataFromDB = async () => {
    let readingPrimises = [];
    readingPrimises.push(
      axios.post(`${BACKEND_API_URL}/PlayHistory/getBylimit`, {
        chainId: "hedera",
        limit: 10,
      })
    );
    // readingPrimises.push(
    //   axios.post(`${BACKEND_API_URL}/PlayHistory/getBylimit`, {
    //     chainId: "solana",
    //     limit: 10,
    //   })
    // );
    Promise.all(readingPrimises)
      .then((responses) => {
        console.log(responses[0].data);
        dispatch(setHederaTopPlyaers(responses[0].data.data));
        // dispatch(setSolanaTopPlayers(responses[1].data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    readDataFromDB();
    // let intervalId = setInterval(() => {
    //   readDataFromDB();
    // }, 10000);
    // return () => {
    //   if (intervalId > 0) clearInterval(intervalId);
    // };
  }, []);

  return (
    <div className="h-screen container">
      <div className="flex flex-col ">
        <Router>
          <Header />
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<Play />} />
            {/* <Route path="/:chain" element={<Play />} /> */}
            <Route path="/help" element={<HowToPlay />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <Footer />
        </Router>
      </div>
      <div style={{ display: "none" }}>{bgPlay ? <BgSound /> : null}</div>
    </div>
  );
}

export default App;
