const CryptoJs = require('cryptojs').Crypto;
const ec = require('eccrypto');

const privateKey = process.argv[2];

const publicKey = ec.getPublic(Buffer.from(CryptoJs.util.hexToBytes(privateKey)));

const publicKeyHex = CryptoJs.util.bytesToHex(publicKey);

console.log(publicKeyHex);