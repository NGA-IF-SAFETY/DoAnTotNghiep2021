const eccrypt = require('eccrypto') ;
import {Convert} from './convertStringBuffer';
const fs = require('fs');

// const publicKeyArray = fs.readdirSync('./public.txt','utf8')
// let publicKeyArray = "4,4,96,209,79,220,7,122,82,48,253,193,170,227,162,76,207,43,250,228,131,135,226,208,64,117,179,100,139,9,119,157,155,222,86,224,172,118,33,253,230,251,178,193,28,85,49,43,158,151,201,222,32,70,59,43,201,4,109,207,81,162,41,227,155";
const publicKeyArray = "4,202,46,124,84,78,44,119,6,176,111,17,98,51,95,11,209,199,132,23,129,228,226,71,193,59,234,54,232,46,99,118,206,176,238,89,36,153,65,18,21,72,197,1,240,57,211,35,228,13,237,140,14,109,132,144,0,216,253,183,45,228,100,129,155"
var publicKey = Convert.StringToBuffer(publicKeyArray);
export async function encode (message : object) {
    let encodeSub = await eccrypt.encrypt(publicKey, Buffer.from(JSON.stringify(message))).then((result: any) => {
        return {
            iv: Convert.BufferToString(result.iv),
            ephemPublicKey: Convert.BufferToString(result.ephemPublicKey),
            ciphertext: Convert.BufferToString(result.ciphertext),
            mac: Convert.BufferToString(result.mac)
        }
    })
    return encodeSub
}