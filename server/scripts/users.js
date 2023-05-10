const { getSignatureInfo } = require("./sign");

const users = [
    {
        private_key:"1e85473308fdeb3bb49e15bfbdb4d1b72c49b37648b7253265e8a410c8a52185",
        public_key:"03365f3487a2631f566276dbe6fddf3cc153dc786f4bcd73a85af8afe673ef00f4",
        address:"0x73a85af8afe673ef00f4"
    },
    {
        private_key:"267f6994fa8adfbf772934e31e903507ac2b3f85e926496d787a34676dffef0e",
        public_key:"0349e3edb0f8e68c3037381655a896297bf47c7e427166ec824e2c458e41fdd1f8",
        address:"0xec824e2c458e41fdd1f8"
    },
    {
        private_key:"47378cca7d502ff23166390c6f5c9f4eaacad6b53d121c0ec785c82c8caec82a",
        public_key:"030a579650ff541d3a74381475afa7212052bc46534be3c25b840899d1d62570ed",
        address:"0xc25b840899d1d62570ed"
    }
];

async function listUsers() {
    for (let i = 0; i < users.length; i++) {
        console.log(`\n############## ${i + 1} ##############`);
        console.log("private key:", users[i].private_key);
        console.log("public key:", users[i].public_key);
        console.log("address:", users[i].address);
        await getSignatureInfo(users[i].private_key);
        console.log("###############################");
    }
}

listUsers()
    .then(() =>process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });