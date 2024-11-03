const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Zero2HeroModule", (m) => {
  const zero2Hero = m.contract("Zero2Hero", []);
  return { zero2Hero };
});
