import eccrypto from 'eccrypto';
import { StringToBuffer } from './convertStringBuffer'
// decrypto {email,password}

export async function decode(encryptedData) {
    const keyArray = "37,189,61,198,95,133,71,85,134,34,244,237,174,54,233,244,98,10,37,141,184,164,100,86,114,82,144,212,132,179,55,61";
    
    const privateKey = StringToBuffer(keyArray);
    let covertedMessage = {
        iv: StringToBuffer(encryptedData.iv),
        ephemPublicKey: StringToBuffer(encryptedData.ephemPublicKey),
        ciphertext: StringToBuffer(encryptedData.ciphertext),
        mac: StringToBuffer(encryptedData.mac)
    }
    const  decodeSub = await eccrypto.decrypt(privateKey, covertedMessage)
    return JSON.parse(decodeSub)
}

