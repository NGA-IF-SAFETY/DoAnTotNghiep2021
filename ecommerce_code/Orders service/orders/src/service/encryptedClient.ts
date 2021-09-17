const eccrypt = require('eccrypto') ;
import {Convert} from './convertStringBuffer';
const fs = require('fs');

// const publicKeyArray = fs.readdirSync('./public.txt','utf8')
let publicKeyArray = "4,20,243,198,112,246,90,28,57,75,114,229,8,125,71,50,162,38,118,25,203,19,198,96,58,42,245,98,3,37,58,169,184,192,249,173,127,127,171,14,53,101,41,190,132,157,175,221,52,57,6,143,176,193,96,209,22,214,42,43,195,14,156,186,70";
var publicKey = Convert.StringToBuffer(publicKeyArray);
export async function encodeMessage (message : any) {
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