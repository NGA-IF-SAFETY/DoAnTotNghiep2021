
export function BufferToString(buffer) {
    const arrByte = Uint8Array.from(buffer)
    const arrByteToString = arrByte.toString();
    return arrByteToString;
}

export function StringToBuffer(message) {
    let stringToArray = message.split(",");
    let arrayToUint8Array = new Uint8Array(stringToArray)
    let Uint8ArrayToBuffer = Buffer.from(arrayToUint8Array)
    return Uint8ArrayToBuffer;
}

