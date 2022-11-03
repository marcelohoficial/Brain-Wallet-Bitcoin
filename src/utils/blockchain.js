const axios = require("axios");

class blockchain {
  url = "https://blockchain.info/multiaddr?cors=true&active=";
  satoshi = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";

  async getBallance(address) {
    return await axios(`${this.url}${address}`).then(
      (res) => res.data.addresses
    );
  }
  async getInfo(address) {
    let info = null;

    try {
      info = await axios(`${this.url}${address}`).then(
        (res) => res.data.addresses
      )
    } catch (error) {
      console.log(error);
    }

    return info
  }
}

module.exports = new blockchain();
