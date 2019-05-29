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
    const mPurpose = m._deriveWithNumber(BIP_NUMBER, true,false); // 44'
    const mCoin = mPurpose._deriveWithNumber(coin_bip44_id, true,false);
    const mAccount = mCoin._deriveWithNumber(0, true,false);
    const mExt = mAccount._deriveWithNumber(0,false,false);

    console.log();
    console.log(`Account extended PrvKey: ${mAccount}`);
    console.log(`Account extended PubKey: ${mAccount.hdPublicKey}`);
    console.log();
    console.log(`BIP32 Extended Private Key: ${mExt}`);
    console.log(`BIP32 Extended Public Key: ${mExt.hdPublicKey}`);
    console.log();

    for (var i = 0; i < 20; i++) {
        var myPath = mExt._deriveWithNumber(i,false,false)
        var privKey = myPath.privateKey;
        var address = privKey.toAddress();

        console.log(`m/${BIP_NUMBER}'/${coin_bip44_id}'/${0}'/${0}/${i}: ${address.toString()}`);
    }

    process.exit(0);
})
