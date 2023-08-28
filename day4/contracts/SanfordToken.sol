//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract SanfordToken{

    // State variables
    uint256 public constant s_totalSupply = 1000;
    uint256 public totalCreated = 0;
    address public immutable i_boss;
    uint256 public constant CREATION_PRICE = 0.1 ether;
    mapping(address => uint256) public balances;


    // Events
    event Buy(address indexed buyer);

    // Modifiers
    modifier onlyOwner () {
        require(msg.sender == i_boss, "Not the boss");
        _;
    }

    // Constructor
    constructor () {
        i_boss = msg.sender;
    }

    // Public Function
    function create(uint256 quantity) public onlyOwner{
        require(quantity + totalCreated <= s_totalSupply, "totalSupply reached!");

        balances[msg.sender] += quantity;
        totalCreated += quantity;

    }

    function send(address to, uint256 quantity) public {
        require(balances[msg.sender] >= quantity, "Not enough");
        balances[msg.sender] -= quantity;
        balances[to] += quantity;
    }

    function buy() public payable {
        require(msg.value == CREATION_PRICE, "Incorrect ETH amount");
        require(totalCreated < s_totalSupply, "totalSupply reached!");

        balances[msg.sender] += 1;
        totalCreated += 1;

        emit Buy(msg.sender);
    }

    function withdraw() public onlyOwner {
        (bool success,) = i_boss.call{value: address(this).balance}("");
        require(success, "Tranction Failed!");
    }

    // Receive 
    receive () external payable {}
}