const eccrypt = require('eccrypto') ;
import {Convert} from './convertStringBuffer';
const fs = require('fs');

// const publicKeyArray = fs.readdirSync('./public.txt','utf8')
let publicKeyArray = "4,4,96,209,79,220,7,122,82,48,253,193,170,227,162,76,207,43,250,228,131,135,226,208,64,117,179,100,139,9,119,157,155,222,86,224,172,118,33,253,230,251,178,193,28,85,49,43,158,151,201,222,32,70,59,43,201,4,109,207,81,162,41,227,155";
var publicKey = Convert.StringToBuffer(publicKeyArray);
export async function encode (message : any) {
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