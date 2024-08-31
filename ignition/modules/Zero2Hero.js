const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const JAN_1ST_2030 = 1893456000;
const ONE_GWEI = 1_000_000_000n;

module.exports = buildModule("Zero2HeroModule", (m) => {
  // Parameters
  const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
  const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);
  const routerAddress = m.getParameter("routerAddress", "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0"); // Chainlink Functions Router for Sepolia
  const priceFeedAddress = m.getParameter("priceFeedAddress", "0x694AA1769357215DE4FAC081bf1f309aDC325306"); // ETH/USD Price Feed for Sepolia

  // Deploy the Zero2Hero contract
  const zero2hero = m.contract("Zero2Hero", [
    unlockTime,
    routerAddress,
    priceFeedAddress
  ], {
    value: lockedAmount,
  });

  return { zero2hero };
});