#!/usr/bin/env node

const RpcClient = require('./lib/v0.19.1');


const config = {
  protocol: 'http',
  user: 'rpcuser',
  pass: 'rpcpassword',
  host: '127.0.0.1',
  port: '18443', // default: 8333, testnet: 18333, regtest: 18443)
  pathname: '/', // /wallet/<walletname>
};
const rpc = new RpcClient(config);


//"subversion": "/Satoshi:0.19.1/",
rpc.getNetworkInfo((err, res) => {
  if (err !== null)
    return console.log('getnetworkinfo err:', JSON.stringify(err, null, 2));
  const subversion = /([0-9.]+)/.exec(res.result.subversion);// null or '0.19.1'
  rpc.help((err, res) => {
    if (err !== null) return;
    //console.log('help res:', JSON.stringify(res, null, 2));
    const result = res.result;
    let resultAsList = result.split('\n');
    let commandsList = resultAsList.filter((item) => (item !== '' && item.charAt(0) !== '='));
    commandsList.forEach((item) => {
      const cmd = item.split(' ')[0];
      console.log(cmd);
      rpc.help(cmd, (err, res) => {
        if (err !== null) console.log(`---> help ${cmd} err:\n`, res.result);
        if (res !== undefined) {
          console.log(`---> help ${cmd} res.result:\n`, res.result);
          // парсинг описания аргументов и их типов из res.result
          /*
          Arguments:
          1. dummy                     (string, required) Must be set to "" for backwards compatibility.
          2. amounts                   (json object, required) A json object with addresses and amounts
          */
          // формирование метода
        }
      });
    });
    // сборка в тестовый файл
    // запись
    //fs.writeFileSync('./help.txt', res.result)
  });
});
