// hashMessage - usada para gerar hash de um mensagem
const { hashMessage } = require("./scripts/sign");
// biblioteca de operações de curvas elipticas
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0x73a85af8afe673ef00f4": 100,
  "0xec824e2c458e41fdd1f8": 50,
  "0xc25b840899d1d62570ed": 75,
};

const publicKeys = {
  "0x73a85af8afe673ef00f4": "03365f3487a2631f566276dbe6fddf3cc153dc786f4bcd73a85af8afe673ef00f4",
  "0xec824e2c458e41fdd1f8": "0349e3edb0f8e68c3037381655a896297bf47c7e427166ec824e2c458e41fdd1f8",
  "0xc25b840899d1d62570ed": "030a579650ff541d3a74381475afa7212052bc46534be3c25b840899d1d62570ed",
};


// using query argument to reproduce the "login" process in a get request
// this is not a good practice but usefull in our case so we don't have to do much to reproduce a login process
// -> you can create new address and see their balance anymore (use the 3 given here or add manually others)
/**
 * Esse pega o endereço como params e a assinatura como query
 */
app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const { signature } = req.query;
  let balance = isOwner(address, signature) ? balances[address] : 0;
  res.send({ balance });
});

//manda para o servidor
app.post("/send", (req, res) => {
  const { sender, recipient, amount, digitalSignature } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if(!isOwner(sender, digitalSignature)) {
    res.status(400).send({ message: "Você não é o dono dos tokens!"});
  }

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Sem saldo suficiente!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

//dado um endereço de publicKey e uma assinatura digital essa função retorna
// se a assinatura digital corresponde com a publicKey
function isOwner(address, digitalSignature) {
  const publicKey = publicKeys[address];
  const message = "Olá sou eu!";
  const hash = hashMessage(message);

  return secp256k1.verify(digitalSignature, hash, publicKey);
}
