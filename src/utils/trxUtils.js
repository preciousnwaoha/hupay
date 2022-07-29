export const formatTransactions = (transactions) => {
  const formattedTransactions = transactions.map((trx) => {
    const midTrx = trx.to ? trx.to : "Anonymous";

    return {
      transactionHash: trx.hash,
      blockNumber: trx.blockNumber,
      blockHash: trx.blockHash,
      success: true,
      from: trx.from,
      mid: midTrx,
      to: "Anonymous",
      message: `${!trx.to ? "Minting": ""}`,
      amount: 0,
      senderName: "Anonymous",
      timeStamp: trx.timeStamp,
    };
  });

  return formattedTransactions;
};

export const mergeTransactionsChainAndDB = (chainTrx, dbTrx) => {
  const dbTrxHashes = dbTrx.map((trx) => {
    return trx.transactionHash;
  });

  const chainTrxNotInDB = chainTrx.filter(
    (trx) => !dbTrxHashes.includes(trx.transactionHash)
  );

  const mergedTransactions = [...dbTrx, ...chainTrxNotInDB];

  return mergedTransactions;
};


// export const timeConverter = (UNIX_timestamp) => {
//   var a = new Date(UNIX_timestamp * 1000);
//   var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//   var year = a.getFullYear();
//   var month = months[a.getMonth()];
//   var date = a.getDate();
//   var hour = a.getHours();
//   var min = a.getMinutes();
//   var sec = a.getSeconds();
//   var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
//   return time;
// }

export const timeConverter = (timestamp) => {
const date = new Date(timestamp * 1000);

 const time = "Date: "+date.getDate()+
          "/"+(date.getMonth()+1)+
          "/"+date.getFullYear()+
          " "+date.getHours()+
          ":"+date.getMinutes()+
          ":"+date.getSeconds();
          return time;
}
