// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "solmate/tokens/ERC20.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

    /* =========== 自定义错误 =========== */
error MoreThanBalance();

contract FirstToken is ERC20, Ownable {   

    /* ============ 构造函数 ============ */
    constructor (
        string memory _name,
        string memory _symbol,
        uint8 _decimals
    ) ERC20 (_name, _symbol, _decimals) {}

    /* ========== 增发函数 ========== */
    // ===== 只有合约Owner可以触发 ===== //
    function Mint(address _recipient, uint256 _amount) external onlyOwner {
        _mint(_recipient, _amount);        
    }

    /* ========== 销毁函数 ========== */
    // ===== 任何人都可以销毁，但只能销毁自己拥有的Token ===== //
    function Burn(uint256 _amount) public payable {
    // ===== 如果销毁数量超过自己拥有的，则返回自定义错误 ===== //
        if (_amount > balanceOf[msg.sender]) {
            revert MoreThanBalance();
        } else {
            _burn(msg.sender, _amount);
        }
    }
}