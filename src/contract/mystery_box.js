export const HEDERA_CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "DepositForRewards",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "_min",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "_max",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "_prn",
        type: "uint32",
      },
    ],
    name: "GeneratedPRN",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_depositAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_earnedAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_timestamp",
        type: "uint256",
      },
    ],
    name: "Play",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_treasury",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_jackpot",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "_treasuryPercentage",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "_jackpotPercentage",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint32[]",
        name: "_boxCounts",
        type: "uint32[]",
      },
      {
        indexed: false,
        internalType: "uint32[]",
        name: "_rewardAmounts",
        type: "uint32[]",
      },
    ],
    name: "SetParmas",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "PLAYER_PRN",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "REWARD_POLICY",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "WIN_OR_LOSE",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_player",
        type: "address",
      },
    ],
    name: "checkPrn",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "depositForRewards",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "lo",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "hi",
        type: "uint32",
      },
    ],
    name: "getPseudorandomNumber",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPseudorandomSeed",
    outputs: [
      {
        internalType: "bytes32",
        name: "randomBytes",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_player",
        type: "address",
      },
    ],
    name: "isWinner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maintenance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "boxCount",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "selectedBoxIndex",
        type: "uint32",
      },
    ],
    name: "playBetting",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "readBalances",
    outputs: [
      {
        internalType: "uint256",
        name: "_valut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_treasury",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_jackpot",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_treasury",
        type: "address",
      },
      {
        internalType: "address",
        name: "_jackpot",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "_treasuryPercentage",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "_jackpotPercentage",
        type: "uint32",
      },
      {
        internalType: "uint32[]",
        name: "_boxCounts",
        type: "uint32[]",
      },
      {
        internalType: "uint32[]",
        name: "_rewardAmounts",
        type: "uint32[]",
      },
    ],
    name: "setGameParams",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
