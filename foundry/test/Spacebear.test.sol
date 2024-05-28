pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/SpaceBear.sol";


contract SpaceBearTest is Test {

    SpaceBear spaceBear;

    function setUp() public {
        spaceBear = new SpaceBear();
    }

    function testNameIsSpaceBear() public {
        assertEq(spaceBear.name(), "SpaceBear");
    }

    function testMintingNFTs() public {
        spaceBear.safeMint(msg.sender);
        assertEq(spaceBear.ownerOf(0), msg.sender);
        assertEq(spaceBear.tokenURI(0), "https://ethereum-blockchain-developer.com/2022-06-nft-truffle-hardhat-foundry/nftdata/spacebear_1.json");
    }

    function testPurchaseNFT() public {
        address purchaser = address(0x1);
        vm.startPrank(purchaser);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, purchaser));
        spaceBear.safeMint(purchaser);
        vm.stopPrank();
    }
}