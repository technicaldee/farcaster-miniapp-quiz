const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("QuizRewards", function () {
    let quizRewards;
    let owner;
    let user;

    beforeEach(async function () {
        [owner, user] = await ethers.getSigners();

        const QuizRewards = await ethers.getContractFactory("QuizRewards");
        quizRewards = await QuizRewards.deploy("Farcaster Quiz NFT", "FQNFT");
        await quizRewards.waitForDeployment();
    });

    it("Should set the right owner", async function () {
        expect(await quizRewards.owner()).to.equal(owner.address);
    });

    it("Should allow user to complete quiz and mint NFT", async function () {
        const score = 100;

        await quizRewards.connect(user).completeQuiz(score);

        expect(await quizRewards.hasUserCompletedQuiz(user.address)).to.be.true;
        expect(await quizRewards.getUserScore(user.address)).to.equal(score);
        expect(await quizRewards.balanceOf(user.address)).to.equal(1);
    });

    it("Should not allow user to complete quiz twice", async function () {
        await quizRewards.connect(user).completeQuiz(100);

        await expect(
            quizRewards.connect(user).completeQuiz(100)
        ).to.be.revertedWith("Quiz already completed");
    });

    it("Should not allow zero score", async function () {
        await expect(
            quizRewards.connect(user).completeQuiz(0)
        ).to.be.revertedWith("Score must be greater than 0");
    });
}); 