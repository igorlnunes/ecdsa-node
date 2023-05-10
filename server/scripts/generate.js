// this script is used for generating users
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp256k1.utils.randomPrivateKey();
const privateKeyHex = toHex(privateKey);

console.log('private key: ', privateKeyHex);

const publicKey = secp256k1.getPublicKey(privateKey);
const publicKeyHex = toHex(publicKey);

console.log('public key: ', publicKeyHex);

const address = '0x' + publicKeyHex.slice(-20);

console.log('address: ', address);