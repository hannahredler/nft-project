const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SpaceBear", () => {
  it("is possible to mint a token", async () => {
    const SpaceBear = await ethers.getContractFactory("SpaceBear");
    const spaceBearInstance = await SpaceBear.deploy();

    const [owner, otherAccount] = await ethers.getSigners();
    await spaceBearInstance.safeMint(otherAccount.address, "spacebear_1.json");
    expect(await spaceBearInstance.ownerOf(0)).to.equal(otherAccount.address);
  });

  it("fails to transfer tokens from the wrong address", async () => {
    const SpaceBear = await ethers.getContractFactory("SpaceBear");
    const spaceBearInstance = await SpaceBear.deploy();
    const [owner, otherAccount, notTheNftOwner] = await ethers.getSigners();

    const transaction = await spaceBearInstance.safeMint(
      otherAccount,
      "spacebear_1.json"
    );

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
