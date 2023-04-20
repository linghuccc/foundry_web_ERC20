/* =========== 全局参数 =========== */
var web3;
var chainID;
var chainName;
var currency;
var scanner;
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

// ========== 隐藏所有信息 ========== //
function hideAllSections() {
  document.getElementById("section_wallet").style.display = "none";
  document.getElementById("section_read_contract").style.display = "none";
  hideContractSectionClearInput();
}

// ========== 隐藏合约信息 ========== //
function hideContractSectionClearInput() {
  document.getElementById("contract_warning").style.display = "none";
  document.getElementById("section_contract").style.display = "none";
  document.getElementById("section_mint").style.display = "none";
  document.getElementById("section_transfer").style.display = "none";
  document.getElementById("section_burn").style.display = "none";

  // 清除 Mint/Transfer/Burn 部分的 input ,并隐藏交易信息
  document.getElementById("mint_amount").value = "";
  document.getElementById("transfer_amount").value = "";
  document.getElementById("burn_amount").value = "";
  hideTransactionSection();
}

// =================== 隐藏交易信息 =================== //
// ====== 清除 Mint/Transfer/Burn 部分的 warning ====== //
function hideTransactionSection() {
  document.getElementById("section_gas").style.display = "none";
  document.getElementById("section_hash").style.display = "none";
  document.getElementById("mint_amount_warning").style.display = "none";
  document.getElementById("transfer_amount_warning").style.display = "none";
  document.getElementById("burn_amount_warning").style.display = "none";
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
  const contractOwner = await contractInstance.methods.owner().call();

  if (tokenSymbol && accountAddress == contractOwner) {
    document.getElementById("section_mint").style.display = "block";
  } else {
    document.getElementById("section_mint").style.display = "none";
  }
}

// ============ 得到 Chain 名称 ============ //
// ========== 设定 gas token 名称 ========== //
// ========== 并设定 scanner 地址 ========== //
function getChainInfo() {
  const chainInfo = [
    {
      id: 1,
      name: "Ethereum",
      currency: "ETH",
      scanner: "https://etherscan.io/tx/",
    },
    {
      id: 5,
      name: "Goerli",
      currency: "ETH",
      scanner: "https://goerli.etherscan.io/tx/",
    },
    {
      id: 11155111,
      name: "Sepolia",
      currency: "ETH",
      scanner: "https://sepolia.etherscan.io/tx/",
    },
    {
      id: 56,
      name: "BSC",
      currency: "BNB",
      scanner: "https://bscscan.com/tx/",
    },
    {
      id: 97,
      name: "BSC Testnet",
      currency: "BNB",
      scanner: "https://testnet.bscscan.com/tx/",
    },
  ];

  const chain = chainInfo.find((c) => c.id === chainID);

  if (chain) {
    chainName = chain.name;
    currency = chain.currency;
    scanner = chain.scanner;
  } else {
    chainName = "Unknown";
    currency = "";
    scanner = "";
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
    getChainInfo();

    const blockNumber = await web3.eth.getBlockNumber();
    const block = await web3.eth.getBlock(blockNumber);
    const blockTimestamp = block.timestamp;

    const accounts = await web3.eth.getAccounts();
    accountAddress = accounts[0];

    const balance = await web3.eth.getBalance(accountAddress);
    const balanceFormatted = Number(web3.utils.fromWei(balance)).toFixed(5);

    document.getElementById("chain_name").innerText = chainName;
    document.getElementById("chain_id").innerText = chainID;
    document.getElementById("block_number").innerText = blockNumber;
    document.getElementById("block_timestamp").innerText = blockTimestamp;
    document.getElementById("account_address").innerText = accountAddress;
    document.getElementById("account_balance").innerText =
      balanceFormatted + " " + currency;

    showWallet();
  } catch (error) {
    // 将 alert 函数的执行推迟到 0.5 秒之后
    setTimeout(() => {
      alert("Error: " + error.message);
    }, 500);
  }
}

// ========== 读取合约 total supply 信息并展示 ========== //
// ========== 读取 account balance 信息并展示 ========== //
async function showSupplyAndBalance() {
  const tokenTotalSupply = await contractInstance.methods.totalSupply().call();
  tokenBalance = await contractInstance.methods
    .balanceOf(accountAddress)
    .call();

  document.getElementById("token_totalSupply").innerText =
    web3.utils.fromWei(tokenTotalSupply);
  document.getElementById("token_balance").innerText =
    web3.utils.fromWei(tokenBalance);
}

// ========== 读取合约信息并展示 ========== //
async function read() {
  hideContractSectionClearInput();

  try {
    contractAddress = document.getElementById("contract_address").value;
    contractInstance = new web3.eth.Contract(erc20Abi, contractAddress);

    await showSupplyAndBalance();
    tokenSymbol = await contractInstance.methods.symbol().call();
    document.getElementById("token_symbol").innerText = tokenSymbol;

    document.getElementById("contract_warning").style.display = "none";
    document.getElementById("section_contract").style.display = "block";
    await isMintVisible();
    document.getElementById("section_transfer").style.display = "block";
    document.getElementById("section_burn").style.display = "block";
    document.getElementById("section_burn").scrollIntoView(true);
  } catch (error) {
    document.getElementById("contract_warning").style.display = "block";

    // 将 alert 函数的执行推迟到 0.5 秒之后
    setTimeout(() => {
      alert("Error: " + error.message);
    }, 500);
  }
}

// ========== 发送交易 ========== //
async function sendTransaction(transferData) {
  // 展示 gas 信息
  const estimatedGasValue = await web3.eth.estimateGas({
    to: contractAddress,
    data: transferData,
    from: accountAddress,
    value: "0x0",
  });
  const gasPrice = await web3.eth.getGasPrice();

  document.getElementById("estimated_gas").innerText = estimatedGasValue;
  document.getElementById("gas_price").innerText = web3.utils.fromWei(
    gasPrice,
    "gwei"
  );
  document.getElementById("section_gas").style.display = "block";
  document.getElementById("section_gas").scrollIntoView(true);

  // 展示 transaction hash 信息
  const nonce = await web3.eth.getTransactionCount(accountAddress);
  const rawTransaction = {
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
      // console.log("Transaction Hash: ", hash);
      document.getElementById("tx_hash").innerText = hash;
      document.getElementById("tx_hash").href = scanner + hash;
      document.getElementById("tx_hash").target = "_blank";
      document.getElementById("section_hash").style.display = "block";
      document.getElementById("section_hash").scrollIntoView(true);
    })
    .on("confirmation", async function (confirmationNumber, receipt) {
      if (confirmationNumber >= 1) {
        // Wait for at least 1 confirmation
        // 更新页面的 total supply 信息和 token balance 信息
        await showSupplyAndBalance();
        document.getElementById("account_balance").scrollIntoView(true);
      }
    });
}

// ========== reset warning 并隐藏交易信息 ========== //
// ========== check 用户是否输入数字或是 0 ========== //
function clearAndCheck(amount, warningElement) {
  hideTransactionSection();

  const value = amount.trim();

  if (!value || isNaN(value) || value == 0) {
    warningElement.innerText = "Please enter a valid number";
    warningElement.style.display = "block";

    return false;
  } else {
    return true;
  }
}

// ========== 增发函数 ========== //
async function mint() {
  const mintAmount = document.getElementById("mint_amount").value;
  const mintWarningElement = document.getElementById("mint_amount_warning");

  // proceed only when mintAmount is valid
  if (clearAndCheck(mintAmount, mintWarningElement)) {
    try {
      const recipientAddress =
        document.getElementById("recipient_address").value;
      const transferData = contractInstance.methods
        .Mint(recipientAddress, web3.utils.toWei(mintAmount))
        .encodeABI();
      await sendTransaction(transferData);
    } catch (error) {
      setTimeout(() => {
        alert("Error: " + error.message);
      }, 500);
    }
  }
}

// ========== 转账函数 ========== //
async function transfer() {
  const transferAmount = document.getElementById("transfer_amount").value;
  const transferWarningElement = document.getElementById(
    "transfer_amount_warning"
  );

  // proceed only when transferAmount is valid
  if (clearAndCheck(transferAmount, transferWarningElement)) {
    try {
      const toAddress = document.getElementById("to_address").value;
      tokenBalance = document.getElementById("token_balance").innerText;

      // 只有当账户余额大于等于转账数值时执行，否则报错
      if (parseFloat(tokenBalance) >= parseFloat(transferAmount)) {
        transferWarningElement.style.display = "none";

        const transferData = contractInstance.methods
          .transfer(toAddress, web3.utils.toWei(transferAmount))
          .encodeABI();
        await sendTransaction(transferData);
      } else {
        transferWarningElement.innerText = "Transfer amount more than balance";
        transferWarningElement.style.display = "block";
      }
    } catch (error) {
      setTimeout(() => {
        alert("Error: " + error.message);
      }, 500);
    }
  }
}

// ========== 销毁函数 ========== //
async function burn() {
  const burnAmount = document.getElementById("burn_amount").value;
  const burnWarningElement = document.getElementById("burn_amount_warning");

  // proceed only when burnAmount is valid
  if (clearAndCheck(burnAmount, burnWarningElement)) {
    try {
      tokenBalance = document.getElementById("token_balance").innerText;

      // 只有当账户余额大于等于销毁数值时执行，否则报错
      if (parseFloat(tokenBalance) >= parseFloat(burnAmount)) {
        burnWarningElement.style.display = "none";

        const transferData = contractInstance.methods
          .Burn(web3.utils.toWei(burnAmount))
          .encodeABI();
        await sendTransaction(transferData);
      } else {
        burnWarningElement.innerText = "Burn amount more than balance";
        burnWarningElement.style.display = "block";
      }
    } catch (error) {
      setTimeout(() => {
        alert("Error: " + error.message);
      }, 500);
    }
  }
}
