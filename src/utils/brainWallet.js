const CryptoJs = require('cryptojs').Crypto;
const bs58 = require('bs58');
const ec = require('eccrypto');
const bitcoinJs = require('bitcoinjs-lib');

class brainWallet {
  newWallet(secret) {
    const password = secret ? secret : this.passwordGenerate();
    const privateKey = this.privateKey(password);
    const wif = this.wifGenerator(privateKey);
    const publicKey = this.publicKey(privateKey);
    const address = this.btcAddress(publicKey);

    const wallet = {
      password,
      privateKey,
      wif,
      publicKey,
      address,
    }

    return wallet;
  }

  privateKey(password) {
    var passwordKey = CryptoJs.SHA256(password);

    return passwordKey
  }

  wifGenerator(privateKey) {
    const version = "80";

    const versionPrivateKey = version + privateKey;

    const primeiroSHA = CryptoJs.SHA256(CryptoJs.util.hexToBytes(versionPrivateKey))

    const segundoSHA = CryptoJs.SHA256(CryptoJs.util.hexToBytes(primeiroSHA))

    const checksum = segundoSHA.substr(0,8)

    const wif = versionPrivateKey + checksum

    const wifFinal = bs58.encode(CryptoJs.util.hexToBytes(wif))

    return wifFinal
  }

  publicKey(privateKey) {
    const publicKey = ec.getPublic(Buffer.from(CryptoJs.util.hexToBytes(privateKey)));

    const publicKeyHex = CryptoJs.util.bytesToHex(publicKey);

    return publicKeyHex;
  }

  btcAddress(publicKey) {
    const version = '00';

    const publicKeyBytes = CryptoJs.util.hexToBytes(publicKey);
    const publicKeySHA256 = CryptoJs.SHA256(publicKeyBytes);
    const hash160 = bitcoinJs.crypto.ripemd160(Buffer.from(CryptoJs.util.hexToBytes(publicKeySHA256)));

    const hashEBytes = Array.prototype.slice.call(hash160, 0);
    hashEBytes.unshift(CryptoJs.util.hexToBytes(version));

    const primarySHA = CryptoJs.SHA256(hashEBytes);

    const secondSHA = CryptoJs.SHA256(CryptoJs.util.hexToBytes(primarySHA));

    const checksum = secondSHA.substr(0, 8);

    const endereco = version + CryptoJs.util.bytesToHex(hash160) + checksum;

    const enderecoFinal = bs58.encode(CryptoJs.util.hexToBytes(endereco));

    return enderecoFinal;
  }

  passwordGenerate() {
    const privateRandom = CryptoJs.util.randomBytes(32);

    const passwordKey = CryptoJs.util.bytesToHex(privateRandom).toUpperCase();

    return passwordKey;
  }
}

module.exports = new brainWallet();