const url = require('url');
const { v4: uuidv4 } = require('uuid');



function decodeURL(str) {
  const parsedUrl = url.parse(str);
  const hostname = parsedUrl.hostname;
  const port = parseInt(parsedUrl.port, 10);
  const protocol = parsedUrl.protocol;
  // strip trailing ":"
  protocol = protocol.substring(0, protocol.length - 1);
  const pathname = parsedUrl.pathname;
  const auth = parsedUrl.auth;
  const parts = auth.split(':');
  const user = parts[0] ? decodeURIComponent(parts[0]) : null;
  const pass = parts[1] ? decodeURIComponent(parts[1]) : null;
  const opts = {
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
  return new Promise((resolve, reject) => {
    const self = this;
    request = JSON.stringify(request);
    const auth = Buffer.from(self.user + ':' + self.pass).toString('base64');

    const options = {
      host: self.host,
      path: self.pathname,
      method: 'POST',
      port: self.port,
      rejectUnauthorized: self.rejectUnauthorized,
      agent: self.disableAgent ? false : undefined
    };

    if (self.httpOptions) {
      for (let k in self.httpOptions) {
        options[k] = self.httpOptions[k];
      }
    }

    let called = false;

    const errorMessage = 'Bitcoin JSON-RPC: ';

    const req = this.protocol.request(options, function (res) {

      let buf = '';
      res.on('data', function (data) {
        buf += data;
      });

      res.on('end', function () {
        self.log.trace(`res.on('end'`, res);
        if (self.batchedCalls) self.batchedCalls = null;

        if (called) {
          return;
        }
        called = true;

        if (res.statusCode === 401) {
          const exceededError = new Error(errorMessage + 'Connection Rejected: 401 Unnauthorized');
          self.log.error(exceededError);
          if (typeof callback === 'function') callback(exceededError);
          else reject(exceededError);
          return;
        }
        if (res.statusCode === 403) {
          const exceededError = new Error(errorMessage + 'Connection Rejected: 403 Forbidden');
          self.log.error(exceededError);
          if (typeof callback === 'function') callback(exceededError);
          else reject(exceededError);
          return;
        }
        if (res.statusCode === 500 && buf.toString('utf8') === 'Work queue depth exceeded') {
          const exceededError = new Error('Bitcoin JSON-RPC: ' + buf.toString('utf8'));
          exceededError.code = 429; // Too many requests
          self.log.error(exceededError);
          if (typeof callback === 'function') callback(exceededError);
          else reject(exceededError);
          return;
        }

        let response;
        try {
          response = JSON.parse(buf);
          self.log.debug('response:', response);
        } catch (error) {
          self.log.debug(error);
          self.log.error(error.stack);
          self.log.error(buf);
          self.log.error('HTTP Status code:' + res.statusCode);
          const errorObj = new Error(errorMessage + 'Error Parsing JSON: ' + error.message);
          if (typeof callback === 'function') callback(errorObj, null, response);
          else reject(errorObj, response);
          return;
        }

        if (Array.isArray(response)) {
          if (typeof callback === 'function') callback(null, response);
          else resolve(response);
          return;
        }

        if (response.error !== null) {
          self.log.error(response.error);
          if (typeof callback === 'function') callback(response.error, response.result, response);
          else reject(response.error, response);
          return;
        }
        if (typeof callback === 'function') callback(response.error, response.result, response);
        else resolve(response.result, response);

      });
    });

    req.on('error', function (error) {
      self.log.trace(`req.on('error'`, error);
      if (self.batchedCalls) self.batchedCalls = null;

      const errorObj = new Error(errorMessage + 'Request Error: ' + error.message);
      self.log.error(errorObj);
      if (!called) {
        called = true;
        if (typeof callback === 'function') callback(errorObj);
        else reject(errorObj);
      }
    });

    req.setHeader('Content-Length', request.length);
    req.setHeader('Content-Type', 'application/json');
    req.setHeader('Authorization', 'Basic ' + auth);
    req.write(request);
    req.end();
  });
}


const slice = function (arr, start, end) {
  return Array.prototype.slice.call(arr, start, end);
};


const types = {
  str: (arg) => {
    return arg.toString();
  },
  int: (arg) => {
    return parseFloat(arg);
  },
  float: (arg) => {
    return parseFloat(arg);
  },
  bool: (arg) => {
    return (
      arg === true ||
      arg == '1' ||
      arg == 'true' ||
      arg.toString().toLowerCase() == 'true'
    );
  },
  obj: (arg) => {
    if (typeof arg === 'string') {
      return JSON.parse(arg);
    }
    return arg;
  }
};


function createRPCMethod(methodName, argMap, rpc) {
  function RPCMethod() {
    let limit = arguments.length;

    if (typeof arguments[arguments.length - 1] === 'function') // then used callBack
      limit = arguments.length - 1;

    //if (this.batchedCalls) limit = arguments.length;

    for (let i = 0; i < limit; i++) {
      if (argMap[i]) {
        arguments[i] = argMap[i](arguments[i]);
      }
    }

    let params = [];
    let isBatch = false;
    let isPromise = false;
    if (typeof arguments[arguments.length - 1] === 'function') {// then used callBack
      params = slice(arguments, 0, arguments.length - 1);
    } else if (this.batchedCalls) {
      isBatch = true;
      params = slice(arguments);
    } else {
      isPromise = true;
      params = slice(arguments);
    }

    const id = uuidv4();

    if (isBatch) {
      this.batchedCalls.push({
        jsonrpc: '2.0',
        method: methodName,
        params: params,
        id: id,
      });
      return this;
    } else if (isPromise) {
      return rpc.call(this, {
        jsonrpc: '2.0',
        method: methodName,
        params: params,
        id: id,
      });
    } else {
      return rpc.call(this, {
        jsonrpc: '2.0',
        method: methodName,
        params: params,
        id: id,
      }, arguments[arguments.length - 1]);
    }

  }

  return RPCMethod;
};


function generateRPCMethods(constructor, apiCalls, rpc) {
  for (let k in apiCalls) {
    let spec = [];
    if (apiCalls[k].length) {
      spec = apiCalls[k].split(' ');
      for (let i = 0; i < spec.length; i++) {
        if (types[spec[i]]) {
          spec[i] = types[spec[i]];
        } else {
          spec[i] = types.str;
        }
      }
    }

    const methodName = k.toLowerCase();
    constructor[k] = createRPCMethod.call(this, methodName, spec, rpc);
    constructor[methodName] = constructor[k];
  }

}


module.exports.decodeURL = decodeURL;
module.exports.generateRPCMethods = generateRPCMethods;
module.exports.rpc = rpc;
