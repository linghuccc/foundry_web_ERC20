// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/token.sol";

contract TokenScript is Script {
    function run() external {
        // ========= 从 .env 得到 Private Key ========= //
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        console.log("The Deployer address       : ", deployer);
        console.log("Balance is                 : ", deployer.balance);

        // ========= 部署合约 ========= //
        vm.startBroadcast(deployerPrivateKey);
        FirstToken ft = new FirstToken("FirstToken", "1ST", 18);
        vm.stopBroadcast();
        console.log("First Token deployed at    : ", address(ft));
    }
}