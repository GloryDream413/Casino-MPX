import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const LeaderBoard = () => {
  const topHederaPlayers = useSelector((state) => state.auth.topHederaPlayers);
  const topSolanaPlayers = useSelector((state) => state.auth.topSolanaPlayers);
  const [topHplayers, setTopHplayers] = useState([]);
  const [topSplayers, setTopSplayers] = useState([]);

  useEffect(() => {
    setTopHplayers(topHederaPlayers);
    setTopSplayers(topSolanaPlayers);
  }, [topHederaPlayers, topSolanaPlayers]);

  return (
    <div className="mt-[100px]  self-center">
      <div className="text-white w-full flex flex-col items-center justify-center">
        <div className="text-5xl p-5">
          <span className="bold text-[#f7d93e] ">Top 10 players</span> on Hedera
        </div>
        <div className="overflow-x-auto text-white block sm:flex justify-center  md:w-full w-[100vw]">
          <table className="table-auto border-spacing-x-5 border-spacing-y-2  ">
            <thead>
              <tr className=" ">
                <th className="text-center  p-1 md:p-3">Player</th>
                <th className="text-center  p-1 md:p-3">Chain</th>
                <th className="text-center  p-1 md:p-3">Boxes Opened</th>
                <th className="text-center  p-1 md:p-3">Earning(HBAR)</th>
              </tr>
            </thead>
            <tbody>
              {topHplayers &&
                topHplayers.length > 0 &&
                topHplayers.map(
                  (item, index) =>
                    item._id !== "" && (
                      <tr className=" " key={index}>
                        <td className="text-center  p-1 md:p-3">{item._id}</td>
                        <td className="text-center  p-1 md:p-3">Hedera</td>
                        <td className="text-center  p-1 md:p-3">
                          {Math.ceil(item.track || 0)}
                        </td>
                        <td className="text-center  p-1 md:p-3">
                          {Number(item.earning).toFixed(2)}
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          </table>
        </div>
        {/* <div className="text-5xl p-5 mt-10">
          <span className="bold text-[#f7d93e] ">Top 5 players</span> on Solana
        </div>
        <div className="overflow-x-auto text-white  block sm:flex justify-center  md:w-full w-[100vw]">
          <table className="table-auto border-spacing-x-5 border-spacing-y-2  ">
            <thead>
              <tr className=" ">
                <th className="text-center  p-1 md:p-3">Player</th>
                <th className="text-center  p-1 md:p-3">Chain</th>
                <th className="text-center  p-1 md:p-3">Boxes Opened</th>
                <th className="text-center  p-1 md:p-3">Earning(SOL)</th>
              </tr>
            </thead>
            <tbody>
              {topSplayers &&
                topSplayers.length > 0 &&
                topSplayers.map((item, index) => (
                  <tr className=" " key={index}>
                    <td className="text-center  p-1 md:p-3 max-w-[380px] break-words">
                      {item._id.substring(0, 16) +
                        "..." +
                        item._id.substring(
                          item._id.length - 16,
                          item._id.length
                        )}
                    </td>
                    <td className="text-center  p-1 md:p-3 max-w-[150px] break-words">
                      Solana
                    </td>
                    <td className="text-center  p-1 md:p-3 max-w-[150px] break-words">
                      {Math.ceil(item.track || 0)}
                    </td>
                    <td className="text-center  p-1 md:p-3 max-w-[150px] break-words">
                      {Number(item.earning).toFixed(2)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
};

export default LeaderBoard;
