import { encrypt, decrypt } from './pack_encr.js';

var message = "This is a sample demo of how mails are secured on Maileo with packeting and encryption in conjunction, followed by decryption and aggregation. This will be used in a more elaborate manner on the Dark Sun Labs dapp called Maileo on the Azero Network. However, it will serve as the second layer of the encryption, since the innate cryptography of the aleo blockchain will provide a defacto first layer of cryptographic security.";
console.log("Initial Text: ".concat(message));


var key_full = "";
while (key_full.length < 186) {
    key_full = key_full.concat((Math.floor((Math.random() * 99999999999)).toString()));
}
key_full = key_full.substring(0, 186); //in the real app, this mask would instead
                                    //be fetched from the smart contract instead at call time



var ct = encrypt(message, key_full);
var pt = decrypt(ct, key_full);


console.log("Final Decrypted Text: ".concat(pt));






