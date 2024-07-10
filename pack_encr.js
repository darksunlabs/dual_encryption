import CryptoJS from "crypto-js";



function stringToChunks(string, chunkSize) {
    const chunks = [];
    while (string.length > 0) {
        chunks.push(string.substring(0, chunkSize));
        string = string.substring(chunkSize, string.length);
    }
    return chunks
}

export function encrypt(message, key_full) {
    if (message.length > 500) {
        throw "Message Length too long. Must be under 500 chars.";
    }

    var plen = (message.length / 3);
    if (message.length % 3 != 0) {
        plen ++;
    }

    var message_packets = stringToChunks(message, plen);
    var key = stringToChunks(key_full, key_full.length/3);

    var ct = [];
        
    ct[0] = CryptoJS.AES.encrypt(message_packets[0], key[0]);
    ct[1] = CryptoJS.TripleDES.encrypt(message_packets[1], key[1]);
    ct[2] = CryptoJS.Rabbit.encrypt(message_packets[2], key[2]);

    return ct;

}

export function decrypt(ct, key_full) {
    var i = 0;
    var pt = [];
    var key = stringToChunks(key_full, key_full.length/3);

    pt[0] = CryptoJS.AES.decrypt(ct[0], key[0]).toString(CryptoJS.enc.Utf8);
    pt[1] = CryptoJS.TripleDES.decrypt(ct[1], key[1]).toString(CryptoJS.enc.Utf8);
    pt[2] = CryptoJS.Rabbit.decrypt(ct[2], key[2]).toString(CryptoJS.enc.Utf8);


    var pt_full = pt[0].concat(pt[1]).concat(pt[2]);
    return pt_full;
}



