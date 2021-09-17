import eccrypto from 'eccrypto';
import { BufferToString, StringToBuffer } from './convertStringBuffer'



export async function encode(message) {
    // let publicKeyString = fs.readFileSync('./public.txt')
    let publicKeyString = "4,4,96,209,79,220,7,122,82,48,253,193,170,227,162,76,207,43,250,228,131,135,226,208,64,117,179,100,139,9,119,157,155,222,86,224,172,118,33,253,230,251,178,193,28,85,49,43,158,151,201,222,32,70,59,43,201,4,109,207,81,162,41,227,155";
    var publicKey = StringToBuffer(publicKeyString);
    let encodeSub = await eccrypto.encrypt(publicKey, Buffer.from(JSON.stringify(message))).then((result) => {
        return {
            iv: BufferToString(result.iv),
            ephemPublicKey: BufferToString(result.ephemPublicKey),
            ciphertext: BufferToString(result.ciphertext),
            mac: BufferToString(result.mac)
        }
    })
    return encodeSub
}