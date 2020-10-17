const http = require('http');
const https = require('https');
const configureLogger = require('./logger');
const { decodeURL, generateRPCMethods, rpc } = require('./lib');



class AbstractBitcoinRpcClient {
  constructor(opts = {}) {
    // opts can ba an URL string
    if (typeof opts === 'string') {
      opts = decodeURL(opts);
    }
    this.opts = opts;

    this.host = opts.host || '127.0.0.1';
    this.port = opts.port || 8332;
    this.user = opts.user || 'user';
    this.pass = opts.pass || 'pass';
    this.protocol = opts.protocol === 'http' ? http : https;
    this.pathname = opts.pathname || '/';
    this.disableAgent = opts.disableAgent || false;
    this.batchedCalls = null;
    this.callSpec = opts.callSpec || {};

    const isRejectUnauthorized = typeof opts.rejectUnauthorized !== 'undefined';
    this.rejectUnauthorized = isRejectUnauthorized ? opts.rejectUnauthorized : true;

    this.logger = opts.logger || configureLogger({
      level: opts.loggerLevel || 'info',
    });
    this.log = opts.log || this.logger.getLogger('Bitcoin JSON-RPC');

    this.generateRPCMethods = generateRPCMethods.bind(this);
  }

  noop() {
    return;
  }

  batch() {
    const newBitcoinRpcClient = new AbstractBitcoinRpcClient(this.opts);
    newBitcoinRpcClient.generateRPCMethods(newBitcoinRpcClient, this.callSpec, rpc);
    newBitcoinRpcClient.batchedCalls = [];
    batchCallback();
    return rpc.call(newBitcoinRpcClient, newBitcoinRpcClient.batchedCalls, resultCallback);
  }

  createBatch() {
    const newBitcoinRpcClient = new AbstractBitcoinRpcClient(this.opts);
    newBitcoinRpcClient.generateRPCMethods(newBitcoinRpcClient, this.callSpec, rpc);
    newBitcoinRpcClient.batchedCalls = [];
    return newBitcoinRpcClient;
  }

  call(resultCallback) {
    return rpc.call(this, this.batchedCalls, resultCallback);
  }
}


function getRpcClient(callSpec) {
  class BitcoinRpcClient extends AbstractBitcoinRpcClient {
    constructor(opts = {}) {
      super(opts);
      this.callSpec = callSpec;
      this.generateRPCMethods(this, this.callSpec, rpc);
    }
  }

  return BitcoinRpcClient;
}

module.exports = getRpcClient;
