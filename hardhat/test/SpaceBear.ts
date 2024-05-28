const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("SpaceBear", () => {
  async function deploySpaceBearAndMintTokenFixture() {
    const SpaceBear = await ethers.getContractFactory("SpaceBear");
    const spaceBearInstance = await SpaceBear.deploy();

    const [owner, otherAccount] = await ethers.getSigners();
    const transaction = await spaceBearInstance.safeMint(
      otherAccount.address,
      "spacebear_1.json"
    );

    return { spaceBearInstance, transaction };
  }
  it("is possible to mint a token", async () => {
    const { spaceBearInstance } = await loadFixture(
      deploySpaceBearAndMintTokenFixture
    );
    const [owner, otherAccount] = await ethers.getSigners();
    expect(await spaceBearInstance.ownerOf(0)).to.equal(otherAccount.address);
  });

  it("fails to transfer tokens from the wrong address", async () => {
    const SpaceBear = await ethers.getContractFactory("SpaceBear");
    const { spaceBearInstance, transaction } = await loadFixture(
      deploySpaceBearAndMintTokenFixture
    );
    const [owner, otherAccount, notTheNftOwner] = await ethers.getSigners();

    const receipt = await transaction.wait();

    expect(await spaceBearInstance.ownerOf(0)).to.equal(otherAccount.address);

    await expect(
      spaceBearInstance
        .connect(notTheNftOwner)
        .transferFrom(
          otherAccount.address,
          notTheNftOwner.address,
          BigInt(receipt.logs[0].topics[3])
        )
    ).to.be.revertedWithCustomError(SpaceBear, "ERC721InsufficientApproval");
  });
});
