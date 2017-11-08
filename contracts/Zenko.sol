pragma solidity ^0.4.18;

contract Zenko {
    address owner;
    mapping(string => uint) private balances;

    function Zenko() public {
        owner = msg.sender;
    }

    function access(string id, uint price) public returns (bool ret) {
        if (msg.sender != owner) {
            ret = false;
            return;
        }
        if (balances[id] >= price) {
            balances[id] -= price;
            ret = true;
        }
        else {
            ret = false;
        }
    }

    function deposit(string id) public payable {
        balances[id] += msg.value;
    }

    function getBalance(string id) public returns (uint ret) {
        ret = balances[id];
    }
    // TODO cashback
}
