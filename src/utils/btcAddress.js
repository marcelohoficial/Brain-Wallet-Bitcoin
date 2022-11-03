const CryptoJs = require('cryptojs').Crypto;
const bs58 = require('bs58');
const bitcoinJs = require('bitcoinjs-lib');
/**
 P2PKH na rede principal é 0x00,P2PKH na rede de testes é 0x6F
 P2SH na rede principal é 0x05, P2SH na rede de testes é o 0xC4
 Lista completa em https://en.bitcoin.it/wiki/List_of_address_prefixes

*/
const version = '00';

//Coloca o segundo argumento da linha de comando na variavel publicKey
const publicKey = process.argv[2];

const publicKeyBytes = CryptoJs.util.hexToBytes(publicKey);
const publicKeySHA256 = CryptoJs.SHA256(publicKeyBytes);
const hash160 = bitcoinJs.crypto.ripemd160(Buffer.from(CryptoJs.util.hexToBytes(publicKeySHA256)));
// Passo 4 - Adicionar versão na frente
const hashEBytes = Array.prototype.slice.call(hash160, 0);
hashEBytes.unshift(CryptoJs.util.hexToBytes(version));
// Passo 5 - Primeiro Hash SHA256 do Passo 4
const primarySHA = CryptoJs.SHA256(hashEBytes);
// Passo 6 - Hash SHA256 do Passo 5
const secondSHA = CryptoJs.SHA256(CryptoJs.util.hexToBytes(primarySHA));
// Passo 7 - Extrai os 4 primeiros bytes para utilizar como CHECKSUM
const checksum = secondSHA.substr(0, 8);
// Passo 8 - Versão + Passo 3 e Passo 7
const endereco = version + CryptoJs.util.bytesToHex(hash160) + checksum;
// Passo 9 - Codificar resultado do passo 8 em base58
const enderecoFinal = bs58.encode(CryptoJs.util.hexToBytes(endereco));

console.log(enderecoFinal);