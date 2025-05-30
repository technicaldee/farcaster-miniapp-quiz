const hre = require("hardhat");

async function main() {
    const QuizRewards = await hre.ethers.getContractFactory("QuizRewards");
    const quizRewards = await QuizRewards.deploy(
        "Farcaster Quiz NFT", // Name
        "FQNFT" // Symbol
    );

    await quizRewards.waitForDeployment();

    console.log("QuizRewards deployed to:", await quizRewards.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
}); 