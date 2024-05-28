pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/SpaceBear.sol";


contract SpaceBearScript is Script {

    function setup() public {

    }

    function run() public {
        string memory seedPhrase = vm.readFile(".secret");
        uint256 privateKey = vm.deriveKey(seedPhrase, 0);
        vm.startBroadcast(privateKey);
        SpaceBear spaceBear = new SpaceBear();

        vm.stopBroadcast();
    }
}