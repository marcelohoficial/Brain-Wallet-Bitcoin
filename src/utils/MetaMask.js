const CryptoJs = require("cryptojs").Crypto;

class MetaMask {
  newWallet(keyWords) {
    return CryptoJs.SHA256(keyWords);
  }
}

module.exports = new MetaMask();
