//biblioteca ethereum-cryptography
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
//funcao hash keccak256
const { keccak256 } = require("ethereum-cryptography/keccak");
//transforma strings em bytes
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");

/**
 * Essa funcao ira obter a assinatura dada uma privateKey
 */
async function getSignatureInfo(privateKey) {  
  const message = "Olá sou eu!";
  const signature = secp256k1.sign(hashMessage(message), privateKey);
  
  
  const recoverPublicKey = signature.recoverPublicKey(hashMessage(message)).toHex({ isCompressed: false});
  
  console.log("message: ", message);
  console.log("Assinatura hex: ", signature.toCompactHex());
  
  return signature.toCompactHex();
}

function hashMessage(msg) {
  const bytes = utf8ToBytes(msg);
  return keccak256(bytes);
}

module.exports = { getSignatureInfo, hashMessage };