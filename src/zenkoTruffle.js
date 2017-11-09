const Web3 = require('web3');
const contract = require("truffle-contract");
const web3 = new Web3.providers.HttpProvider("http://localhost:8545");

var json = require("../build/contracts/Zenko.json");
var MyContract = contract(json);
MyContract.setProvider(web3);

function balance(id) {
    return MyContract.deployed().then(function(instance) {
        var deployed = instance;
        return instance.getBalance.call(id);
    }).then(function(result) {
        console.log(result);
        return;
    });
}

// TODO Verify price unit consitency with acces()
function deposit(id, price) {
    return MyContract.deployed().then(function(instance) {
        var deployed = instance;
        return instance.deposit(id, {from: MyContract.web3.eth.coinbase, value: price} );
    }).then(function(result) {
        console.log(result);
    });
}

function access(id, price) {
    return MyContract.deployed().then(function(instance) {
        var deployed = instance;
        return instance.access(id, price, {from: MyContract.web3.eth.coinbase});
    }).then(function(result) {
        console.log(result);
    });
}

var id = "79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be";
//balance(id);
async function main () {
//await deposit(id, 512);
await access(id, 32090010);
await balance(id);
};
main();
//access(id, 51200000000000000);
