/* =========== 全局参数 =========== */
var web3;
var chainID;
var chain;
var currency;
var accountAddress;
var contractAddress;
var contractInstance;
var tokenSymbol;
var tokenBalance;

var erc20Abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "_decimals",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "MoreThanBalance",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Approval",
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
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "Burn",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "Mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
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
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
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
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
];

function hideAllSections() {
  document.getElementById("section_wallet").style.display = "none";
  document.getElementById("section_read_contract").style.display = "none";
  hideContractSection();
}

function hideContractSection() {
  document.getElementById("section_contract").style.display = "none";
  document.getElementById("section_mint").style.display = "none";
  document.getElementById("section_transfer").style.display = "none";
  document.getElementById("section_burn").style.display = "none";
  hideTransactionSection();
}

function hideTransactionSection() {
  document.getElementById("section_gas").style.display = "none";
  document.getElementById("section_hash").style.display = "none";
}

// ========== 展示钱包信息 ========== //
function showWallet() {
  document.getElementById("section_wallet").style.display = "block";
  document.getElementById("section_read_contract").style.display = "block";
}

// ============== 在有合约信息的情况下 ============== //
// ======= 确认连接钱包的账户是否为合约 owner ======= //
// ============= 如果是，则提供增发功能 ============= //
async function isMintVisible() {
  var contractOwner = await contractInstance.methods.owner().call();

  if (tokenSymbol && accountAddress == contractOwner) {
    document.getElementById("section_mint").style.display = "block";
  } else {
    document.getElementById("section_mint").style.display = "none";
  }
}

// ========== 得到 Chain 名称并设定 gas 名称 ========== //
function getChainName() {
  if (chainID === 1) {
    chain = "Ethereum";
    currency = "ETH";
  } else if (chainID === 5) {
    chain = "Goerli";
    currency = "ETH";
  } else if (chainID === 11155111) {
    chain = "Sepolia";
    currency = "ETH";
  } else if (chainID === 56) {
    chain = "BSC";
    currency = "BNB";
  } else if (chainID === 97) {
    chain = "BSC Testnet";
    currency = "BNB";
  } else {
    chain = "Unknown";
    currency = "";
  }
}

// ========== 连接钱包并展示相关链上信息 ========== //
async function connect() {
  hideAllSections();

  if (window.ethereum) {
    try {
      await window.ethereum.enable();
    } catch (error) {
      console.error("User denied account access");
    }
    web3 = new Web3(window.ethereum);
  } else if (window.web3) {
    web3 = new Web3(window.ethereum);
  } else {
    alert("Please install wallet");
  }
  try {
    chainID = await web3.eth.getChainId();
    getChainName();

    var blockNumber = await web3.eth.getBlockNumber();
    var block = await web3.eth.getBlock(blockNumber);
    var blockTimestamp = block.timestamp;

    var accounts = await web3.eth.getAccounts();
    accountAddress = accounts[0];

    var balance = await web3.eth.getBalance(accountAddress);
    var balanceFormatted = Number(web3.utils.fromWei(balance)).toFixed(5);

    document.getElementById("chain").innerText = chain;
    document.getElementById("chain_id").innerText = chainID;
    document.getElementById("block_number").innerText = blockNumber;
    document.getElementById("block_timestamp").innerText = blockTimestamp;
    document.getElementById("account_address").innerText = accountAddress;
    document.getElementById("account_balance").innerText =
      balanceFormatted + " " + currency;

    showWallet();
  } catch (error) {
    alert("Error: " + error.message);
  }
}

// ========== 读取合约信息并展示 ========== //
async function read() {
  hideContractSection();

  try {
    contractAddress = document.getElementById("contract_address").value;
    contractInstance = new web3.eth.Contract(erc20Abi, contractAddress);

    tokenSymbol = await contractInstance.methods.symbol().call();
    var tokenTotalSupply = await contractInstance.methods.totalSupply().call();

    tokenBalance = await contractInstance.methods
      .balanceOf(accountAddress)
      .call();

    document.getElementById("token_symbol").innerText = tokenSymbol;
    document.getElementById("token_totalSupply").innerText =
      web3.utils.fromWei(tokenTotalSupply);
    document.getElementById("token_balance").innerText =
      web3.utils.fromWei(tokenBalance);

    document.getElementById("contract_warning").style.display = "none";
    document.getElementById("section_contract").style.display = "block";
    isMintVisible();
    document.getElementById("section_transfer").style.display = "block";
    document.getElementById("section_burn").style.display = "block";
  } catch (error) {
    document.getElementById("contract_warning").style.display = "block";
    alert("Error: " + error.message);
  }
}

// ========== 发送交易 ========== //
async function sendTransaction(transferData) {
  // 展示 gas 信息
  var estimatedGasValue = await web3.eth.estimateGas({
    to: contractAddress,
    data: transferData,
    from: accountAddress,
    value: "0x0",
  });

  var gasPrice = await web3.eth.getGasPrice();

  document.getElementById("estimated_gas").innerText = estimatedGasValue;
  document.getElementById("gas_price").innerText = web3.utils.fromWei(
    gasPrice,
    "gwei"
  );
  document.getElementById("section_gas").style.display = "block";

  // 展示 transaction hash 信息
  var nonce = await web3.eth.getTransactionCount(accountAddress);

  var rawTransaction = {
    from: accountAddress,
    to: contractAddress,
    nonce: web3.utils.toHex(nonce),
    gasPrice: gasPrice,
    gas: estimatedGasValue * 2,
    value: "0x0",
    data: transferData,
    chainId: chainID,
  };

  web3.eth
    .sendTransaction(rawTransaction)
    .on("transactionHash", function (hash) {
      console.log("Transaction Hash: ", hash);
      document.getElementById("tx_hash").innerText = hash;
      document.getElementById("section_hash").style.display = "block";
    })
    .on("confirmation", async function (confirmationNumber, receipt) {
      if (confirmationNumber >= 1) {
        // Wait for at least 1 confirmation
        tokenBalance = await contractInstance.methods
          .balanceOf(accountAddress)
          .call();
        document.getElementById("token_balance").innerText =
          web3.utils.fromWei(tokenBalance);
      }
    });
}

// ========== 增发函数 ========== //
async function mint() {
  hideTransactionSection();

  try {
    var recipientAddress = document.getElementById("recipient_address").value;
    var mintAmount = document.getElementById("mint_amount").value;

    var transferData = contractInstance.methods
      .Mint(recipientAddress, web3.utils.toWei(mintAmount))
      .encodeABI();

    await sendTransaction(transferData);
  } catch (error) {
    alert("Error: " + error.message);
  }
}

// ========== 转账函数 ========== //
async function transfer() {
  hideTransactionSection();

  try {
    var toAddress = document.getElementById("to_address").value;
    var transferAmount = document.getElementById("transfer_amount").value;
    tokenBalance = document.getElementById("token_balance").innerText;

    // 只有当账户余额大于等于转账数值时执行，否则报错
    if (parseFloat(tokenBalance) >= parseFloat(transferAmount)) {
      document.getElementById("transfer_amount_warning").style.display = "none";

      var transferData = contractInstance.methods
        .transfer(toAddress, web3.utils.toWei(transferAmount))
        .encodeABI();
      await sendTransaction(transferData);
    } else {
      document.getElementById("transfer_amount_warning").innerText =
        "Transfer amount more than balance";
      document.getElementById("transfer_amount_warning").style.display =
        "block";
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
}

// ========== 销毁函数 ========== //
async function burn() {
  hideTransactionSection();

  try {
    var burnAmount = document.getElementById("burn_amount").value;
    tokenBalance = document.getElementById("token_balance").innerText;

    // 只有当账户余额大于等于销毁数值时执行，否则报错
    if (parseFloat(tokenBalance) >= parseFloat(burnAmount)) {
      document.getElementById("burn_amount_warning").style.display = "none";

      var transferData = contractInstance.methods
        .Burn(web3.utils.toWei(burnAmount))
        .encodeABI();
      await sendTransaction(transferData);
    } else {
      document.getElementById("burn_amount_warning").innerText =
        "Burn amount more than balance";
      document.getElementById("burn_amount_warning").style.display = "block";
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
}
