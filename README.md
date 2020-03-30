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
callback(response.error, response.result, response);
resolve(response.result, response);
reject(response.error || error, response);
// batch -> response;
const { error, result, id, } = response;
```

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

const run = async function () {
  rpc.getBlockCount()
    .then((count) => rpc.getBlockHash(count))
    .then((hash) => rpc.getBlockHeader(hash))
    .then((result) => console.log('Chained calls 1. last block header:', result))
    .catch((error) => console.error('Chained calls 1. error:', error));

  rpc.getBlockCount()
    .then((count) => rpc.getBlockHash(count))
    .then((hash) => rpc.getBlock(hash))
    .then((block) => {
      function batchCall() {
        block.tx.forEach((txid) => {
          const verbose = true;
          rpc.getRawTransaction(txid, verbose, block.hash);
        });
      }
      return rpc.batch(batchCall);
    })
    .then((response) => console.log('chained calls 2. array:', JSON.stringify(response, null, 2)))
    .catch((error) => console.log('chained calls 2. error:', error));

  rpc.createBatch()
    .getBlockCount()
    .getBlockchainInfo()
    .getZmqNotifications()
    .call((error, response) => console.log('Batch call 1:', error, response));

  rpc.createBatch()
    .getBlockCount()
    .getBlockchainInfo()
    .getZmqNotifications()
    .call()
    .then((response) => console.log('Batch call 2. response:', JSON.stringify(response, null, 2)))
    .catch((error) => console.error('Batch call 2. error:', error));


  let txids = [];

  function showNewTransactions() {
    rpc.getRawMemPool((err, ret) => {
      if (err) {
        console.error(err);
        return setTimeout(showNewTransactions, 10000);
      }

      function batchCall() {
        ret.forEach((txid) => {
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
          const tx = new bitcore.Transaction(rawtx);
          console.log('\n\n\n' + tx.id + ':', tx.toObject());
        });

        txids = ret;
        setTimeout(showNewTransactions, 2500);
      });
    });
  }

  showNewTransactions();
};

run();
```
