'use strict';

const callspec = {
  //  ## Blockchain
  getBestBlockHash: '', // getbestblockhash
  getBlock: 'str int', // getblock "blockhash" ( verbosity )
  getBlockchainInfo: '', // getblockchaininfo
  getBlockCount: '', // getblockcount
  //getblockfilter "blockhash"("filtertype")
  getBlockHash: 'int', // getblockhash height
  getBlockHeader: 'str bool', // getblockheader "blockhash"(verbose)
  //getblockstats hash_or_height(stats)
  getChainTips: '', // getchaintips
  //getchaintxstats(nblocks "blockhash")
  getDifficulty: '', // getdifficulty
  /*
  getmempoolancestors "txid"(verbose)
  getmempooldescendants "txid"(verbose)
  getMemPoolEntry: 'str', // getmempoolentry "txid"
  */
  getMemPoolInfo: '', // getmempoolinfo
  getRawMemPool: 'bool', // getrawmempool(verbose)
  getTxOut: 'str int bool', // gettxout "txid" n(include_mempool)
  /*
  gettxoutproof["txid",...]("blockhash")
  //getTxOutSetInfo: '', // gettxoutsetinfo
  preciousblock "blockhash"
  pruneblockchain height
  savemempool
  scantxoutset "action"([scanobjects, ...])
  verifychain(checklevel nblocks)
  verifytxoutproof "proof"
  */

  //  ## Control
  getMemoryInfo: 'str', // getmemoryinfo ("mode")
  getRpcInfo: '', // getrpcinfo
  help: 'str', // help ("command")
  //logging(["include_category", ...]["exclude_category",...])
  stop: '',
  uptime: '',

  //  ## Generating
  generateToAddress: 'int str int', // generatetoaddress nblocks "address" ( maxtries )

  //  ## Mining
  //getBlockTemplate: '', // getblocktemplate ( "template_request" )
  getMiningInfo: '', // getmininginfo
  /*
  getnetworkhashps ( nblocks height )
  //prioritiseTransaction: 'str float int', //prioritisetransaction "txid" ( dummy ) fee_delta
  //submitBlock: '', // submitblock "hexdata" ( "dummy" )
  submitheader "hexdata"
  
  //  ## Network
  //addNode: '', //addnode "node" "command"
  clearbanned
  disconnectnode ( "address" nodeid )
  */
  //getAddedNodeInfo: '',//getaddednodeinfo ( "node" )
  getConnectionCount: '', //getconnectioncount
  getNetTotals: '',  // getnettotals
  getNetworkInfo: '', // getnetworkinfo
  //getnodeaddresses ( count )
  getPeerInfo: '', // getpeerinfo
  listBanned: '',// listbanned
  ping: '', // ping
  /*
  setban "subnet" "command" ( bantime absolute )
  setnetworkactive state
  */

  //  ## Rawtransactions
  /*
  analyzepsbt "psbt"
  combinepsbt ["psbt",...]
  combinerawtransaction ["hexstring",...]
  converttopsbt "hexstring" ( permitsigdata iswitness )
  createpsbt [{"txid":"hex","vout":n,"sequence":n},...] [{"address":amount},{"data":"hex"},...] ( locktime replaceable )
  */
  createRawTransaction: 'obj obj int bool', // createrawtransaction [{"txid":"hex","vout":n,"sequence":n},...] [{"address":amount},{"data":"hex"},...] ( locktime replaceable )
  //decodepsbt "psbt"
  decodeRawTransaction: 'str bool', // decoderawtransaction "hexstring" ( iswitness )
  /*
  decodescript "hexstring"
  finalizepsbt "psbt" ( extract )
  fundrawtransaction "hexstring" ( options iswitness )
  */
  getRawTransaction: 'str bool str', // getrawtransaction "txid" ( verbose "blockhash" )
  joinPsbts: 'obj', // joinpsbts ["psbt",...]
  sendRawTransaction: 'str int', // sendrawtransaction "hexstring" ( maxfeerate )
  /*
  signrawtransactionwithkey "hexstring" ["privatekey",...] ( [{"txid":"hex","vout":n,"scriptPubKey":"hex","redeemScript":"hex","witnessScript":"hex","amount":amount},...] "sighashtype" )
  testmempoolaccept ["rawtx",...] ( maxfeerate )
  utxoupdatepsbt "psbt" ( ["",{"desc":"str","range":n or [n,n]},...] )
  
  //  ## Util
  createmultisig nrequired ["key",...] ( "address_type" )
  deriveaddresses "descriptor" ( range )
  //estimateSmartFee: 'int str', // estimatesmartfee conf_target ( "estimate_mode" )
  getdescriptorinfo "descriptor"
  signmessagewithprivkey "privkey" "message"
  //validateAddress: '', // validateaddress "address"
  //verifyMessage: '', // verifymessage "address" "signature" "message"
  */

  //  ## Wallet
  abandonTransaction: 'str',
  /*
  abortrescan
  addmultisigaddress nrequired ["key",...] ( "label" "address_type" )
  backupWallet: '', //backupwallet "destination"
  bumpFee: 'str', // bumpfee "txid" ( options )
  createwallet "wallet_name" ( disable_private_keys blank "passphrase" avoid_reuse )
  */
  dumpPrivKey: 'str', // dumpprivkey "address"
  dumpWallet: 'str', //dumpwallet "filename"
  encryptWallet: 'str', //encryptwallet "passphrase"
  getAddressesByLabel: 'str', // getaddressesbylabel "label"
  /*
  getAddressInfo "address"
  getBalance: 'str int', getbalance ( "dummy" minconf include_watchonly avoid_reuse )
  getBalances
  */
  getNewAddress: 'str str', // getnewaddress ( "label" "address_type" )
  getRawChangeAddress: 'str', // getrawchangeaddress ( "address_type" )
  getReceivedByAddress: 'str int', // getreceivedbyaddress "address" ( minconf )
  getReceivedByLabel: 'str int', // getreceivedbylabel "label" ( minconf )
  getTransaction: 'str bool bool', // gettransaction "txid" ( include_watchonly verbose )
  //getunconfirmedbalance
  getWalletInfo: '', // getwalletinfo
  /*
  importaddress "address" ( "label" rescan p2sh )
  importmulti "requests" ( "options" )
  importprivkey "privkey" ( "label" rescan )
  importprunedfunds "rawtransaction" "txoutproof"
  importpubkey "pubkey" ( "label" rescan )
  importwallet "filename"
  keyPoolRefill: '', // keypoolrefill ( newsize )
  */
  listAddressGroupings: '', //  listaddressgroupings
  listLabels: 'str', // listlabels ( "purpose" )
  //listLockUnspent: 'bool', //listlockunspent
  //listReceivedByAddress: 'int bool', //listreceivedbyaddress ( minconf include_empty include_watchonly "address_filter" )
  listReceivedByLabel: 'int bool bool', // listreceivedbylabel ( minconf include_empty include_watchonly )
  listSinceBlock: 'str int bool bool', // listsinceblock ( "blockhash" target_confirmations include_watchonly include_removed )
  listTransactions: 'str int int bool', // listtransactions ( "label" count skip include_watchonly )
  listUnspent: 'int int str bool str', // listunspent ( minconf maxconf ["address",...] include_unsafe query_options )
  listWalletDir: '', // listwalletdir
  listWallets: '', // listwallets
  loadWallet: 'str', // loadwallet "filename"
  /*
  //lockUnspent: '', // lockunspent unlock ( [{"txid":"hex","vout":n},...] )
  removeprunedfunds "txid"
  rescanblockchain ( start_height stop_height )
  //sendMany: 'str obj int str',  // sendmany "" {"address":amount} ( minconf "comment" ["address",...] replaceable conf_target "estimate_mode" )
  sendtoaddress "address" amount ( "comment" "comment_to" subtractfeefromamount replaceable conf_target "estimate_mode" avoid_reuse )
  sethdseed ( newkeypool "seed" )
  */
  setLabel: 'str str', // setlabel "address" "label"
  setTxFee: 'float', // settxfee amount
  //setwalletflag "flag" ( value )
  signMessage: 'str str', // signmessage "address" "message"
  //signRawTransactionWithWallet: 'str', //signrawtransactionwithwallet "hexstring" ( [{"txid":"hex","vout":n,"scriptPubKey":"hex","redeemScript":"hex","witnessScript":"hex","amount":amount},...] "sighashtype" )
  unLoadWallet: 'str', // unloadwallet ( "wallet_name" )
  //walletcreatefundedpsbt [{"txid":"hex","vout":n,"sequence":n},...] [{"address":amount},{"data":"hex"},...] ( locktime options bip32derivs )
  walletLock: '', // walletlock
  walletPassphrase: 'str int', // walletpassphrase "passphrase" timeout
  walletPassphraseChange: 'str str', // walletpassphrasechange "oldpassphrase" "newpassphrase"
  walletProcessPsbt: 'str bool str bool', // walletprocesspsbt "psbt" ( sign "sighashtype" bip32derivs )

  // --- //
  addMultiSigAddress: '',
  createMultiSig: '',
  importAddress: 'str str bool',
  importMulti: 'obj obj',
  importPrivKey: 'str str bool',
  sendFrom: 'str str float int str str',
  sendToAddress: 'str float str str',
  // --- //

  //  ## Zmq
  getZmqNotifications: '',
};

module.exports = callspec;
