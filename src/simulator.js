const brainWallet = require("./utils/brainWallet");
const fsManager = require("./utils/fsManager");

async function main() {
  fsManager.read();
  let { address } = await brainWallet.newWallet();
  let block = parseInt(Math.random() * 6)

  let wallet = [{
    final_balance: block % 2 === 0 ? Math.random() / 56 : 0
  }]

  console.log(address, wallet[0].final_balance.toFixed(8));
}
setInterval(() => {
  main();
}, 1000 * 2);
