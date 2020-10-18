const callspec = {
  //  ## Blockchain
  getBestBlockHash: '',                                // getbestblockhash
  getBlock: 'str int',                                 // getblock "blockhash" (verbosity)
  getBlockchainInfo: '',                               // getblockchaininfo
  getBlockCount: '',                                   // getblockcount
  getBlockFilter: 'str str',                           // getblockfilter "blockhash" ("filtertype")
  getBlockHash: 'int',                                 // getblockhash height
  getBlockHeader: 'str bool',                          // getblockheader "blockhash" (verbose)
  getBlockStats: 'str obj',                            // getblockstats hash_or_height (stats)
  getChainTips: '',                                    // getchaintips
  getChainTxStats: 'int str',                          // getchaintxstats (nblocks "blockhash")
  getDifficulty: '',                                   // getdifficulty
  getMempoolAncestors: 'str bool',                     // getmempoolancestors "txid" (verbose)
  getMempoolDescendants: 'str bool',                   // getmempooldescendants "txid" (verbose)
  getMempoolEntry: 'str',                              // getmempoolentry "txid"
  getMempoolInfo: '',                                  // getmempoolinfo
  getRawMempool: 'bool',                               // getrawmempool (verbose)
  getTxout: 'str int bool',                            // gettxout "txid" n (include_mempool)
  getTxoutProof: 'obj str',                            // gettxoutproof ["txid",...] ("blockhash")
  getTxoutSetInfo: '',                                 // gettxoutsetinfo
  preciousBlock: 'str',                                // preciousblock "blockhash"
  pruneBlockchain: 'int',                              // pruneblockchain height
  saveMempool: '',                                     // savemempool
  scanTxoutSet: 'str obj',                             // scantxoutset "action" ([scanobjects, ...])
  verifyChain: 'int int',                              // verifychain (checklevel nblocks)
  verifyTxoutProof: 'str',                             // verifytxoutproof "proof"

  //  ## Control
  getMemoryInfo: 'str',                                // getmemoryinfo ("mode")
  getRpcInfo: '',                                      // getrpcinfo
  help: 'str',                                         // help ("command")
  logging: 'obj obj',                                  // logging ( ["include_category",...] ["exclude_category",...] )
  stop: '',                                            // stop
  uptime: '',                                          // uptime

  //  ## Generating
  generateToAddress: 'int str int',                    // generatetoaddress nblocks "address" ( maxtries )
  generateToDescriptor: 'int str int',                 // generatetodescriptor num_blocks "descriptor" ( maxtries )

  //  ## Mining
  getBlockTemplate: 'obj',                             // getblocktemplate ( "template_request" )
  getMiningInfo: '',                                   // getmininginfo
  getNetworkHashPs: 'int int',                         // getnetworkhashps ( nblocks height )
  prioritiseTransaction: 'str float int',              // prioritisetransaction "txid" (dummy) fee_delta
  submitBlock: 'str str',                              // submitblock "hexdata" ("dummy")
  submitHeader: 'str',                                 // submitheader "hexdata"

  //  ## Network
  addNode: 'str str',                                  // addnode "node" "command"
  clearBanned: '',                                     // clearbanned
  disconnectnode: 'str int',                           // disconnectnode ( "address" nodeid )
  getAddedNodeInfo: 'str',                             // getaddednodeinfo ("node")
  getConnectionCount: '',                              // getconnectioncount
  getNetTotals: '',                                    // getnettotals
  getNetworkInfo: '',                                  // getnetworkinfo
  getNodeAddresses: 'int',                             // getnodeaddresses (count)
  getPeerInfo: '',                                     // getpeerinfo
  listBanned: '',                                      // listbanned
  ping: '',                                            // ping
  setBan: 'str str int bool',                          // setban "subnet" "command" ( bantime absolute )
  setNetworkActive: 'bool',                            // setnetworkactive state

  //  ## Rawtransactions
  analyzePsbt: 'str',                                  // analyzepsbt "psbt"
  combinePsbt: 'obj',                                  // combinepsbt ["psbt",...]
  combineRawTransaction: 'obj',                        // combinerawtransaction ["hexstring",...]
  convertToPsbt: 'str bool bool',                      // converttopsbt "hexstring" ( permitsigdata iswitness )
  createPsbt: 'obj obj int bool',                      // createpsbt [{"txid":"hex","vout":n,"sequence":n},...] [{"address":amount},{"data":"hex"},...] ( locktime replaceable )
  createRawTransaction: 'obj obj int bool',            // createrawtransaction [{"txid":"hex","vout":n,"sequence":n},...] [{"address":amount},{"data":"hex"},...] ( locktime replaceable )
  decodePsbt: 'str',                                   // decodepsbt "psbt"
  decodeRawTransaction: 'str bool',                    // decoderawtransaction "hexstring" ( iswitness )
  decodeScript: 'str',                                 // decodescript "hexstring"
  finalizePsbt: 'str bool',                            // finalizepsbt "psbt" ( extract )
  fundRawTransaction: 'str obj bool',                  // fundrawtransaction "hexstring" ( options iswitness )
  getRawTransaction: 'str bool str',                   // getrawtransaction "txid" ( verbose "blockhash" )
  joinPsbts: 'obj',                                    // joinpsbts ["psbt",...]
  sendRawTransaction: 'str int',                       // sendrawtransaction "hexstring" ( maxfeerate )
  signRawTransactionWithKey: 'str obj obj str',        // signrawtransactionwithkey "hexstring" ["privatekey",...] ( [{"txid":"hex","vout":n,"scriptPubKey":"hex","redeemScript":"hex","witnessScript":"hex","amount":amount},...] "sighashtype" )
  testMempoolAccept: 'obj int',                        // testmempoolaccept ["rawtx",...] ( maxfeerate )
  utxoUpdatePsbt: 'str obj',                           // utxoupdatepsbt "psbt" ( ["",{"desc":"str","range":n or [n,n]},...] )

  //  ## Util
  createMultisig: 'int obj str',                       // createmultisig nrequired["key",...]("address_type")
  deriveAddresses: 'str int',                          // deriveaddresses "descriptor" (range)
  estimateSmartfee: 'int str',                         // estimatesmartfee conf_target ( "estimate_mode" )
  getDescriptorInfo: 'str',                            // getdescriptorinfo "descriptor"
  signMessageWithPrivKey: 'str str',                   // signmessagewithprivkey "privkey" "message"
  validateAddress: 'str',                              // validateaddress "address"
  verifyMessage: 'str str str',                        // verifymessage "address" "signature" "message"

  //  ## Wallet
  abandonTransaction: 'str',                           // abandontransaction "txid"
  abortrescan: '',                                     // abortrescan
  addMultisigAddress: 'int obj str str',               // addmultisigaddress nrequired ["key",...] ("label" "address_type")
  backupWallet: 'str',                                 // backupwallet "destination"
  bumpFee: 'str obj',                                  // bumpfee "txid" (options)
  createWallet: 'str bool bool str bool',              // createwallet "wallet_name" (disable_private_keys blank "passphrase" avoid_reuse)
  dumpPrivKey: 'str',                                  // dumpprivkey "address"
  dumpWallet: 'str',                                   // dumpwallet "filename"
  encryptWallet: 'str',                                // encryptwallet "passphrase"
  getAddressesByLabel: 'str',                          // getaddressesbylabel "label"
  getAddressInfo: 'str',                               // "address"
  getBalance: 'str int bool bool',                     // "dummy" minconf include_watchonly avoid_reuse )
  getBalances: '',                                     // getbalances
  getNewAddress: 'str str',                            // getnewaddress ( "label" "address_type" )
  getRawChangeAddress: 'str',                          // getrawchangeaddress ( "address_type" )
  getReceivedByAddress: 'str int',                     // getreceivedbyaddress "address" ( minconf )
  getReceivedByLabel: 'str int',                       // getreceivedbylabel "label" ( minconf )
  getTransaction: 'str bool bool',                     // gettransaction "txid" ( include_watchonly verbose )
  getUnconfirmedBalance: '',                           // getunconfirmedbalance DEPRECATED
  getWalletInfo: '',                                   // getwalletinfo
  importAddress: 'str str bool bool',                  // importaddress "address" ( "label" rescan p2sh )
  importMulti: 'obj obj',                              // importmulti "requests" ( "options" )
  importPrivKey: 'str str bool',                       // importprivkey "privkey" ( "label" rescan )
  importPrunedFunds: 'str str',                        // importprunedfunds "rawtransaction" "txoutproof"
  importPubKey: 'str str bool',                        // importpubkey "pubkey" ( "label" rescan )
  importWallet: 'str',                                 // importwallet "filename"
  keypoolRefill: 'int',                                // keypoolrefill ( newsize )
  listAddressGroupings: '',                            // listaddressgroupings
  listLabels: 'str',                                   // listlabels ("purpose")
  listLockUnspent: '',                                 // listlockunspent
  listReceivedByAddress: 'int bool bool str',          // listreceivedbyaddress ( minconf include_empty include_watchonly "address_filter" )
  listReceivedByLabel: 'int bool bool',                // listreceivedbylabel ( minconf include_empty include_watchonly )
  listSinceBlock: 'str int bool bool',                 // listsinceblock ( "blockhash" target_confirmations include_watchonly include_removed )
  listTransactions: 'str int int bool',                // listtransactions ( "label" count skip include_watchonly )
  listUnspent: 'int int str bool str',                 // listunspent ( minconf maxconf ["address",...] include_unsafe query_options )
  listWalletDir: '',                                   // listwalletdir
  listWallets: '',                                     // listwallets
  loadWallet: 'str',                                   // loadwallet "filename"
  lockUnspent: 'bool obj',                             // lockunspent unlock ( [{"txid":"hex","vout":n},...] )
  removeprunedfunds: 'str',                            // removeprunedfunds "txid"
  rescanBlockchain: 'int int',                         // rescanblockchain ( start_height stop_height )
  sendMany: 'str obj int str',                         // sendmany "" {"address":amount} ( minconf "comment" ["address",...] replaceable conf_target "estimate_mode" )
  sendToAddress: 'str int str str bool int str bool',  // sendtoaddress "address" amount ( "comment" "comment_to" subtractfeefromamount replaceable conf_target "estimate_mode" avoid_reuse )
  setHdseed: 'bool str',                               // sethdseed ( newkeypool "seed" )
  setLabel: 'str str',                                 // setlabel "address" "label"
  setTxFee: 'float',                                   // settxfee amount
  setWalletFlag: 'str bool',                           // setwalletflag "flag" ( value )
  signMessage: 'str str',                              // signmessage "address" "message"
  signRawTransactionWithWallet: 'str obj str',         // signrawtransactionwithwallet "hexstring" ( [{"txid":"hex","vout":n,"scriptPubKey":"hex","redeemScript":"hex","witnessScript":"hex","amount":amount},...] "sighashtype" )
  unloadWallet: 'str',                                 // unloadwallet ( "wallet_name" )
  walletCreateFundedPsbt: 'obj obj int obj bool',      // walletcreatefundedpsbt [{"txid":"hex","vout":n,"sequence":n},...] [{"address":amount},{"data":"hex"},...] ( locktime options bip32derivs )
  walletLock: '',                                      // walletlock
  walletPassphrase: 'str int',                         // walletpassphrase "passphrase" timeout
  walletPassphraseChange: 'str str',                   // walletpassphrasechange "oldpassphrase" "newpassphrase"
  walletProcessPsbt: 'str bool str bool',              // walletprocesspsbt "psbt" ( sign "sighashtype" bip32derivs )

  //  ## Zmq
  getZmqNotifications: '',                             // getzmqnotifications
};

module.exports = callspec;
