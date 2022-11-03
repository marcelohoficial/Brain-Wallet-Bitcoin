const CryptoJs = require('cryptojs').Crypto;
const bs58 = require('bs58');

const version = "80";

const privateKey = process.argv[2]

const versionPrivateKey = version + privateKey;

const primeiroSHA = CryptoJs.SHA256(CryptoJs.util.hexToBytes(versionPrivateKey))

const segundoSHA = CryptoJs.SHA256(CryptoJs.util.hexToBytes(primeiroSHA))

const checksum = segundoSHA.substr(0,8)

const wif = versionPrivateKey + checksum

const wifFinal = bs58.encode(CryptoJs.util.hexToBytes(wif))

console.log(wifFinal)