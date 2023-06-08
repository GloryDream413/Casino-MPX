require("dotenv").config();
const axios = require("axios");
const Web3 = require("web3");

const EtherumWeb3 = new Web3("https://eth.rpc.blxrbdn.com");

async function contractExecuteQuery(
  cId,
  gasLim,
  fcnName,
  params,
  queryCost = new Hbar(0.001)
) {
  const contractCall = await new ContractCallQuery()
    .setContractId(cId)
    .setGas(gasLim)
    .setFunction(fcnName, params)
    .setQueryPayment(queryCost)
    .execute(client);

  return decodeFunctionResult(fcnName, contractCall.bytes);
}

/**
 * Decodes the result of a contract's function execution
 * @param functionName the name of the function within the ABI
 * @param resultAsBytes a byte array containing the execution result
 */
function decodeFunctionResult(functionName, resultAsBytes) {
  const functionAbi = abi.find((func) => func.name === functionName);
  const functionParameters = functionAbi.outputs;
  const resultHex = "0x".concat(Buffer.from(resultAsBytes).toString("hex"));
  const result = web3.eth.abi.decodeParameters(functionParameters, resultHex);
  return result;
}

async function getContractBalance() {
  const query = new ContractInfoQuery().setContractId(contractId);

  const info = await query.execute(client);

  return [info.balance];
}

const eventGettingUrl = `${process.env.MIRROR_NODE_MAINNET_URL}/api/v1/contracts/${process.env.CONTRACT_ID}/results/logs?order=desc&limit=64`;

async function getEventsFromMirror(contractId, abi, eventName) {
  console.log("\n -Getting event(s) from mirror nodes");

  const baseUrl =
    process.env.NETWORK_TYPE == "mainnet"
      ? process.env.MIRROR_NODE_MAINNET_URL
      : process.env.MIRROR_NODE_TESTNET_URL;

  const url = `${baseUrl}/api/v1/contracts/${contractId.toString()}/results/logs?order=desc&limit=20`;
  console.log(url);
  var eventList = [];
  await axios
    .get(url)
    .then(async function (response) {
      const jsonResponse = response.data;
      for (let idx = 0; idx < jsonResponse.logs.length; idx++) {
        let log = jsonResponse.logs[idx];
        // decode the event data
        if (log.data == "0x") return;
        // console.log(log.data, log.topics, eventName);
        const event = await decodeEvent(abi, log.data, log.topics, eventName);

        // console.log("EVENT:\n", JSON.stringify(event, null, 3));

        let outputStr = "";
        for (let f = 0; f < event.__length__; f++) {
          const field = event[f];
          let output = field;
          output = f == 0 ? output : " : " + output;
          outputStr += output;
        }

        eventList.push(event);
      }
      return eventList;
    })
    .catch(function (err) {
      console.error(err);
      return [];
    });
  return eventList;
}

/**
 * Decodes event contents using the ABI definition of the event
 * @param log log data as a Hex string
 * @param topics an array of event topics
 */
async function decodeEvent(abi, log, topics, eventName) {
  const eventAbi = abi.find(
    (event) => event.name === eventName && event.type === "event"
  );
  const decodedLog = await EtherumWeb3.eth.abi.decodeLog(
    eventAbi.inputs,
    log,
    topics
  );
  return decodedLog;
}

module.exports = {
  getEventsFromMirror,
};
