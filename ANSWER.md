### Solución

Tomando de referencia a bitcoinjs-lib,  se descubrio que bitcore-mnemonic que utilizada la  bitcore-lib no generaba el mismo sha512hmac para algunos casos. El problema exactamente es:

 El método derive(someNumber, hardened=true) por defecto  no rellenaba con cero las llaves que son menores a 32 bytes, lo cual producia un  Hash.sha512hmac distinto al que se obtiene en el programa de c++ para las derivacion del tipo hardened
 
 ```    
 if (hardened && nonCompliant) {
    // The private key serialization in this case will not be exactly 32 bytes and can be
    // any value less, and the value is not zero-padded.
    var nonZeroPadded = this.privateKey.bn.toBuffer();
    data = BufferUtil.concat([new buffer.Buffer([0]), nonZeroPadded, indexBuffer]);
  } else if (hardened) {
    // This will use a 32 byte zero padded serialization of the private key
    var privateKeyBuffer = this.privateKey.bn.toBuffer({size: 32});
    assert(privateKeyBuffer.length === 32, 'length of private key buffer is expected to be 32 bytes');
    data = BufferUtil.concat([new buffer.Buffer([0]), privateKeyBuffer, indexBuffer]);
  } else {
    data = BufferUtil.concat([this.publicKey.toBuffer(), indexBuffer]);
  }
  ```


La soluciones es utilizar el método _deriveWithNumber como se ve a continuación:


```
	//hardened
    const mAccount = mCoin._deriveWithNumber(someNumber, true,false);
	
	//no hardened
    const mExt = mAccount._deriveWithNumber(someNumber,false,false);
```


Para más referencia ver el archivo bip44-quick-gen.js