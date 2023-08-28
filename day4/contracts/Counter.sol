//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Counter {
    uint256 public count;
    address public boss;

    modifier onlyOwner(){
        require(msg.sender == boss, "Sorry, not the boss");
        _;
    } 

    constructor(uint256 _initialCount) {
        count = _initialCount;
        boss = msg.sender;
    }

    function get() public view returns (uint256) {
        return count;
    }

    function inc() public {
        count += 1;
    }

    function superInc() public onlyOwner {
        count += 10;
    }

    function dec() public onlyOwner{
        count -= 1;
    }
}
