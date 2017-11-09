// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   code.js                                            :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: cbarbier && fmaury                         +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2017/11/08 15:22:17 by cbarbier          #+#    #+#             //
//   Updated: 2017/11/09 09:41:25 by bwaegene         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

const http = require('http');
const port = 8001;

const Web3 = require('web3');
const contract = require("truffle-contract");
const web3 = new Web3.providers.HttpProvider("http://localhost:8545");

var json = require("../build/contracts/Zenko.json");
var MyContract = contract(json);
MyContract.setProvider(web3);

function access(id, price) {
    MyContract.deployed().then(function(instance) {
        var deployed = instance;
        return instance.access.call(id, price, {from: MyContract.web3.eth.coinbase});
    }).then(function(result) {
        console.log(result);
    });
}

function is_good_operation(ope)
{
	if (ope == "DELETE" || ope == "GET" || ope == "PUT")
		return (1);
	return (0);
}

function	getPrice(meth, size)
{
	var tabPrice = {"GET": 0.1,"DELETE": 0.2, "PUT": 0.5};
	console.log(meth);
	return (tabPrice[meth] * size);
}

function isAccess(url)
{
	let	price;
	var res = url.split("/");
	if (res[1] != "v0" || res[2] != "access" || res[4] != "method" || res[6] != "size" || isNaN(res[7]) || res[8])
		return (400);
	if (!is_good_operation(res[5]))
		return (405);
	price = getPrice(res[5], parseInt(res[7]));
	if (!access(res[2], price))
		return (400);
	return (200);
}

const requestHandler = (request, response) => {
	console.log(request.url)
	response.end('Welcome on the node server managing the payment access of Cloud Server' + isAccess(request.url));
}

const server = http.createServer(requestHandler)

	server.listen(port, (err) => {
		  if (err)
			return console.log('Error: something wrong happened while listening the port ${port} :(', err);
		  console.log(`server is listening on ${port}`);
	});
