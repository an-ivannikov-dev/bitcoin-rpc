const getRpcClient = require('./rpc-client');
const callSpec = require('./v0.20.1/call-spec');



const RpcClient = getRpcClient(callSpec);

module.exports = RpcClient;
