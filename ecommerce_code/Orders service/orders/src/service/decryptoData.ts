var eccrypto = require("eccrypto");
var fs = require("fs");
import { Convert } from './convertStringBuffer';

// decrypto {email,password}
export class Decrypted{
    static async decode(encryptedData: any) {
        // const keyArray = fs.readFileSync('./private.txt','utf8');
        const keyArray = "18,9,230,133,166,186,220,146,141,182,137,155,225,212,224,174,58,52,155,162,102,209,98,178,80,113,145,77,70,175,157,31"
        const privateKey = Convert.StringToBuffer(keyArray);
        let covertedMessage = {
            iv: Convert.StringToBuffer(encryptedData.iv),
            ephemPublicKey: Convert.StringToBuffer(encryptedData.ephemPublicKey),
            ciphertext: Convert.StringToBuffer(encryptedData.ciphertext),
            mac: Convert.StringToBuffer(encryptedData.mac)
        }
    
        let decodeSub = await eccrypto.decrypt(privateKey, covertedMessage)
        return JSON.parse(decodeSub)
    }
}
