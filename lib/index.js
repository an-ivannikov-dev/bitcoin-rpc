'use strict';

const getRpcClient = require('./rpc-client');
const callSpec = require('./call-spec');

const RpcClient = getRpcClient(callSpec);

module.exports = RpcClient;
