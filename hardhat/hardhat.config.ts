import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const fs = require("fs");
const SEPOLIA_ACCOUNT_KEY = fs.readFileSync(".secret").toString().trim();
const INFURA_API_KEY = fs.readFileSync(".infura").toString().trim();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_ACCOUNT_KEY],
    },
  },
};

export default config;
