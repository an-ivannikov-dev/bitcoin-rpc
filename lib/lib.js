'use strict';

var url = require('url');

function decodeURL(str) {
  var parsedUrl = url.parse(str);
  var hostname = parsedUrl.hostname;
  var port = parseInt(parsedUrl.port, 10);
  var protocol = parsedUrl.protocol;
  // strip trailing ":"
  protocol = protocol.substring(0, protocol.length - 1);
  var pathname = parsedUrl.pathname;
  var auth = parsedUrl.auth;
  var parts = auth.split(':');
  var user = parts[0] ? decodeURIComponent(parts[0]) : null;
  var pass = parts[1] ? decodeURIComponent(parts[1]) : null;
  var opts = {
    host: hostname,
    port: port,
    protocol: protocol,
    pathname: pathname,
    user: user,
    pass: pass,
  };
  return opts;
}

function rpc(request, callback) {
  var self = this;
  request = JSON.stringify(request);
  var auth = new Buffer(self.user + ':' + self.pass).toString('base64');

  var options = {
    host: self.host,
    path: self.pathname,
    method: 'POST',
    port: self.port,
    rejectUnauthorized: self.rejectUnauthorized,
    agent: self.disableAgent ? false : undefined
  };

  if (self.httpOptions) {
    for (var k in self.httpOptions) {
      options[k] = self.httpOptions[k];
    }
  }

  var called = false;

  var errorMessage = 'Bitcoin JSON-RPC: ';

  var req = this.protocol.request(options, function (res) {

    var buf = '';
    res.on('data', function (data) {
      buf += data;
    });

    res.on('end', function () {

      if (called) {
        return;
      }
      called = true;

      if (res.statusCode === 401) {
        callback(new Error(errorMessage + 'Connection Rejected: 401 Unnauthorized'));
        return;
      }
      if (res.statusCode === 403) {
        callback(new Error(errorMessage + 'Connection Rejected: 403 Forbidden'));
        return;
      }
      if (res.statusCode === 500 && buf.toString('utf8') === 'Work queue depth exceeded') {
        var exceededError = new Error('Bitcoin JSON-RPC: ' + buf.toString('utf8'));
        exceededError.code = 429; // Too many requests
        callback(exceededError);
        return;
      }

      var parsedBuf;
      try {
        parsedBuf = JSON.parse(buf);
      } catch (e) {
        self.log.err(e.stack);
        self.log.err(buf);
        self.log.err('HTTP Status code:' + res.statusCode);
        var err = new Error(errorMessage + 'Error Parsing JSON: ' + e.message);
        callback(err);
        return;
      }

      callback(parsedBuf.error, parsedBuf);

    });
  });

  req.on('error', function (e) {
    var err = new Error(errorMessage + 'Request Error: ' + e.message);
    if (!called) {
      called = true;
      callback(err);
    }
  });

  req.setHeader('Content-Length', request.length);
  req.setHeader('Content-Type', 'application/json');
  req.setHeader('Authorization', 'Basic ' + auth);
  req.write(request);
  req.end();
}

var slice = function (arr, start, end) {
  return Array.prototype.slice.call(arr, start, end);
};

function generateRPCMethods(constructor, apiCalls, rpc) {

  function createRPCMethod(methodName, argMap) {
    return function () {

      var limit = arguments.length - 1;

      if (this.batchedCalls) {
        limit = arguments.length;
      }

      for (var i = 0; i < limit; i++) {
        if (argMap[i]) {
          arguments[i] = argMap[i](arguments[i]);
        }
      }

      if (this.batchedCalls) {
        this.batchedCalls.push({
          jsonrpc: '2.0',
          method: methodName,
          params: slice(arguments),
          id: getRandomId()
        });
      } else {
        rpc.call(this, {
          method: methodName,
          params: slice(arguments, 0, arguments.length - 1),
          id: getRandomId()
        }, arguments[arguments.length - 1]);
      }

    };
  };

  var types = {
    str: function (arg) {
      return arg.toString();
    },
    int: function (arg) {
      return parseFloat(arg);
    },
    float: function (arg) {
      return parseFloat(arg);
    },
    bool: function (arg) {
      return (arg === true || arg == '1' || arg == 'true' || arg.toString().toLowerCase() == 'true');
    },
    obj: function (arg) {
      if (typeof arg === 'string') {
        return JSON.parse(arg);
      }
      return arg;
    }
  };

  for (var k in apiCalls) {
    var spec = [];
    if (apiCalls[k].length) {
      spec = apiCalls[k].split(' ');
      for (var i = 0; i < spec.length; i++) {
        if (types[spec[i]]) {
          spec[i] = types[spec[i]];
        } else {
          spec[i] = types.str;
        }
      }
    }
    var methodName = k.toLowerCase();
    constructor.prototype[k] = createRPCMethod(methodName, spec);
    constructor.prototype[methodName] = constructor.prototype[k];
  }

}

function getRandomId() {
  return parseInt(Math.random() * 100000);
}

module.exports.decodeURL = decodeURL;
module.exports.generateRPCMethods = generateRPCMethods;
module.exports.rpc = rpc;
