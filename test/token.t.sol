// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/token.sol";

contract tokenTest is Test {
    // ===== 自定义测试参数 ===== //
    FirstToken private token;
    address internal constant testAddress = address(0x1337);
    uint256 internal constant mintAmount = 3000 * 1e18; 
    uint256 internal constant burnAmount = 2000 * 1e18; 
    uint256 internal constant burnBigAmount = 5000 * 1e18; 

    function setUp() public {
        token = new FirstToken("FirstTokenTest", "1STT", 18);
    }

    // ===== 测试增发函数 ===== //
    function test_Mint_Works_As_Owner() public {
        token.Mint(testAddress, mintAmount);
        assertEq(token.balanceOf(testAddress), mintAmount);
    }

    // ===== 测试增发函数（caller 不是 owner 的情况） ===== //
    function test_Mint_Fails_As_Not_Owner() public {
        vm.expectRevert("Ownable: caller is not the owner");
        vm.startPrank(testAddress);
        token.Mint(testAddress, mintAmount);
        vm.stopPrank();
    }

    // ===== 测试销毁函数 ===== //
    function test_Burn_Works() public {
        token.Mint(testAddress, mintAmount);
        
        vm.startPrank(testAddress);
        token.Burn(burnAmount);
        assertEq(token.balanceOf(testAddress), mintAmount - burnAmount);
        vm.stopPrank();
    }

    // ===== 测试销毁函数（输入数值大于 balance 的情况） ===== //
    function test_Burn_Fails_When_Exceed_Balance() public {
        token.Mint(testAddress, mintAmount);
        
        vm.expectRevert(MoreThanBalance.selector);
        vm.startPrank(testAddress);
        token.Burn(burnBigAmount);
        vm.stopPrank();
    }
}