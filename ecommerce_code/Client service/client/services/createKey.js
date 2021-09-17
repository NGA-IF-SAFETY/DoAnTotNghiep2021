var eccrypto = require("eccrypto");
var fs = require("fs");
import {BufferToString} from './convertStringBuffer';

module.exports = () => {
// Generate two pairs of public and private keys
var privateKeyA = eccrypto.generatePrivate();

const arrByteToString = BufferToString(privateKeyA);
fs.writeFileSync("private.txt", arrByteToString, "utf8");

const publicKeyA = eccrypto.getPublic(privateKeyA);

const arrByteToString1 = BufferToString(publicKeyA);
fs.writeFileSync("public.txt", arrByteToString1, "utf8");
}

