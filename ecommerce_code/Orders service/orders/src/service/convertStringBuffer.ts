export class Convert {
    static BufferToString(buffer : any) {
        const arrByte = Uint8Array.from(buffer)
        const arrByteToString = arrByte.toString();
        return arrByteToString;
    }
    
    static StringToBuffer(message : any) {
        var stringToArray = message.split(',');
        var arrayToUint8Array = new Uint8Array(stringToArray)
        var Uint8ArrayToBuffer = Buffer.from(arrayToUint8Array)
        return Uint8ArrayToBuffer;
    }
}


