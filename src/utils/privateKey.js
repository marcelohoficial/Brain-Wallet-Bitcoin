const CryptoJs = require('cryptojs').Crypto;

//Criar uma Var com 32 bytes randomicos
const privateKey = CryptoJs.util.randomBytes(32);
console.log(privateKey)

const privateKeyHex = CryptoJs.util.bytesToHex(privateKey).toUpperCase();

console.log(privateKeyHex);