var eccrypto = require("eccrypto");
var fs = require("fs");
import { Convert } from './convertStringBuffer';

export class Decrypted{
    static async decode(encryptedData: any) {
        const keyArray = "135,146,41,190,51,84,135,202,241,79,203,164,114,163,206,33,250,251,201,235,25,160,76,166,10,140,91,67,225,145,22,147"
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
