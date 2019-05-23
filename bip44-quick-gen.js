const Mnemonic = require('bitcore-mnemonic')
const readline = require("readline")

const BIP_NUMBER = 44;
var coin_bip44_id = 0;

// TODO: Add code to deal with 'testnet'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
})

process.stdout.write('Enter mnemonic (empty to autogenerate): ');

rl.on('line', function(words) {
    var code;
    if (words.trim().length == 0) {
        // Create random words
        code = new Mnemonic(256);
        console.log(code.toString())
    } else {
        code = new Mnemonic(words);
    }

    const m = code.toHDPrivateKey(); // empty passphrase
    const mPurpose = m.derive(BIP_NUMBER, true); // 44'
    const mCoin = mPurpose.derive(coin_bip44_id, true);
    const mAccount = mCoin.derive(0, true);
    const mExt = mAccount.derive(0);

    console.log();
    console.log(`Account extended PrvKey: ${mAccount}`);
    console.log(`Account extended PubKey: ${mAccount.hdPublicKey}`);
    console.log();
    console.log(`BIP32 Extended Private Key: ${mExt}`);
    console.log(`BIP32 Extended Public Key: ${mExt.hdPublicKey}`);
    console.log();

    for (var i = 0; i < 20; i++) {
        var myPath = mExt.derive(i)
        var privKey = myPath.privateKey;
        var address = privKey.toAddress();

        console.log(`m/${BIP_NUMBER}'/${coin_bip44_id}'/${0}'/${0}/${i}: ${address.toString()}`);
    }

    process.exit(0);
})
