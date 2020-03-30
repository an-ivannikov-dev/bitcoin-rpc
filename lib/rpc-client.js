'use strict';

var http = require('http');
var https = require('https');
var { decodeURL, generateRPCMethods, rpc } = require('./lib');

function getRpcClient(callSpec) {
  function RpcClient(opts) {
    // opts can ba an URL string
    if (typeof opts === 'string') {
      opts = decodeURL(opts);
    }
    opts = opts || {};
    this.host = opts.host || '127.0.0.1';
    this.port = opts.port || 8332;
    this.user = opts.user || 'user';
    this.pass = opts.pass || 'pass';
    this.protocol = opts.protocol === 'http' ? http : https;
    this.pathname = opts.pathname || '/';
    this.batchedCalls = null;
    this.disableAgent = opts.disableAgent || false;

    var isRejectUnauthorized = typeof opts.rejectUnauthorized !== 'undefined';
    this.rejectUnauthorized = isRejectUnauthorized ? opts.rejectUnauthorized : true;

    if (RpcClient.config.log) {
      this.log = RpcClient.config.log;
    } else {
      this.log = RpcClient.loggers[RpcClient.config.logger || 'normal'];
    }

  }

  var cl = console.log.bind(console);

  var noop = function () { };

  RpcClient.loggers = {
    none: { info: noop, warn: noop, err: noop, debug: noop },
    normal: { info: cl, warn: cl, err: cl, debug: noop },
    debug: { info: cl, warn: cl, err: cl, debug: cl }
  };

  RpcClient.config = {
    logger: 'normal' // none, normal, debug
  };

  RpcClient.prototype.batch = async function (batchCallback, resultCallback) {
    this.batchedCalls = [];
    batchCallback();
    return rpc.call(this, this.batchedCalls, resultCallback);
  };

  RpcClient.callspec = callSpec;

  generateRPCMethods(RpcClient, RpcClient.callspec, rpc);

  return RpcClient;
}

module.exports = getRpcClient;
