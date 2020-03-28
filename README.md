# bitcoin-rpc

A client library to connect to Bitcoin Core RPC in JavaScript.

## Get Started

bitcoin-rpc runs on [node](http://nodejs.org/), 
and can be installed via [yarn](https://yarnpkg.com/):

```bash
yarn add https://github.com/an-ivannikov-dev/bitcoin-rpc-js.git
```

## Examples

```javascript
var run = function() {
  var bitcore = require('bitcore');
  var RpcClient = require('bitcoin-rpc-js');

  const config = {
    protocol: 'http',
    user: 'rpcuser',
    pass: 'rpcpassword',
    host: '127.0.0.1',
    port: '18443', // default: 8333, testnet: 18333, regtest: 18443)
    pathname: '/', // /wallet/<walletname>
  };

  // config can also be an url, e.g.:
  // const config = 'http://user:pass@127.0.0.1:18443';
  // const config = 'http://user:pass@127.0.0.1:18443/wallet/<walletname>';

  var rpc = new RpcClient(config);

  var txids = [];

  function showNewTransactions() {
    rpc.getRawMemPool(function (err, ret) {
      if (err) {
        console.error(err);
        return setTimeout(showNewTransactions, 10000);
      }

      function batchCall() {
        ret.result.forEach(function (txid) {
          if (txids.indexOf(txid) === -1) {
            rpc.getRawTransaction(txid);
          }
        });
      }

      rpc.batch(batchCall, function(err, rawtxs) {
        if (err) {
          console.error(err);
          return setTimeout(showNewTransactions, 10000);
        }

        rawtxs.map(function (rawtx) {
          var tx = new bitcore.Transaction(rawtx.result);
          console.log('\n\n\n' + tx.id + ':', tx.toObject());
        });

        txids = ret.result;
        setTimeout(showNewTransactions, 2500);
      });
    });
  }

  showNewTransactions();
};
```

## License

**[the BitPay, Inc. MIT license](https://github.com/bitpay/bitcore/blob/master/LICENSE).**
