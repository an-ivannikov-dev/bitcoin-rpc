# bitcoin-rpc-js

A client library to connect to Bitcoin Core RPC in JavaScript.

## Get Started

bitcoin-rpc-js runs on [node](http://nodejs.org/), 
and can be installed via [yarn](https://yarnpkg.com/):

```bash
yarn add https://github.com/an-ivannikov-dev/bitcoin-rpc-js.git
```

Added Promise.

## Examples

```js
const bitcore = require('bitcore');
const RpcClient = require('bitcoin-rpc-js');


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

const rpc = new RpcClient(config);

const run = () => {
  rpc.createBatch()
    .getBlockchainInfo()
    .getZmqNotifications()
    .getBlockCount()
    .call()
    .then((res) => console.log('Batch call. response:', res))
    .catch((err) => console.error('Batch call. error:', err));

  rpc.createBatch()
    .getBlockchainInfo()
    .getZmqNotifications()
    .getBlockCount()
    .call((err, res) => console.log('Batch call 2:', err, res));

  rpc
    .getBlockCount()
    .then((res) => rpc.getBlockHash(res))
    .then((res) => rpc.getBlockHeader(res))
    .then((res) => console.log('Chained calls. last block header:', res))
    .catch((err) => console.error('Chained calls. error:', err));


  let txids = [];

  function showNewTransactions() {
    rpc.getRawMemPool((err, ret) => {
      if (err) {
        console.error(err);
        return setTimeout(showNewTransactions, 10000);
      }

      function batchCall() {
        ret.result.forEach((txid) => {
          if (txids.indexOf(txid) === -1) {
            rpc.getRawTransaction(txid);
          }
        });
      }

      rpc.batch(batchCall, (err, rawtxs) => {
        if (err) {
          console.error(err);
          return setTimeout(showNewTransactions, 10000);
        }

        rawtxs.map((rawtx) => {
          const tx = new bitcore.Transaction(rawtx.result);
          console.log('\n\n\n' + tx.id + ':', tx.toObject());
        });

        txids = ret.result;
        setTimeout(showNewTransactions, 2500);
      });
    });
  }

  showNewTransactions();
};

run();
```
