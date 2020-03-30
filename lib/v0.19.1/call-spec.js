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
  getmempoolentry "txid"
  getmempoolinfo
  getrawmempool(verbose)
  gettxout "txid" n(include_mempool)
  gettxoutproof["txid",...]("blockhash")
  gettxoutsetinfo
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
  /*
  getblocktemplate ( "template_request" )
  getmininginfo
  getnetworkhashps ( nblocks height )
  prioritisetransaction "txid" ( dummy ) fee_delta
  submitblock "hexdata" ( "dummy" )
  submitheader "hexdata"
  
  //  ## Network
  addnode "node" "command"
  clearbanned
  disconnectnode ( "address" nodeid )
  getaddednodeinfo ( "node" )
  getconnectioncount
  getnettotals
  getnetworkinfo
  getnodeaddresses ( count )
  getpeerinfo
  listbanned
  ping
  setban "subnet" "command" ( bantime absolute )
  setnetworkactive state
  
  //  ## Rawtransactions
  analyzepsbt "psbt"
  combinepsbt ["psbt",...]
  combinerawtransaction ["hexstring",...]
  converttopsbt "hexstring" ( permitsigdata iswitness )
  createpsbt [{"txid":"hex","vout":n,"sequence":n},...] [{"address":amount},{"data":"hex"},...] ( locktime replaceable )
  createrawtransaction [{"txid":"hex","vout":n,"sequence":n},...] [{"address":amount},{"data":"hex"},...] ( locktime replaceable )
  decodepsbt "psbt"
  decoderawtransaction "hexstring" ( iswitness )
  decodescript "hexstring"
  finalizepsbt "psbt" ( extract )
  fundrawtransaction "hexstring" ( options iswitness )
  getrawtransaction "txid" ( verbose "blockhash" )
  joinpsbts ["psbt",...]
  sendrawtransaction "hexstring" ( maxfeerate )
  signrawtransactionwithkey "hexstring" ["privatekey",...] ( [{"txid":"hex","vout":n,"scriptPubKey":"hex","redeemScript":"hex","witnessScript":"hex","amount":amount},...] "sighashtype" )
  testmempoolaccept ["rawtx",...] ( maxfeerate )
  utxoupdatepsbt "psbt" ( ["",{"desc":"str","range":n or [n,n]},...] )
  
  //  ## Util
  createmultisig nrequired ["key",...] ( "address_type" )
  deriveaddresses "descriptor" ( range )
  estimatesmartfee conf_target ( "estimate_mode" )
  getdescriptorinfo "descriptor"
  signmessagewithprivkey "privkey" "message"
  validateaddress "address"
  verifymessage "address" "signature" "message"
  */

  //  ## Wallet
  abandonTransaction: 'str',
  /*
  abortrescan
  addmultisigaddress nrequired ["key",...] ( "label" "address_type" )
  backupwallet "destination"
  bumpfee "txid" ( options )
  createwallet "wallet_name" ( disable_private_keys blank "passphrase" avoid_reuse )
  dumpprivkey "address"
  dumpwallet "filename"
  encryptwallet "passphrase"
  */
  getAddressesByLabel: 'str', // getaddressesbylabel "label"
  /*
  getaddressinfo "address"
  getbalance ( "dummy" minconf include_watchonly avoid_reuse )
  getbalances
  */
  getNewAddress: 'str str', // getnewaddress ( "label" "address_type" )
  getRawChangeAddress: 'str', // getrawchangeaddress ( "address_type" )
  getReceivedByAddress: 'str int', // getreceivedbyaddress "address" ( minconf )
  getReceivedByLabel: 'str int', // getreceivedbylabel "label" ( minconf )
  getTransaction: 'str bool bool', // gettransaction "txid" ( include_watchonly verbose )
  /*
  getunconfirmedbalance
  getwalletinfo
  importaddress "address" ( "label" rescan p2sh )
  importmulti "requests" ( "options" )
  importprivkey "privkey" ( "label" rescan )
  importprunedfunds "rawtransaction" "txoutproof"
  importpubkey "pubkey" ( "label" rescan )
  importwallet "filename"
  keypoolrefill ( newsize )
  listaddressgroupings
  */
  listLabels: 'str', // listlabels ( "purpose" )
  //listlockunspent
  //listreceivedbyaddress ( minconf include_empty include_watchonly "address_filter" )
  listReceivedByLabel: 'int bool bool', // listreceivedbylabel ( minconf include_empty include_watchonly )
  listSinceBlock: 'str int bool bool', // listsinceblock ( "blockhash" target_confirmations include_watchonly include_removed )
  listTransactions: 'str int int bool', // listtransactions ( "label" count skip include_watchonly )
  listUnspent: 'int int str bool str', // listunspent ( minconf maxconf ["address",...] include_unsafe query_options )
  listWalletDir: '', // listwalletdir
  listWallets: '', // listwallets
  loadWallet: 'str', // loadwallet "filename"
  /*
  lockunspent unlock ( [{"txid":"hex","vout":n},...] )
  removeprunedfunds "txid"
  rescanblockchain ( start_height stop_height )
  sendmany "" {"address":amount} ( minconf "comment" ["address",...] replaceable conf_target "estimate_mode" )
  sendtoaddress "address" amount ( "comment" "comment_to" subtractfeefromamount replaceable conf_target "estimate_mode" avoid_reuse )
  sethdseed ( newkeypool "seed" )
  */
  setLabel: 'str str', // setlabel "address" "label"
  /*
  settxfee amount
  setwalletflag "flag" ( value )
  signmessage "address" "message"
  signrawtransactionwithwallet "hexstring" ( [{"txid":"hex","vout":n,"scriptPubKey":"hex","redeemScript":"hex","witnessScript":"hex","amount":amount},...] "sighashtype" )
  */
  unLoadWallet: 'str', // unloadwallet ( "wallet_name" )
  //walletcreatefundedpsbt [{"txid":"hex","vout":n,"sequence":n},...] [{"address":amount},{"data":"hex"},...] ( locktime options bip32derivs )
  walletLock: '', // walletlock
  walletPassphrase: 'str int', // walletpassphrase "passphrase" timeout
  walletPassphraseChange: 'str str', // walletpassphrasechange "oldpassphrase" "newpassphrase"
  walletProcessPsbt: 'str bool str bool', // walletprocesspsbt "psbt" ( sign "sighashtype" bip32derivs )

  // --- //
  addMultiSigAddress: '',
  addNode: '',
  backupWallet: '',
  bumpFee: 'str',
  createMultiSig: '',
  createRawTransaction: 'obj obj',
  decodeRawTransaction: '',
  dumpPrivKey: '',
  encryptWallet: '',
  estimateFee: '',
  estimateSmartFee: 'int str',
  estimatePriority: 'int',
  generate: 'int',
  generateToAddress: 'int str',
  getAccount: '',
  getAccountAddress: 'str',
  getAddedNodeInfo: '',
  getAddressMempool: 'obj',
  getAddressUtxos: 'obj',
  getAddressBalance: 'obj',
  getAddressDeltas: 'obj',
  getAddressTxids: 'obj',
  getAddressesByAccount: '',
  getBalance: 'str int',
  getBlockDeltas: 'str',
  getBlockHashes: 'int int obj',
  getBlockNumber: '',
  getBlockTemplate: '',
  getConnectionCount: '',
  getGenerate: '',
  getHashesPerSec: '',
  getInfo: '',
  getMemoryPool: '',
  getMemPoolEntry: 'str',
  getMemPoolInfo: '',
  getMiningInfo: '',
  getNetworkInfo: '',
  getPeerInfo: '',
  getRawMemPool: 'bool',
  getRawTransaction: 'str int',
  getReceivedByAccount: 'str int',
  getSpentInfo: 'obj',
  getTxOut: 'str int bool',
  getTxOutSetInfo: '',
  getWalletInfo: '',
  getWork: '',
  importAddress: 'str str bool',
  importMulti: 'obj obj',
  importPrivKey: 'str str bool',
  invalidateBlock: 'str',
  keyPoolRefill: '',
  listAccounts: 'int',
  listAddressGroupings: '',
  listReceivedByAccount: 'int bool',
  listReceivedByAddress: 'int bool',
  listLockUnspent: 'bool',
  lockUnspent: '',
  move: 'str str float int str',
  prioritiseTransaction: 'str float int',
  sendFrom: 'str str float int str str',
  sendMany: 'str obj int str',  //not sure this is will work
  sendRawTransaction: 'str',
  sendToAddress: 'str float str str',
  setAccount: '',
  setGenerate: 'bool int',
  setTxFee: 'float',
  signMessage: '',
  signRawTransaction: '',
  signRawTransactionWithWallet: 'str',
  submitBlock: '',
  validateAddress: '',
  verifyMessage: '',
  // --- //

  //  ## Zmq
  getZmqNotifications: '',
};

module.exports = callspec;
