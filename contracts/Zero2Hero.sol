// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Zero2Hero is ERC20 {
    mapping(address => uint256) public lastRewardTime; // Track last reward time
    uint256 public constant REWARD_INTERVAL = 1 days; // 1 day between rewards

    constructor() ERC20("RewardToken", "RWT") {
        _mint(address(this), 1000000 * 10**18); // Mint 1 million tokens to contract
    }

    function claimReward(uint256 amount) external {
        require(isEligibleForReward(msg.sender), "Reward not yet available");
        require(balanceOf(address(this)) >= amount, "Not enough tokens in contract");
        
        lastRewardTime[msg.sender] = block.timestamp;
        _transfer(address(this), msg.sender, amount);
        
        emit Transfer(address(this), msg.sender, amount);
    }

    function isEligibleForReward(address user) public view returns (bool) {
        if (lastRewardTime[user] == 0) {
            return true; // First time claiming
        }
        return block.timestamp >= lastRewardTime[user] + REWARD_INTERVAL;
    }
}
