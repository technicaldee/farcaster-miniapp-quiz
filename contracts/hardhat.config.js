require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.24",
    networks: {
        celo: {
            url: "https://forno.celo.org",
            chainId: 42220,
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
        },
        alfajores: {
            url: "https://alfajores-forno.celo-testnet.org",
            chainId: 44787,
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
        }
    },
    etherscan: {
        apiKey: {
            celo: process.env.CELOSCAN_API_KEY,
            alfajores: process.env.CELOSCAN_API_KEY
        }
    }
}; 