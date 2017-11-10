const Web3 = require('web3');
const contract = require("truffle-contract");
const server = process.env.GETH_SERVER;
const web3 = new Web3.providers.HttpProvider("http://" + server);

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


// var id = "79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be";
var id = process.env.ID;
function main () {
    if (process.argv[1] == "balance")
        balance(id);
    else if (process.argv[1] == "deposit" && process.argv[2])
        deposit(process.argv[1], process.argv[2]);
    else if (process.argv[1] == "deposit" && process.argv[2])
        deposit(process.argv[1], process.argv[2]);
    else
        process.exit(1);
};

main();
//balance(id);
//await deposit(id, 512);
// await access(id, 32090010);
// await balance(id);
//access(id, 51200000000000000);
