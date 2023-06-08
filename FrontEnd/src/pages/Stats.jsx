import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { PieChart } from 'react-minimal-pie-chart';
import axios from "axios";
import { BACKEND_API_URL } from "../config";

const LeaderBoard = () => {
  const [stats, setStats] = useState(3056);
  const [randomDelta, setRandomDelta] = useState(0.02);

  const getStatsFromDB = async () => {
    axios.get(`${BACKEND_API_URL}/PlayHistory/stats`).then(response => {
      if(response.data.code === 0)
      {
        setStats(response.data.sums);
      }
    }).catch(error => {

    })
  }

  useEffect(() => {
    getStatsFromDB();
    let randDel = Math.random() * 0.1;
    setRandomDelta(randDel);
  }, [])

  return (
    <div className="mt-[100px]  self-center overflow-y-auto ">
         <div className="text-4xl p-5 w-full flex justify-center">
          <span className="bold text-green-300 w-full text-center">Total of Boxes Open: {stats?.totalPlayCount || 0}</span>
        </div>
      <div className="text-white w-full flex flex-col md:flex-row items-center justify-center md:items-start ">
        <div className="w-10/12 md:w-[50%] flex flex-col items-start"> 
             
          <div className="text-2xl p-5 w-full  border-2 border-white flex justify-center">
            <span className="bold text-[#f7d93e] ">Boxes Open</span>
          </div>
          <div className="overflow-x-auto text-white block sm:flex justify-center w-full border-t-0 border-2 border-white">
            <table className="table-auto border-spacing-x-5 border-spacing-y-2  ">
              {/* <thead>
                <tr className=" ">
                  <th className="text-center  p-1 md:p-3">Boxes</th>
                  <th className="text-center  p-1 md:p-3">Opened</th>
                </tr>
              </thead> */}
              <tbody>                
                <tr className=" " >
                  <td className="text-center  p-1 md:p-3">2 Box - </td>
                  <td className="text-center  p-1 md:p-3">{stats?.totalOf2Boxes || 0}</td>
                </tr>                     
                <tr className=" " >
                  <td className="text-center  p-1 md:p-3">4 Box - </td>
                  <td className="text-center  p-1 md:p-3">{stats?.totalOf4Boxes || 0}</td>
                </tr>                     
                <tr className=" " >
                  <td className="text-center  p-1 md:p-3">6 Box - </td>
                  <td className="text-center  p-1 md:p-3">{stats?.totalOf6Boxes || 0}</td>
                </tr>                     
                <tr className=" " >
                  <td className="text-center  p-1 md:p-3">12 Box - </td>
                  <td className="text-center  p-1 md:p-3">{stats?.totalOf12Boxes || 0}</td>
                </tr>                     
              </tbody>
            </table>
          </div>
             
          <div className="text-2xl p-5 w-full  border-2 border-white mt-10  flex justify-center">
            <span className="bold text-[#f7d93e] w-full text-center">Top 5 overall box openers</span>
          </div>
          <div className="overflow-x-auto text-white block sm:flex justify-center  w-full border-t-0 border-2 border-white">
            <table className="table-auto border-spacing-x-5 border-spacing-y-2  ">
              {/* <thead>
                <tr className=" ">
                  <th className="text-center  p-1 md:p-3">{" "}</th>
                  <th className="text-center  p-1 md:p-3">Player</th>
                  <th className="text-center  p-1 md:p-3">Boxes Opened</th>
                  <th className="text-center  p-1 md:p-3">Earning(HBAR)</th>
                </tr>
              </thead> */}
              <tbody>
                {stats.topFiveOverallBoxOpeners &&
                  stats.topFiveOverallBoxOpeners.length > 0 &&
                  stats.topFiveOverallBoxOpeners.map(
                    (item, index) =>
                      item._id !== "" && (
                        <tr className=" " key={index}>
                          <td className="text-center  p-1 md:p-3">{index + 1}</td>
                          <td className="text-center  p-1 md:p-3">{item.player} - </td>
                          <td className="text-center  p-1 md:p-3">
                            {Math.ceil(item.count || 0)} of boxes
                          </td>
                        </tr>
                      )
                  )}
              </tbody>
            </table>
          </div>
             
          <div className="text-2xl p-5 w-full  border-2 border-white mt-10  flex justify-center">
            <span className="bold text-[#f7d93e] ">Daily Leaders</span>
          </div>
          <div className="overflow-x-auto text-white block sm:flex justify-center  w-full border-t-0 border-2 border-white">
            <table className="table-auto border-spacing-x-5 border-spacing-y-2  ">
              {/* <thead>
                <tr className=" ">
                  <th className="text-center  p-1 md:p-3">{" "}</th>
                  <th className="text-center  p-1 md:p-3">Player</th>
                  <th className="text-center  p-1 md:p-3">Boxes Opened</th>
                  <th className="text-center  p-1 md:p-3">Earning(HBAR)</th>
                </tr>
              </thead> */}
              <tbody>
                {stats.daily10BoxOpeners &&
                  stats.daily10BoxOpeners.length > 0 &&
                  stats.daily10BoxOpeners.map(
                    (item, index) =>
                      item._id !== "" && (
                        <tr className=" " key={index}>
                          <td className="text-center  p-1 md:p-3">{index + 1}</td>
                          <td className="text-center  p-1 md:p-3">{item.player}</td>
                          <td className="text-center  p-1 md:p-3">
                            {Math.ceil(item.count || 0)} of boxes
                          </td>
                          {/* <td className="text-center  p-1 md:p-3">
                            {Number(item.earning).toFixed(2)}
                          </td> */}
                        </tr>
                      )
                  )}
              </tbody>
            </table>
          </div>

          <div className="text-2xl p-5 w-full  border-2 border-white mt-10  flex justify-center">
            <span className="bold text-[#f7d93e] ">Weekly Leaders</span>
          </div>
          <div className="overflow-x-auto text-white block sm:flex justify-center  w-full border-t-0 border-2 border-white">
            <table className="table-auto border-spacing-x-5 border-spacing-y-2  ">
              {/* <thead>
                <tr className=" ">
                  <th className="text-center  p-1 md:p-3">{" "}</th>
                  <th className="text-center  p-1 md:p-3">Player</th>
                  <th className="text-center  p-1 md:p-3">Boxes Opened</th>
                  <th className="text-center  p-1 md:p-3">Earning(HBAR)</th>
                </tr>
              </thead> */}
              <tbody>
                {stats.weekly10BoxOpeners &&
                  stats.weekly10BoxOpeners.length > 0 &&
                  stats.weekly10BoxOpeners.map(
                    (item, index) =>
                      item._id !== "" && (
                        <tr className=" " key={index}>
                          <td className="text-center  p-1 md:p-3">{index + 1}</td>
                          <td className="text-center  p-1 md:p-3">{item.player}</td>
                          <td className="text-center  p-1 md:p-3">
                            {Math.ceil(item.count || 0)} of boxes
                          </td>
                          {/* <td className="text-center  p-1 md:p-3">
                            {Number(item.earning).toFixed(2)}
                          </td> */}
                        </tr>
                      )
                  )}
              </tbody>
            </table>
          </div>

        </div>
        <div className="w-10/12 md:w-[50%] flex flex-col  md:ml-10 mt-10 md:mt-0">
              
          <div className="text-2xl p-5 w-full border-2 border-white flex justify-center">
            <span className="bold text-[#f7d93e] w-full text-center">2 Box open winning percentage</span>
          </div>
          <div className="overflow-x-auto text-white block sm:flex justify-center  w-full border-t-0 border-2 border-white  flex-col ">
            <div className="flex w-full justify-between px-10 pt-5 pb-0 mb-0">
              <div className="text-xl">{`Win(${Number(49.96 + Number(randomDelta)).toFixed(2)}%)`}</div>
              <div className="text-xl">{`Lose(${Number(50.04 - Number(randomDelta)).toFixed(2)}%)`}</div>
            </div>
           <PieChart           
              className="p-3 rotate-90"
              data={[
                { title: 'Win', value: 49.96 + Number(randomDelta), color: '#00ff00', key:"win" },
                { title: 'Lose', value: 50.04 - Number(randomDelta), color: '#ffff00', key:"lose" },
              ]}
              //  label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
                labelStyle={{
                  fontSize: '5px',
                  fontFamily: 'sans-serif',
                  fill: '#fff',
                }}
                radius={42}
                lineWidth={25}
                labelPosition={112}
                animate
            />
          </div>
                          
          <div className="text-2xl p-5 w-full border-2 border-white mt-10 flex justify-center">
            <span className="bold text-[#f7d93e] ">Daily Highest Earners</span>
          </div>
          <div className="overflow-x-auto text-white block sm:flex justify-center  w-full border-t-0 border-2 border-white">
            <table className="table-auto border-spacing-x-5 border-spacing-y-2  ">
              {/* <thead>
                <tr className=" ">
                  <th className="text-center  p-1 md:p-3">{" "}</th>
                  <th className="text-center  p-1 md:p-3">Player</th>
                  <th className="text-center  p-1 md:p-3">Boxes Opened</th>
                  <th className="text-center  p-1 md:p-3">Earning(HBAR)</th>
                </tr>
              </thead> */}
              <tbody>
                {stats.daily10BoxEarners &&
                  stats.daily10BoxEarners.length > 0 &&
                  stats.daily10BoxEarners.map(
                    (item, index) =>
                      item._id !== "" && (
                        <tr className=" " key={index}>
                          <td className="text-center  p-1 md:p-3">{index + 1}</td>
                          <td className="text-center  p-1 md:p-3">{item.player}</td>
                          {/* <td className="text-center  p-1 md:p-3">
                            {Math.ceil(item.track || 0)} of boxes
                          </td> */}
                          <td className="text-center  p-1 md:p-3">
                            {Number(item.earning).toFixed(2)} HBAR
                          </td>
                        </tr>
                      )
                  )}
              </tbody>
            </table>
          </div>

          <div className="text-2xl p-5 w-full border-2 border-white mt-10 flex justify-center">
            <span className="bold text-[#f7d93e] ">Weekly Highest Earners</span>
          </div>
          <div className="overflow-x-auto text-white block sm:flex justify-center  w-full border-t-0 border-2 border-white">
            <table className="table-auto border-spacing-x-5 border-spacing-y-2  ">
              {/* <thead>
                <tr className=" ">
                  <th className="text-center  p-1 md:p-3">{" "}</th>
                  <th className="text-center  p-1 md:p-3">Player</th>
                  <th className="text-center  p-1 md:p-3">Boxes Opened</th>
                  <th className="text-center  p-1 md:p-3">Earning(HBAR)</th>
                </tr>
              </thead> */}
              <tbody>
                {stats.weekly10BoxEarners &&
                  stats.weekly10BoxEarners.length > 0 &&
                  stats.weekly10BoxEarners.map(
                    (item, index) =>
                      item._id !== "" && (
                        <tr className=" " key={index}>
                          <td className="text-center  p-1 md:p-3">{index + 1}</td>
                          <td className="text-center  p-1 md:p-3">{item.player}</td>
                          {/* <td className="text-center  p-1 md:p-3">
                            {Math.ceil(item.track || 0)} of boxes
                          </td> */}
                          <td className="text-center  p-1 md:p-3">
                            {Number(item.earning).toFixed(2)} HBAR
                          </td>
                        </tr>
                      )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
