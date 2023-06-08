const HowToPlay = () => {
  return (
    <div className="mt-[100px] self-center w-full">
      <div className="text-white w-full flex flex-col items-center justify-center">
        <div className="p-5 w-full md:max-w-[70%] ">
          <div className="text-6xl ">
            <span className="bold text-green-400 ">Gameplay</span> for PMX
            Gaming
          </div>
          <div className="text-xl my-5">How to play Mystery Box</div>
          <div className="text-xl">
            There are multiple options to choose from; 2 Boxes, 4 Boxes, 6
            Boxes, or 12 Boxes. The higher box selections, increases the reward
            multiplier, but decreases your chance to win. With 2 Boxes selection
            you maintain a 50/50 win to lose chance. If the user wants to play
            hard for higher reward, then the 12 boxes selection is best for them
            for the chance to 10x their bidding amount. Bidding amounts in HBAR
            ranges from 10h to 500h and on SOL ranges from 0.05 SOL to 2 SOL.
          </div>
          <div className="text-xl my-5">
            Below is the chart breakdown game rewards, with lowest and highest
            bidding amount for rewards.
          </div>
          <div className="overflow-x-auto ">
            <table className="table-auto border-spacing-x-5 border-spacing-y-2 border border-slate-300">
              <thead>
                <tr className="border border-slate-300">
                  <th className="border border-slate-300 p-3">Box options</th>
                  <th className="border border-slate-300 p-3">
                    Win to Lose Chances
                  </th>
                  <th className="border border-slate-300 p-3">
                    Winning Multipliers
                  </th>
                  <th className="border border-slate-300 p-3">10 HBAR BID</th>
                  <th className="border border-slate-300 p-3">500 HBAR BID</th>
                  <th className="border border-slate-300 p-3">0.05 SOL BID</th>
                  <th className="border border-slate-300 p-3">2.0 SOL BID</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-slate-300">
                  <td className="border border-slate-300 p-3">2 Boxes</td>
                  <td className="border border-slate-300 p-3">50:50</td>
                  <td className="border border-slate-300 p-3">1x Bid</td>
                  <td className="border border-slate-300 p-3">+10 hbar</td>
                  <td className="border border-slate-300 p-3">+500 hbar</td>
                  <td className="border border-slate-300 p-3">+0.05 sol</td>
                  <td className="border border-slate-300 p-3">+2 sol</td>
                </tr>
                <tr className="border border-slate-300">
                  <td className="border border-slate-300 p-3">4 Boxes</td>
                  <td className="border border-slate-300 p-3">25:75</td>
                  <td className="border border-slate-300 p-3">1.5x Bid</td>
                  <td className="border border-slate-300 p-3">+15 hbar</td>
                  <td className="border border-slate-300 p-3">+750 hbar</td>
                  <td className="border border-slate-300 p-3">+0.075 sol</td>
                  <td className="border border-slate-300 p-3">+3 sol</td>
                </tr>
                <tr className="border border-slate-300">
                  <td className="border border-slate-300 p-3">6 Boxes</td>
                  <td className="border border-slate-300 p-3">16.66:83.34</td>
                  <td className="border border-slate-300 p-3">3x Bid</td>
                  <td className="border border-slate-300 p-3">+30 hbar</td>
                  <td className="border border-slate-300 p-3">+1500 hbar</td>
                  <td className="border border-slate-300 p-3">+0.15 sol</td>
                  <td className="border border-slate-300 p-3">+6 sol</td>
                </tr>
                <tr className="border border-slate-300">
                  <td className="border border-slate-300 p-3">12 Boxes</td>
                  <td className="border border-slate-300 p-3">8.33:91.67</td>
                  <td className="border border-slate-300 p-3">10x Bid</td>
                  <td className="border border-slate-300 p-3">+100 hbar</td>
                  <td className="border border-slate-300 p-3">+5000 hbar</td>
                  <td className="border border-slate-300 p-3">+0.50 sol</td>
                  <td className="border border-slate-300 p-3">+20 sol</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
