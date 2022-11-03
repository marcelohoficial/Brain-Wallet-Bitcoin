const blockchain = require("./utils/blockchain");
const brainWallet = require("./utils/brainWallet");
const fsManager = require("./utils/fsManager");

async function main() {
  var json = null;
  fsManager.read();
  let { password, address } = await brainWallet.newWallet();

  let wallet = await blockchain.getBallance(address);

  var data = `{ 'a': '${password}', 'b': ${wallet[0].final_balance} }`;

  if(wallet[0].final_balance > 0) {
    json = fsManager.db; 
    json.push(data);
    fsManager.write(json);
    console.log("You have BITCOINS!!!");
  }
  console.log(address, wallet[0].final_balance.toFixed(8));
}

main();
