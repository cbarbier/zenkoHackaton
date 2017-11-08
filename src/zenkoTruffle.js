const Web3 = require('web3');
const contract = require("truffle-contract");
const web3 = new Web3.providers.HttpProvider("http://localhost:8545");

var json = require("../build/contracts/Zenko.json");
var MyContract = contract(json);
MyContract.setProvider(web3);

function balance(id) {
    MyContract.deployed().then(function(instance) {
        var deployed = instance;
        return instance.getBalance.call(id);
    }).then(function(result) {
        console.log(result);
        return;
    });
}

// TODO Verify price unit consitency with acces()
function deposit(id, price) {
    MyContract.deployed().then(function(instance) {
        var deployed = instance;
        return instance.deposit(id, {from: MyContract.web3.eth.coinbase, value: price} );
    }).then(function(result) {
        console.log(result);
    });
}

function access(id, price) {
    MyContract.deployed().then(function(instance) {
        var deployed = instance;
        return instance.access.call(id, price, {from: MyContract.web3.eth.coinbase});
    }).then(function(result) {
        console.log(result);
    });
}

var id = "e2r5";
balance(id);
deposit(id, 512);
balance(id);
access(id, 512);
access(id, 51200000000000000);
