'use strict';

var getRpcClient = require('./rpc-client');
var callSpec = require('./call-spec');

var RpcClient = getRpcClient(callSpec);

module.exports = RpcClient;
