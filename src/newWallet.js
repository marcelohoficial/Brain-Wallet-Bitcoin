const blockchain = require("./utils/blockchain");
const brainWallet = require("./utils/brainWallet");

async function main() {
  var words = "bomb now hub farm honey sudden assume clever warfare home brother siege";
  let { address } = await brainWallet.newWallet(words);

  let wallet = await blockchain.getBallance(address);

  console.log(address, wallet[0].final_balance.toFixed(8));
}

main();
